import time
import os
from asyncio import create_task, Task

import numpy as np
from starlette.websockets import WebSocket

from Tools.datatypes import GameConfig, EResponse
from Tools.utils import dotdict
from Tools.mcts import MCTS
from Tools.datatypes import EDifficulty, Response
from arena import Arena
from player import Player


class Pit:
    def __init__(self, game_config: GameConfig, game_client):
        self.game_config: GameConfig | None = game_config
        self.game_client: WebSocket = game_client
        self.arena: Arena | None = None
        self.arena_task: Task | None = None

    def start_game(self, num_games: int, verbose: bool, board: np.array, cur_player: int, it: int) -> Response:
        # check if game is set
        if self.game_config is None:
            return Response(EResponse.ERROR, "Game not initialized! Use create!")
        if self.arena_task is not None:
            # task is running, stopping it!
            while not self.arena_task.done():
                self.arena_task.cancel()
                print("Waiting on Arena cancel!")
                time.sleep(0.5)
        # no task exist                 or canceled                 or done
        if self.arena_task is None or self.arena_task.cancelled() or self.arena_task.done():
            if num_games == 1:
                self.arena_task = create_task(self.arena.playGame(verbose=verbose,
                                                                  board=board,
                                                                  cur_player=cur_player,
                                                                  it=it))
                return Response(EResponse.SUCCESS, "Game initialized")
            else:
                self.arena_task = create_task(self.arena.playGames(num_games, train=False))
                return Response(EResponse.SUCCESS, "Evaluation runs")

    def init_game(self, num_games: int, game_config: GameConfig | None) -> Response:
        if self.game_config is None and game_config is None:  # check if init is right!
            return Response(EResponse.ERROR, "Game config is None, cant init game!")
        if game_config is not None:  # if the arg is none, it's a re-init e.g. via "new_game"
            if not game_config():  # check if all values in game_config are available
                return Response(EResponse.ERROR, "A value in game_config is not set!")
            self.game_config = game_config

        # get all values for init or set default values
        game = self.game_config.game.value[0]()  # create new game instance of Game import of EGame
        game_name = self.game_config.game.name
        nnet = self.game_config.game.value[1]    # get the right NNet
        difficulty = self.game_config.difficulty
        player1 = None
        player2 = None

        # load pretrained model
        try:
            path = os.path.abspath(f"../resources/pretrained_models/{game_name}/best.h5")
            folder = os.path.dirname(path)
            file = os.path.basename(path)
        except FileNotFoundError:
            return Response(EResponse.ERROR, "Pretrained model file not found!", {"game": game_name})
        except IsADirectoryError:
            return Response(EResponse.ERROR, "Pretrained model is a Directory not a file!", {"game": game_name})
        except Exception as e:
            return Response(EResponse.ERROR, "Unknown exception on load of pretrained model!", {"game": game_name})

        try:
            mcts = self.init_nn(game, nnet, folder, file, difficulty)
            match self.game_config.mode.value:
                case "player_vs_player":
                    player1 = Player(game, self.game_client).play
                    player2 = Player(game, self.game_client).play
                case "player_vs_ai":
                    player1 = Player(game, self.game_client).play
                    player2 = lambda x: mcts.getActionProb(x, temp=0)
                case "playerai_vs_ai":
                    player1 = Player(game, self.game_client).play
                    player2 = lambda x: mcts.getActionProb(x, temp=0)
                case "playerai_vs_playerai":
                    player1 = Player(game, self.game_client).play
                    player2 = Player(game, self.game_client).play
                case _:
                    return Response(EResponse.ERROR, "Game mode does not exist!",
                                    {"mode": self.game_config.mode.name})
        except AttributeError:
            return Response(EResponse.ERROR, "Game mode does not exist!",
                            {"mode": self.game_config.mode.name})

        player3 = lambda x: mcts.getActionProb(x, temp=1)
        self.arena = Arena(player1, player2, player3, game, self.game_client)
        # start with default values
        return self.start_game(num_games,  verbose=True, board=None, cur_player=1, it=0)

    def init_nn(self, game, nnet, folder: str, file: str, difficulty: EDifficulty = EDifficulty.hard.value):
        nn = nnet(game)
        nn.load_checkpoint(folder, file)
        args = dotdict({'numMCTSSims': difficulty.value, 'cpuct': 1.0})
        mcts = MCTS(game, nn, args)
        return mcts