from Tools.i_game import IGame, np
from Games.Qawale.QawaleLogic import Board
from queue import Queue
from copy import deepcopy

class QawaleGame(IGame):
    """
    Qawale Game class implementing the alpha-zero-general Game interface.
    Based on a 4x4 board where players stack and distribute colored stones.
    """

    def __init__(self):
        self.board = None
        self.current_player = None
        self.stones_blue = 8
        self.stones_red = 8
        self.selected_stack = None
        self.distribution_path = []
        self.getInitBoard()

    def getInitBoard(self):
        """Return initial board (numpy board)"""
        self.board = Board()
        self.current_player = "B"  # Blue starts
        self.stones_blue = 8
        self.stones_red = 8
        self.selected_stack = None
        self.distribution_path = []
        return self.board.get_numpy_board()

    def getBoardSize(self):
        """Return (x,y) tuple of board dimensions"""
        return (4, 4)  # 4x4 Brett

    def getActionSize(self):
        """Return number of all possible actions"""
        return 4 * 4 * 5  # 16 positions * 5 move types (place + 4 distribution directions)

    def getNextState(self, board, player, action):
        """Returns a copy of the board with updated move, original board is unmodified."""
        # Create new board instance with the current state
        b = Board(np_pieces=board)
        
        # Decode action
        cell_index = action // 5
        move_type = action % 5
        row = cell_index // 4
        col = cell_index % 4

        # Convert player number to stone color
        stone_color = "B" if player == 1 else "R"

        if move_type == 0:  # Place stone
            if (stone_color == "B" and self.stones_blue > 0) or \
               (stone_color == "R" and self.stones_red > 0):
                b.place_stone((row, col), stone_color)
                if stone_color == "B":
                    self.stones_blue -= 1
                else:
                    self.stones_red -= 1

        else:  # Distribution move
            # Define direction vectors (up, down, left, right)
            directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
            dir_row, dir_col = directions[move_type - 1]
            
            # Calculate distribution path
            stack_height = b.get_stack_height(row, col)
            path = [(row, col)]
            for i in range(stack_height):
                next_row = row + dir_row * (i + 1)
                next_col = col + dir_col * (i + 1)
                if 0 <= next_row < 4 and 0 <= next_col < 4:
                    path.append((next_row, next_col))
            
            b.distribute_stack(path)

        return b.get_numpy_board(), -player

    def getValidMoves(self, board, player):
        """Return a binary vector of valid moves"""
        b = Board(np_pieces=board)  # Hier auch das numpy board übergeben
        stone_color = "B" if player == 1 else "R"
        stones_left = self.stones_blue if stone_color == "B" else self.stones_red

        valids = [0] * self.getActionSize()
        
        # Check each position and move type
        for row in range(4):
            for col in range(4):
                cell_index = row * 4 + col
                
                # Check stone placement
                if stones_left > 0:  # Entferne die Bedingung für nicht-leere Stacks
                    valids[cell_index * 5] = 1

                # Check distribution moves
                if b.get_stack_height(row, col) > 0:
                    stack_height = b.get_stack_height(row, col)
                    
                    # Check each direction
                    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
                    for dir_idx, (dir_row, dir_col) in enumerate(directions):
                        valid_path = True
                        for i in range(stack_height):
                            next_row = row + dir_row * (i + 1)
                            next_col = col + dir_col * (i + 1)
                            if not (0 <= next_row < 4 and 0 <= next_col < 4):
                                valid_path = False
                                break
                        if valid_path:
                            valids[cell_index * 5 + (dir_idx + 1)] = 1

        # Wenn keine gültigen Züge gefunden wurden, erlaube Platzierung auf leeren Feldern
        if sum(valids) == 0:
            for row in range(4):
                for col in range(4):
                    cell_index = row * 4 + col
                    if stones_left > 0:  # Nur wenn noch Steine übrig sind
                        valids[cell_index * 5] = 1

        return np.array(valids)

    def getGameEnded(self, board, player):
        """Return 0 if not ended, 1 if player won, -1 if player lost"""
        b = Board(np_pieces=board)  # Übergebe das numpy board an den Konstruktor
        win_state = b.get_win_state()
        
        if not win_state.is_ended:
            # Spiel läuft noch
            return 0
        
        if win_state.winner is None:
            # Unentschieden
            return 1e-4  # Draw
        
        # Konvertiere Gewinner in Spielerperspektive
        if (win_state.winner == "B" and player == 1) or \
           (win_state.winner == "R" and player == -1):
            # Spieler hat gewonnen
            return 1
        # Spieler hat verloren
        return -1

    def getSymmetries(self, board, pi):
        """Board has rotational and mirror symmetries"""
        # pi_board needs to be reshaped considering action types
        pi_reshape = pi.reshape(4, 4, 5)
        
        symmetries = []
        for i in [0, 1, 2, 3]:  # 4 rotations
            rot_board = np.rot90(board, i)
            rot_pi = np.rot90(pi_reshape, i, (0, 1))
            symmetries.append((rot_board, rot_pi.reshape(-1)))
            
            # Add mirrored versions
            flip_board = np.fliplr(rot_board)
            flip_pi = np.fliplr(rot_pi)
            symmetries.append((flip_board, flip_pi.reshape(-1)))
            
        return symmetries

    def stringRepresentation(self, board):
        """Get string representation of board"""
        return board.tostring()

    def translate(self, board: np.array, player: int, index: int):
        """Translate move index to game-specific format"""
        return index

    def rotateMove(self, move: int):
        """No rotation needed in Qawale"""
        return move

    def drawTerminal(self, board: np.array, valid_moves: bool, cur_player: int, *args: any):
        """Draw board in terminal"""
        if valid_moves:
            return str([i for (i, valid) in enumerate(self.getValidMoves(board, 1)) if valid])
        else:
            horizontal_border = '+' + '-' * (4 * 4 - 1) + '+\n'
            output = horizontal_border

            for row in range(4):
                row_str = '|'
                for col in range(4):
                    if board[row][col] == 0:
                        row_str += ' G |'  # Yellow stones
                    elif board[row][col] == 1:
                        row_str += ' B |'  # Blue stones
                    else:
                        row_str += ' R |'  # Red stones
                output += row_str + '\n' + horizontal_border

            return output

    def draw(self, board: np.array, valid_moves: bool, cur_player: int, *args: any):
        """Draw graphical representation using pygame"""
        import pygame
        SQUARESIZE = 100
        WIDTH = 4 * SQUARESIZE
        HEIGHT = 4 * SQUARESIZE
        TOKENSIZE = SQUARESIZE // 2

        color_background = (252, 252, 244)  # cream
        color_blue = (0, 0, 255)     # blue
        color_red = (255, 0, 0)      # red
        color_yellow = (255, 255, 0)  # yellow
        color_valid = (144, 238, 144) # light green
        color_grid = (172, 244, 230)  # light blue

        pygame.init()
        surface = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
        surface.fill(color_background)

        # Draw grid
        for row in range(1, 4):
            pygame.draw.line(surface, color_grid,
                           (0, row * SQUARESIZE),
                           (WIDTH, row * SQUARESIZE),
                           2)
        for col in range(1, 4):
            pygame.draw.line(surface, color_grid,
                           (col * SQUARESIZE, 0),
                           (col * SQUARESIZE, HEIGHT),
                           2)

        # Draw stones
        for row in range(4):
            for col in range(4):
                center_pos = (col * SQUARESIZE + SQUARESIZE//2, 
                            row * SQUARESIZE + SQUARESIZE//2)
                
                if valid_moves:
                    # Show valid moves
                    base_idx = (row * 4 + col) * 5
                    valid_actions = self.getValidMoves(board, cur_player)
                    if any(valid_actions[base_idx:base_idx + 5]):
                        pygame.draw.circle(surface, color_valid,
                                        center_pos, TOKENSIZE//4)
                
                if board[row][col] == 0:  # Yellow stones
                    pygame.draw.circle(surface, color_yellow,
                                    center_pos, TOKENSIZE - 5)
                elif board[row][col] == 1:  # Blue stones
                    pygame.draw.circle(surface, color_blue,
                                    center_pos, TOKENSIZE - 5)
                elif board[row][col] == -1:  # Red stones
                    pygame.draw.circle(surface, color_red,
                                    center_pos, TOKENSIZE - 5)

        return surface

    def __deepcopy__(self, memo):
        """Support for deepcopy"""
        cls = self.__class__
        result = cls.__new__(cls)
        memo[id(self)] = result
        
        # Kopiere alle Attribute außer board
        for k, v in self.__dict__.items():
            if k != 'board':
                setattr(result, k, deepcopy(v, memo))
        
        # Kopiere das Board mit unserer speziellen Methode
        if self.board is not None:
            result.board = self.board.copy()
        else:
            result.board = None
        
        return result