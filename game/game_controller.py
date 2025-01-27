class GameController:
    def __init__(self, ki_agent, board):
        """
        ki_agent: Instanz von AlphaZeroAgent (oder einer ähnlichen KI-Klasse)
        board: Aktuelles Spielbrett bzw. GameState
        """
        self.ki_agent = ki_agent
        self.board = board
        self.current_player = 1  # z. B. 1 = Mensch, 2 = KI

    def make_move(self, move):
        """
        Mensch oder KI führt einen Zug aus
        """
        # 1) Zug ausführen
        self.board.execute_move(move, self.current_player)

        # 2) Spieler wechseln
        self.current_player = 2 if self.current_player == 1 else 1

        # 3) Falls jetzt der KI-Spieler dran ist, Zug der KI
        if self.current_player == 2:
            ki_move = self.ki_agent.select_move(self.board, self.current_player)
            self.board.execute_move(ki_move, self.current_player)
            self.current_player = 1

    def get_ki_performance(self):
        """
        Ruft die aktuelle Performance (Win Probability) des KI-Spielers ab.
        -> Hier kann man im Frontend eine Live-Anzeige realisieren.
        """
        if self.current_player == 2:
            # Aus Sicht des KI-Spielers selbst
            performance = self.ki_agent.evaluate_position(self.board, self.current_player)
        else:
            # Wenn der Mensch am Zug ist, kann man die KI-Bewertung trotzdem
            # aus Sicht des KI-Spielers abrufen.
            performance = self.ki_agent.evaluate_position(self.board, 2)

        return performance 