import os
import sys
sys.path.append('../../../')

from Games.Qawale.QawaleGame import QawaleGame
from Games.Qawale.keras.NNet import NNetWrapper

"""
Initialize and save an empty model for Qawale
"""

def init_model():
    # Create game instance
    game = QawaleGame()
    
    # Create neural network
    nnet = NNetWrapper(game)
    
    # Save the initialized model
    nnet.save_checkpoint('', 'best.h5')

if __name__ == "__main__":
    init_model()