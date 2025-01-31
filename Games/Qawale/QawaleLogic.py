from collections import namedtuple
import numpy as np
from queue import Queue

WinState = namedtuple('WinState', 'is_ended winner')

class Board:
    """
    Qawale Board.
    A 4x4 board where players stack colored stones and distribute them.
    """

    def __init__(self, np_pieces=None):
        """Set up initial board configuration."""
        self.rows = 4
        self.cols = 4
        
        # Initialize board with stacks (Queues)
        self.stacks = [[Queue() for _ in range(self.cols)] for _ in range(self.rows)]
        
        if np_pieces is not None:
            # Convert numpy board back to stacks
            for r in range(self.rows):
                for c in range(self.cols):
                    value = np_pieces[r][c]
                    if value == 0:  # Yellow stone
                        self.stacks[r][c].put("G")
                        self.stacks[r][c].put("G")
                    elif value == 1:  # Blue stone
                        self.stacks[r][c].put("B")
                    elif value == -1:  # Red stone
                        self.stacks[r][c].put("R")
        else:
            # Place 2 yellow stones in corners
            for (r, c) in [(0, 0), (0, 3), (3, 0), (3, 3)]:
                self.stacks[r][c].put("G")
                self.stacks[r][c].put("G")

    def get_stack_as_list(self, row, col):
        """Get contents of a stack as a list."""
        temp_queue = Queue()
        stack_list = []
        
        # Empty queue into list while keeping copy
        while not self.stacks[row][col].empty():
            stone = self.stacks[row][col].get()
            stack_list.append(stone)
            temp_queue.put(stone)
            
        # Restore queue
        while not temp_queue.empty():
            self.stacks[row][col].put(temp_queue.get())
            
        return stack_list

    def get_stack_height(self, row, col):
        """Get height of stack at position."""
        return len(self.get_stack_as_list(row, col))

    def place_stone(self, position, stone_color):
        """Place a stone at the bottom of the stack at position."""
        row, col = position
        
        # Get current stack
        current_stack = self.stacks[row][col]
        temp_queue = Queue()
        
        # Place new stone at bottom
        temp_queue.put(stone_color)
            
        # Add existing stones above
        existing_stones = []
        while not current_stack.empty():
            existing_stones.append(current_stack.get())
            
        for stone in existing_stones:
            temp_queue.put(stone)
        
        # Update stack
        self.stacks[row][col] = temp_queue
        return True

    def distribute_stack(self, path_positions):
        """Distribute stones from a stack along a path."""
        if len(path_positions) < 2:
            return False

        start = path_positions[0]
        stack_list = self.get_stack_as_list(start[0], start[1])
        
        # Validate distribution
        if len(stack_list) < len(path_positions) - 1:
            return False
        
        # Empty source stack
        while not self.stacks[start[0]][start[1]].empty():
            self.stacks[start[0]][start[1]].get()

        # Distribute stones (top to bottom)
        for i, stone in enumerate(reversed(stack_list)):
            if i + 1 < len(path_positions):
                nxt = path_positions[i + 1]
                target_stack = self.get_stack_as_list(nxt[0], nxt[1])
                
                new_queue = Queue()
                new_queue.put(stone)  # Distributed stone goes at bottom
                for existing_stone in target_stack:  # Add existing stones above
                    new_queue.put(existing_stone)
                    
                self.stacks[nxt[0]][nxt[1]] = new_queue
        
        return True

    def get_legal_moves(self, stone_color=None):
        """Get all positions where stones can be placed or distributed."""
        legal_moves = []
        
        # For stone placement, any non-empty stack is valid
        for r in range(self.rows):
            for c in range(self.cols):
                if not self.stacks[r][c].empty():
                    legal_moves.append((r, c))
        
        return legal_moves

    def get_win_state(self):
        """Check if the game has ended and determine the winner"""
        # Check rows for four in a row
        for row in range(self.rows):
            for col in range(self.cols - 3):
                if self.stacks[row][col].empty():
                    continue
                first = self.stacks[row][col].queue[0]
                if all(not self.stacks[row][col + i].empty() and 
                       self.stacks[row][col + i].queue[0] == first 
                       for i in range(1, 4)):
                    return WinState(True, first)

        # Check columns for four in a row
        for col in range(self.cols):
            for row in range(self.rows - 3):
                if self.stacks[row][col].empty():
                    continue
                first = self.stacks[row][col].queue[0]
                if all(not self.stacks[row + i][col].empty() and 
                       self.stacks[row + i][col].queue[0] == first 
                       for i in range(1, 4)):
                    return WinState(True, first)

        # Check diagonals (top-left to bottom-right)
        for row in range(self.rows - 3):
            for col in range(self.cols - 3):
                if self.stacks[row][col].empty():
                    continue
                first = self.stacks[row][col].queue[0]
                if all(not self.stacks[row + i][col + i].empty() and 
                       self.stacks[row + i][col + i].queue[0] == first 
                       for i in range(1, 4)):
                    return WinState(True, first)

        # Check diagonals (bottom-left to top-right)
        for row in range(3, self.rows):
            for col in range(self.cols - 3):
                if self.stacks[row][col].empty():
                    continue
                first = self.stacks[row][col].queue[0]
                if all(not self.stacks[row - i][col + i].empty() and 
                       self.stacks[row - i][col + i].queue[0] == first 
                       for i in range(1, 4)):
                    return WinState(True, first)

        # Check if all positions are filled (draw)
        if all(not self.stacks[row][col].empty() 
               for row in range(self.rows) 
               for col in range(self.cols)):
            return WinState(True, None)

        # Game is not over
        return WinState(False, None)

    def get_numpy_board(self):
        """Get board state as numpy array for neural network."""
        board = np.zeros((self.rows, self.cols), dtype=np.int8)
        for r in range(self.rows):
            for c in range(self.cols):
                stack = self.get_stack_as_list(r, c)
                if stack:
                    bottom_stone = stack[0]
                    board[r][c] = 1 if bottom_stone == "B" else (-1 if bottom_stone == "R" else 0)
        return board

    def with_stacks(self, stacks):
        """Create copy of board with specified stacks."""
        new_board = Board()
        new_board.stacks = stacks
        return new_board

    def __str__(self):
        board_str = ""
        for r in range(self.rows):
            for c in range(self.cols):
                stack = self.get_stack_as_list(r, c)
                board_str += f"{stack if stack else '[]'} "
            board_str += "\n"
        return board_str

    def copy(self):
        """Create a deep copy of the board."""
        new_board = Board()
        # Kopiere die Stacks manuell
        for r in range(self.rows):
            for c in range(self.cols):
                # Hole die Steine aus dem alten Stack
                stones = self.get_stack_as_list(r, c)
                # Füge sie dem neuen Stack hinzu
                for stone in stones:
                    new_board.stacks[r][c].put(stone)
        return new_board
