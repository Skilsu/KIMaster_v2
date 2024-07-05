import asyncio
import numpy as np
from typing import Callable

from GameClient.player import Player
from Tools.i_game import IGame
from Tools.rcode import RCODE


class Arena:
    def __init__(self, game_client):
        self.game_client = game_client  # need to send information over websocket connection
        self.running: bool = False  # var to stop battle if necessary
        self.time_index_p1: int = 0
        self.time_index_p2: int = 0

        # configuration storage of current active battle
        self.history: list[tuple[np.array, int, int]] = []  # [board, cur_player, iteration]
        self.blunder_history: list[tuple[np.array, int, int, any]] = []  # [board, cur_player, iteration, move]
        self.blunder: list = []  # saves blunder values for each index
        self.blunder_calculation: bool = False  # is true if a calculation request was send
        self.cur_player: int = 1  # default start value
        self.game_name: str = ""  # needed in some response messages
        self.game: IGame | None = None
        self.player1 = None
        self.player2 = None

    def set_arena(self, game: IGame, game_name: str, play1: Callable, play2: Callable):
        self.game = game
        self.game_name = game_name
        self.player1 = play1
        self.player2 = play2
        self.history.clear()  # reset history on new game configuration
        self.blunder.clear()  # reset blunder on new game configuration
        self.blunder_history.clear()  # reset
        self.blunder_calculation = False  # reset to default

    def stop(self):
        self.running = False

    async def play(self, board: np.array = None, cur_player: int = 1, it: int = 0, evaluation: bool = False):
        self.running = True

        # initialisation of game
        if board is None:
            board = self.game.getInitBoard()
        players = [self.player2, None, self.player1]  # array of play functions

        while self.running and self.game.getGameEnded(board, cur_player) == 0:
            await asyncio.sleep(0.0001)  # is needed because of optimiser!
            self.history.append((board, cur_player, it))
            self.cur_player = cur_player
            p = players[cur_player + 1]

            # Broadcast current board and active player
            if p.__func__ == Player.playAI:  # send Different message if KIM is at turn
                await self.game_client.send_response(code=RCODE.P_KIM, to=None, data={"cur_player": "KIM"})
            else:
                await self.game_client.send_response(code=RCODE.P_PLAYER, to=None, data={"cur_player": cur_player})
            await self.game_client.broadcast_board(board, cur_player, self.game_name, False)

            to: str = "p1" if cur_player == 1 else "p2"
            ai: bool = False
            while self.running:
                await asyncio.sleep(0.0001)  # is needed because of optimiser!
                action = p()  # action can be (None) no move set, (int, tuple) on play action, (bool) ai_move request
                if action is None:
                    continue
                if isinstance(action, bool):  # do a request to server with ai move
                    await self.game_client.send_cmd(command="ai_move", command_key=self.game_name, p_pos=to,
                                                    data={"board": board.tolist(),
                                                          "cur_player": cur_player,
                                                          "it": it,
                                                          "key": self.game_client.key})
                    ai = True
                    continue
                try:
                    board, cur_player = self.game.getNextState(board, cur_player, action)
                    await self.game_client.send_response(code=RCODE.P_VALIDMOVE, to=to)
                    if not ai:
                        self.blunder_history.append((board, cur_player, it, action))
                    break
                except ValueError:
                    if ai:
                        raise ValueError("Fatal Error: Check AI move generator")
                    await self.game_client.send_response(code=RCODE.P_INVALIDMOVE, to=to)
                    continue
            if self.running:
                it += 1

        if self.running:
            self.history.append((board, cur_player, it))
            await self.game_client.broadcast_board(board, cur_player, self.game_name, False)
            await self.game_client.send_response(RCODE.P_GAMEOVER, None,
                                                 {"result": round(cur_player * self.game.getGameEnded(board, cur_player)),
                                                  "turn": it})
        self.time_index_p1 = len(self.history)  # update index to history length
        self.time_index_p2 = len(self.history)  # update index to history length
        self.running = False
        await self.game_client.update()
        return {"result": round(cur_player * self.game.getGameEnded(board, cur_player)), "turn": it}
