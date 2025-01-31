import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from Tools.utils import *

import numpy as np
import tensorflow as tf

# Import Keras layers and models from tensorflow
Model = tf.keras.models.Model
Input = tf.keras.layers.Input
Dense = tf.keras.layers.Dense
Conv2D = tf.keras.layers.Conv2D
Flatten = tf.keras.layers.Flatten
BatchNormalization = tf.keras.layers.BatchNormalization
Activation = tf.keras.layers.Activation
Add = tf.keras.layers.Add
Lambda = tf.keras.layers.Lambda
Adam = tf.keras.optimizers.Adam
Dropout = tf.keras.layers.Dropout


"""
NeuralNet for the game of Qawale.
Based on the TicTacToeNNet by Evgeny Tyurin and the AlphaZero paper.
"""
class QawaleNNet():
    def __init__(self, game, args):
        # game params
        self.board_x, self.board_y = game.getBoardSize()[:2]  # Nur die ersten zwei Werte verwenden
        self.action_size = game.getActionSize()
        self.args = args

        # Neural Net
        self.input_boards = Input(shape=(self.board_x, self.board_y, 1))  # Explizit 1 Kanal angeben

        # Normalize input
        x = Lambda(lambda x: x / 2.0)(self.input_boards)  # Normalize to [-1, 1] since input is -1, 0, 1, 2

        # First convolution block - process the board state
        x = Conv2D(filters=64, kernel_size=3, padding='same', data_format='channels_last')(x)
        x = BatchNormalization()(x)
        x = Activation('relu')(x)
        
        # Second convolution block - capture piece relationships
        x = Conv2D(filters=128, kernel_size=3, padding='same', data_format='channels_last')(x)
        x = BatchNormalization()(x)
        x = Activation('relu')(x)

        # Third convolution block - higher-level patterns
        x = Conv2D(filters=256, kernel_size=3, padding='same', data_format='channels_last')(x)
        x = BatchNormalization()(x)
        x = Activation('relu')(x)

        # Flatten and dense layers
        x = Flatten()(x)
        x = Dense(512, activation='relu')(x)
        x = Dropout(args.dropout)(x)
        x = Dense(256, activation='relu')(x)
        x = Dropout(args.dropout)(x)

        # Policy head - predict action probabilities
        pi = Dense(256, activation='relu')(x)
        pi = Dense(self.action_size, name='pi')(pi)  # Linear activation for numerical stability
        pi = Lambda(lambda x: tf.nn.softmax(x / 0.1))(pi)  # Temperature-scaled softmax

        # Value head - predict game outcome
        v = Dense(128, activation='relu')(x)
        v = Dense(1, activation='tanh', name='v')(v)

        self.model = Model(inputs=self.input_boards, outputs=[pi, v])
        self.model.compile(loss=['categorical_crossentropy', 'mean_squared_error'],
                          optimizer=Adam(learning_rate=args.lr),
                          loss_weights=[1, 1])
