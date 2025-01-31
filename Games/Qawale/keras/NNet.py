import argparse
import os
import shutil
import time
import random
import numpy as np
import math
import sys

from Tools.utils import dotdict
from Tools.neural_net import NeuralNet
import logging

from Games.Qawale.keras.QawaleNNet import QawaleNNet as qnnet

sys.path.append('..')

"""
NeuralNet wrapper class for the QawaleNNet.
Based on the TicTacToeNNet wrapper by Evgeny Tyurin
and the NNet by SourKream and Surag Nair.
"""

log = logging.getLogger(__name__)

args = dotdict({
    'lr': 0.001,
    'dropout': 0.3,
    'epochs': 10,
    'batch_size': 64,
    'cuda': False,
    'num_channels': 512,
})


class NNetWrapper(NeuralNet):
    def __init__(self, game):
        self.nnet = qnnet(game, args)
        self.board_x, self.board_y = game.getBoardSize()
        self.action_size = game.getActionSize()

    def train(self, examples):
        """
        examples: list of examples, each example is of form (board, pi, v)
        where pi is the policy vector and v is the value
        """
        input_boards, target_pis, target_vs = list(zip(*examples))
        input_boards = np.asarray(input_boards)
        target_pis = np.asarray(target_pis)
        target_vs = np.asarray(target_vs)
        self.nnet.model.fit(x=input_boards, 
                          y=[target_pis, target_vs],
                          batch_size=args.batch_size, 
                          epochs=args.epochs)

    def predict(self, board):
        """
        board: np array with board state
        returns: pi (policy - probability vector over actions),
                v (value - expected outcome [-1,1])
        """
        # timing
        start = time.time()

        # preparing input
        board = board[np.newaxis, :, :]

        # run
        pi, v = self.nnet.model.predict(board, verbose=False)

        return pi[0], v[0]

    def save_checkpoint(self, folder='checkpoint', filename='checkpoint.pth.tar'):
        """Save model checkpoint"""
        # change extension for Keras models
        filename = filename.split(".")[0] + ".h5"

        filepath = os.path.join(folder, filename)
        if not os.path.exists(folder):
            print("Checkpoint Directory does not exist! Making directory {}".format(folder))
            os.mkdir(folder)
        else:
            print("Checkpoint Directory exists!")
        self.nnet.model.save_weights(filepath)

    def load_checkpoint(self, folder='checkpoint', filename='checkpoint.pth.tar'):
        """Load model from checkpoint"""
        # change extension for Keras models
        filename = filename.split(".")[0] + ".h5"

        filepath = os.path.join(folder, filename)
        if not os.path.exists(filepath):
            raise ValueError("No model in path '{}'".format(filepath))
        self.nnet.model.load_weights(filepath)