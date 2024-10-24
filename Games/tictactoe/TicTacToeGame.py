from Tools.i_game import IGame, np
from Games.tictactoe.TicTacToeLogic import Board

"""
Game class implementation for the game of TicTacToe.
Based on the OthelloGame then getGameEnded() was adapted to new rules.

Author: Evgeny Tyurin, github.com/evg-tyurin
Date: Jan 5, 2018.

Based on the OthelloGame by Surag Nair.
"""


class TicTacToeGame(IGame):
    def __init__(self, n=3):
        self.n = n

    def getInitBoard(self):
        """return initial board (numpy board)"""
        b = Board(self.n)
        return np.array(b.pieces)

    def getBoardSize(self):
        return self.n, self.n

    def getActionSize(self):
        """return number of actions"""
        return self.n * self.n + 1  # the +1 is wrong actually, but the trained model coming with alpha zero framework
        # is based on it and everything is working so do not mind that.
        # => TTT does not have the option to pass a move

    def getNextState(self, board, player, action):
        """if player takes action on board, return next (board,player)
           action must be a valid move"""
        if action == self.n * self.n:  # same as with getActionSize => TTT has actually no possibility to pass a move
            return board, -player
        b = Board(self.n)
        b.pieces = np.copy(board)
        move = (int(action / self.n), action % self.n)
        b.execute_move(move, player)
        return b.pieces, -player

    def getValidMoves(self, board, player):
        """return a fixed size binary vector"""
        valids = [0] * self.getActionSize()
        b = Board(self.n)
        b.pieces = np.copy(board)
        legalMoves = b.get_legal_moves()
        if len(legalMoves) == 0:  # same as with getActionSize => TTT has actually no possibility to pass a move
            valids[-1] = 1
            return np.array(valids)
        for x, y in legalMoves:
            valids[self.n * x + y] = 1
        return np.array(valids)

    def getGameEnded(self, board, player):
        """return 0 if not ended, 1 if player won, -1 if player lost"""
        b = Board(self.n)
        b.pieces = np.copy(board)

        if b.is_win(player):
            return 1
        if b.is_win(-player):
            return -1
        if b.has_legal_moves():
            return 0
        # draw has a very little value
        return 1e-4

    def getSymmetries(self, board, pi):
        # mirror, rotational
        assert (len(pi) == self.n ** 2 + 1)
        pi_board = np.reshape(pi[:-1], (self.n, self.n))   # same as with getActionSize => TTT has actually
        x = []                                                     # no possibility to pass a move

        for i in range(1, 5):
            for j in [True, False]:
                newB = np.rot90(board, i)
                newPi = np.rot90(pi_board, i)
                if j:
                    newB = np.fliplr(newB)
                    newPi = np.fliplr(newPi)
                x += [(newB, list(newPi.ravel()) + [pi[-1]])]  # same here with pass move
        return x

    def translate(self, board: np.array, player: int, index: int):
        return index

    def rotateMove(self, move: int):
        """no rotation at TTT"""
        return move

    def stringRepresentation(self, board):
        return board.tostring()

    def drawTerminal(self, board: np.array, valid_moves: bool, cur_player: int, *args: any):
        if valid_moves:
            return str([i for (i, valid) in enumerate(self.getValidMoves(board, 1)) if valid])
        else:
            output = "\n"
            for row in range(self.n):
                for col in range(self.n):
                    if board[row][col] == 0:
                        output += '   '
                    elif board[row][col] == 1:
                        output += ' X '
                    else:
                        output += ' O '
                    if col < self.n - 1:
                        output += '|'
                output += '\n'
                if row < self.n - 1:
                    output += '-' * (4 * self.n - 1) + '\n'

            return output

    def draw(self, board: np.array, valid_moves: bool, cur_player: int, *args: any):
        import pygame
        row_count = board.shape[0]
        col_count = board.shape[1]
        SQUARESIZE = 100
        WIDTH = col_count * SQUARESIZE
        HEIGHT = row_count * SQUARESIZE

        color_background = (252, 252, 244)  # cream
        color_grid = (172, 244, 230)  # light blue
        color_X = (24, 188, 156)  # turquoise
        color_O = (44, 62, 80)  # dark blue
        color_valid = (144, 238, 144)  # turquoise

        pygame.init()

        surface = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
        surface.fill(color_background)

        for row in range(1, row_count):
            pygame.draw.line(surface, color_grid,
                             (0, row * SQUARESIZE),
                             (WIDTH, row * SQUARESIZE),
                             7)
        for col in range(1, col_count):
            pygame.draw.line(surface, color_grid,
                             (col * SQUARESIZE, 0),
                             (col * SQUARESIZE, HEIGHT),
                             7)

        for row in range(len(board)):
            for col in range(len(board[row])):
                if valid_moves and board[row][col] == 0:
                    pygame.draw.circle(surface, color_valid,
                                       (col * SQUARESIZE + SQUARESIZE // 2, row * SQUARESIZE + SQUARESIZE // 2),
                                       SQUARESIZE // 8)
                if board[row][col] == 1:
                    pygame.draw.line(surface, color_X,
                                     (col * SQUARESIZE + 15, row * SQUARESIZE + 15),
                                     (col * SQUARESIZE + SQUARESIZE - 15, row * SQUARESIZE + SQUARESIZE - 15),
                                     13)
                    pygame.draw.line(surface, color_X,
                                     (col * SQUARESIZE + 15, row * SQUARESIZE + SQUARESIZE - 15),
                                     (col * SQUARESIZE + SQUARESIZE - 15, row * SQUARESIZE + 15),
                                     13)
                elif board[row][col] == -1:
                    pygame.draw.circle(surface, color_O,
                                       (col * SQUARESIZE + SQUARESIZE // 2, row * SQUARESIZE + SQUARESIZE // 2),
                                       SQUARESIZE // 2 - 15, 10)
        return surface