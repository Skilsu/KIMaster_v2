from Tools.i_game import IGame, np
from Games.checkers.CheckersLogic import Board
import math


class CheckersGame(IGame):
    """
    Checkers Game class implementing the alpha-zero-general Game interface.
    """

    def __init__(self, n: int = None):
        self.board = Board(n)
        self.n = n or self.board.n
        self.redundancy = 0
        self.ll_capture_hist = {}  # necessity of having a hist because undo function

    def getInitBoard(self):
        """return initial board (numpy array) and resets data"""
        self.resetData()
        return np.copy(self.board.pieces)

    def getBoardSize(self):
        return self.n, self.n

    def getActionSize(self):
        """return number of all possible actions"""
        return self.board.get_action_size()[0] + self.board.get_action_size()[1]

    def getNextState(self, board: np.array, player: int, action: tuple[int, int]):
        """if player takes action on board, return next (board,player)
          action must be a valid move"""
        b = Board(self.n, np.copy(board))

        if (self.stringRepresentation(b.pieces), player) in self.ll_capture_hist:
            b.last_long_capture = self.ll_capture_hist[(self.stringRepresentation(b.pieces), player)]

        pre_amount_pieces = np.count_nonzero(b.pieces)
        b.execute_action(action, player)
        post_amount_pieces = np.count_nonzero(b.pieces)
        if pre_amount_pieces == post_amount_pieces:
            self.redundancy += 1
        else:
            self.redundancy = 0

        if b.last_long_capture:
            next_actions = b.get_moves_for_square(*b.last_long_capture, player, captures_only=True)
            if next_actions:
                self.ll_capture_hist.update({(self.stringRepresentation(b.pieces), player): b.last_long_capture})
                return b.pieces, player  # player stays in turn if being able to capture another piece after capture

        return b.pieces, -player

    def getValidMoves(self, board: np.array, player: int):
        """returns a binary np.array (1 = valid action, 0 = invalid)"""
        b = Board(self.n, np.copy(board))

        if (self.stringRepresentation(b.pieces), player) in self.ll_capture_hist:
            b.last_long_capture = self.ll_capture_hist[(self.stringRepresentation(b.pieces), player)]
        legal_moves = b.get_legal_moves(player)
        valid_moves = np.zeros(self.getActionSize(), dtype=int)

        for moves_per_piece in legal_moves:
            for move in moves_per_piece:
                index = self.calcValidMoveIndex(b, move)
                valid_moves[index] = 1

        return valid_moves

    def getGameEnded(self, board: np.array, player: int):
        """returns 0 if not ended, 1 if player won, -1 if player lost"""
        if self.redundancy >= 30:
            self.redundancy = 0
            return 1e-4  # draw
        b = Board(self.n, np.copy(board))
        if b.has_legal_moves(player) and b.has_legal_moves(-player):
            return 0
        if b.has_legal_moves(player):
            self.redundancy = 0
            return 1
        if b.has_legal_moves(-player):
            self.redundancy = 0
            return -1
        self.redundancy = 0
        return 1e-4

    def analyze_move(self, board: np.array, move: tuple[int, int], player: int, top_k: int = 3):
        """
        Analysiert den gegebenen Zug und liefert:
        - Eine Bewertung des aktuellen Zugs
        - Alternativen (bessere Züge) mit deren Bewertungen
        - Textuelle Erklärungen für die Bewertungen
        - Strategische Muster und Zugketten
        - Taktische Muster
        - Visualisierung der Analyse
        """
        b = Board(self.n, np.copy(board))
        
        # Aktuelle Position bewerten
        current_value = self._evaluate_position(b, player)
        
        # Strategische Muster vor dem Zug analysieren
        pre_patterns = self._analyze_strategic_patterns(b, player)
        
        # Taktische Muster vor dem Zug analysieren
        pre_tactics = self._analyze_tactical_patterns(b, player)
        
        # Zug ausführen und neue Position bewerten
        b.execute_action(move, player)
        new_value = self._evaluate_position(b, player)
        value_change = new_value - current_value
        
        # Strategische Muster nach dem Zug analysieren
        post_patterns = self._analyze_strategic_patterns(b, player)
        
        # Taktische Muster nach dem Zug analysieren
        post_tactics = self._analyze_tactical_patterns(b, player)
        
        # Mögliche Zugketten analysieren
        move_sequences = self._analyze_move_sequences(b, player, depth=3)
        
        # Alle legalen Züge finden und bewerten
        legal_moves = b.get_legal_moves(player)
        moves_with_values = []
        
        for moves_per_piece in legal_moves:
            for alt_move in moves_per_piece:
                test_board = Board(self.n, np.copy(board))
                test_board.execute_action(alt_move, player)
                value = self._evaluate_position(test_board, player)
                # Zusätzliche Bewertung für Zugketten und Taktik
                sequence_value = self._evaluate_move_sequence(test_board, player, alt_move)
                tactical_value = self._evaluate_tactical_value(test_board, player, alt_move)
                moves_with_values.append((alt_move, value + sequence_value + tactical_value))
        
        # Nach Wert sortieren und Top-K auswählen
        moves_with_values.sort(key=lambda x: x[1], reverse=True)
        best_alternatives = moves_with_values[:top_k]
        
        # Hauptnachricht basierend auf allen Analysen
        message = self._generate_strategic_message(
            value_change, pre_patterns, post_patterns, 
            pre_tactics, post_tactics, move_sequences
        )
            
        # Erklärungen für die Alternativen generieren
        explanations = []
        for alt_move, value in best_alternatives:
            explanation = self._generate_move_explanation(board, alt_move, value - current_value)
            explanations.append(explanation)
            
        # Visualisierung der Analyse erstellen
        visualization = self._create_analysis_visualization(
            board, move, player, value_change,
            post_patterns, post_tactics, move_sequences
        )
            
        return {
            "message": message,
            "current_value": new_value,
            "alternatives": best_alternatives,
            "explanations": explanations,
            "strategic_patterns": post_patterns,
            "tactical_patterns": post_tactics,
            "move_sequences": move_sequences,
            "visualization": visualization
        }

    def _analyze_strategic_patterns(self, board: Board, player: int) -> dict:
        """Analysiert strategische Muster auf dem Brett."""
        patterns = {
            "doppelte_eckposition": False,
            "dreifache_diagonale": False,
            "blockade": False,
            "zentrumsformation": False,
            "randkontrolle": False
        }
        
        pieces = board.pieces
        
        # Prüfe Doppelte Eckposition
        corners = [(0,0), (0,self.n-1), (self.n-1,0), (self.n-1,self.n-1)]
        player_corners = sum(1 for r,c in corners if pieces[r,c] == player)
        patterns["doppelte_eckposition"] = player_corners >= 2
        
        # Prüfe Dreifache Diagonale
        diag_count = 0
        for i in range(self.n-2):
            if (pieces[i,i] == player and 
                pieces[i+1,i+1] == player and 
                pieces[i+2,i+2] == player):
                diag_count += 1
        patterns["dreifache_diagonale"] = diag_count > 0
        
        # Prüfe Blockade
        for row in range(1, self.n-1):
            consecutive = 0
            for col in range(self.n):
                if pieces[row,col] == player:
                    consecutive += 1
                else:
                    consecutive = 0
                if consecutive >= 3:
                    patterns["blockade"] = True
                    break
        
        # Prüfe Zentrumsformation
        center_pieces = 0
        for r in range(self.n//4, 3*self.n//4):
            for c in range(self.n//4, 3*self.n//4):
                if pieces[r,c] == player:
                    center_pieces += 1
        patterns["zentrumsformation"] = center_pieces >= 3
        
        # Prüfe Randkontrolle
        edge_control = 0
        for i in range(self.n):
            if pieces[0,i] == player or pieces[self.n-1,i] == player:
                edge_control += 1
            if pieces[i,0] == player or pieces[i,self.n-1] == player:
                edge_control += 1
        patterns["randkontrolle"] = edge_control >= 4
        
        return patterns

    def _analyze_tactical_patterns(self, board: Board, player: int) -> dict:
        """Analysiert taktische Muster auf dem Brett."""
        tactics = {
            "gabel": False,
            "fesselung": False,
            "opferung": False,
            "durchbruch": False,
            "hinterhalt": False
        }
        
        pieces = board.pieces
        opponent = -player
        
        # Prüfe Gabel (ein Stein bedroht zwei oder mehr gegnerische Steine)
        for row in range(self.n):
            for col in range(self.n):
                if pieces[row, col] == player:
                    threatened_pieces = self._count_threatened_pieces_from(board, row, col, player)
                    if threatened_pieces >= 2:
                        tactics["gabel"] = True
                        
        # Prüfe Fesselung (ein Stein kann nicht ziehen, ohne einen wertvolleren zu verlieren)
        for row in range(self.n):
            for col in range(self.n):
                if pieces[row, col] == opponent:
                    if self._is_piece_pinned(board, row, col, opponent):
                        tactics["fesselung"] = True
                        
        # Prüfe Opferung (ein Stein kann geopfert werden, um mehr Material zu gewinnen)
        tactics["opferung"] = self._detect_sacrifice(board, player)
        
        # Prüfe Durchbruch (Chance auf Dame-Umwandlung in wenigen Zügen)
        tactics["durchbruch"] = self._detect_breakthrough(board, player)
        
        # Prüfe Hinterhalt (versteckte Schlagmöglichkeit)
        tactics["hinterhalt"] = self._detect_ambush(board, player)
        
        return tactics

    def _count_threatened_pieces_from(self, board: Board, row: int, col: int, player: int) -> int:
        """Zählt wie viele gegnerische Steine von einer Position aus bedroht sind."""
        count = 0
        pieces = board.pieces
        
        for dr, dc in [(-2,2), (-2,-2), (2,2), (2,-2)]:
            new_row, new_col = row + dr, col + dc
            if 0 <= new_row < self.n and 0 <= new_col < self.n:
                if pieces[row + dr//2, col + dc//2] == -player and pieces[new_row, new_col] == 0:
                    count += 1
                    
        return count

    def _is_piece_pinned(self, board: Board, row: int, col: int, player: int) -> bool:
        """Prüft ob ein Stein gefesselt ist (nicht ziehen kann ohne größeren Verlust)."""
        pieces = board.pieces
        
        # Simuliere alle möglichen Züge des Steins
        legal_moves = board.get_moves_for_square(row, col, player)
        if not legal_moves:
            return False
            
        # Prüfe für jeden Zug, ob er zu Materialverlust führt
        for move in legal_moves:
            test_board = Board(self.n, np.copy(pieces))
            test_board.execute_action(move, player)
            
            # Wenn nach dem Zug ein wertvollerer Stein geschlagen werden kann
            material_before = np.sum(pieces == player) + np.sum(pieces == player * 3) * 3
            threatened = self._evaluate_threatened_pieces(test_board, -player)
            if threatened > material_before:
                return True
                
        return False

    def _detect_sacrifice(self, board: Board, player: int) -> bool:
        """Erkennt mögliche vorteilhafte Opferzüge."""
        pieces = board.pieces
        
        for row in range(self.n):
            for col in range(self.n):
                if pieces[row, col] == player:
                    # Prüfe ob der Stein geopfert werden kann
                    legal_moves = board.get_moves_for_square(row, col, player)
                    for move in legal_moves:
                        test_board = Board(self.n, np.copy(pieces))
                        test_board.execute_action(move, player)
                        
                        # Wenn nach dem Opfer mehr Material gewonnen werden kann
                        if self._evaluate_threatened_pieces(test_board, player) > 1.5:
                            return True
                            
        return False

    def _detect_breakthrough(self, board: Board, player: int) -> bool:
        """Erkennt mögliche Durchbrüche zur Dame-Umwandlung."""
        pieces = board.pieces
        target_row = 0 if player == 1 else self.n - 1
        
        for col in range(self.n):
            # Prüfe Steine in der vorletzten Reihe vor der Umwandlung
            check_row = 1 if player == 1 else self.n - 2
            if pieces[check_row, col] == player:
                # Prüfe ob der Weg zur Umwandlung frei ist oder freigeräumt werden kann
                if pieces[target_row, col-1 if col > 0 else col+1] == 0:
                    return True
                    
        return False

    def _detect_ambush(self, board: Board, player: int) -> bool:
        """Erkennt versteckte Schlagmöglichkeiten (Hinterhalt)."""
        pieces = board.pieces
        
        for row in range(self.n):
            for col in range(self.n):
                if pieces[row, col] == player:
                    # Prüfe auf versteckte Schlagmöglichkeiten
                    for dr, dc in [(-2,2), (-2,-2), (2,2), (2,-2)]:
                        if 0 <= row + dr < self.n and 0 <= col + dc < self.n:
                            if pieces[row + dr//2, col + dc//2] == -player:
                                if pieces[row + dr, col + dc] == 0:
                                    # Prüfe ob der Gegner den drohenden Schlag nicht sofort sehen kann
                                    if not self._is_obvious_threat(board, row, col, player):
                                        return True
                                        
        return False

    def _is_obvious_threat(self, board: Board, row: int, col: int, player: int) -> bool:
        """Prüft ob eine Bedrohung offensichtlich ist."""
        pieces = board.pieces
        
        # Eine Bedrohung ist offensichtlich, wenn:
        # 1. Der bedrohende Stein direkt neben dem bedrohten steht
        # 2. Es keine anderen Steine gibt, die die Aufmerksamkeit ablenken
        
        threatened_count = self._count_threatened_pieces_from(board, row, col, player)
        nearby_pieces = 0
        
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if 0 <= row + dr < self.n and 0 <= col + dc < self.n:
                    if pieces[row + dr, col + dc] != 0:
                        nearby_pieces += 1
                        
        return threatened_count == 1 and nearby_pieces <= 3

    def _create_analysis_visualization(self, board: np.array, move: tuple, 
                                    player: int, value_change: float,
                                    patterns: dict, tactics: dict,
                                    sequences: list) -> str:
        """Erstellt eine textuelle Visualisierung der Analyse."""
        visualization = []
        
        # Überschrift
        visualization.append("=== Zuganalyse ===")
        visualization.append(f"Bewertungsänderung: {value_change:+.2f}")
        
        # Aktive strategische Muster
        active_patterns = [k for k, v in patterns.items() if v]
        if active_patterns:
            visualization.append("\nAktive strategische Muster:")
            for pattern in active_patterns:
                visualization.append(f"✓ {pattern}")
                
        # Aktive taktische Muster
        active_tactics = [k for k, v in tactics.items() if v]
        if active_tactics:
            visualization.append("\nAktive taktische Muster:")
            for tactic in active_tactics:
                visualization.append(f"⚡ {tactic}")
                
        # Beste Zugsequenz
        if sequences:
            visualization.append("\nBeste Zugfolge:")
            best_sequence = sequences[0]
            for i, (move, value) in enumerate(best_sequence, 1):
                visualization.append(f"{i}. {move} ({value:+.2f})")
                
        return "\n".join(visualization)

    def _generate_strategic_message(self, value_change: float, pre_patterns: dict, 
                                  post_patterns: dict, pre_tactics: dict,
                                  post_tactics: dict, move_sequences: list) -> str:
        """Generiert eine strategische Nachricht basierend auf allen Analysen."""
        messages = []
        
        # Grundlegende Bewertung
        if value_change > 0.1:
            messages.append("Starker Zug!")
        elif value_change < -0.1:
            messages.append("Vorsicht!")
        else:
            messages.append("Neutraler Zug.")
            
        # Neue strategische Muster
        new_patterns = [k for k, v in post_patterns.items() 
                       if v and not pre_patterns.get(k, False)]
        if new_patterns:
            pattern_names = {
                "doppelte_eckposition": "Doppelte Eckposition",
                "dreifache_diagonale": "Dreifache Diagonale",
                "blockade": "Blockade",
                "zentrumsformation": "Zentrumsformation",
                "randkontrolle": "Randkontrolle"
            }
            patterns_str = ", ".join(pattern_names[p] for p in new_patterns)
            messages.append(f"Etabliert {patterns_str}.")
            
        # Neue taktische Muster
        new_tactics = [k for k, v in post_tactics.items() 
                      if v and not pre_tactics.get(k, False)]
        if new_tactics:
            tactic_names = {
                "gabel": "Gabelangriff",
                "fesselung": "Fesselung",
                "opferung": "Opferkombination",
                "durchbruch": "Durchbruch zur Dame",
                "hinterhalt": "Hinterhalt"
            }
            tactics_str = ", ".join(tactic_names[t] for t in new_tactics)
            messages.append(f"Ermöglicht {tactics_str}.")
            
        # Zugketten-Analyse
        if move_sequences:
            best_sequence = move_sequences[0]
            if len(best_sequence) > 1:
                messages.append("Beginnt eine starke Zugfolge.")
                
        return " ".join(messages)

    def _analyze_move_sequences(self, board: Board, player: int, depth: int = 3) -> list:
        """Analysiert mögliche Zugketten für die nächsten Züge."""
        sequences = []
        
        def search_sequences(current_board: Board, current_sequence: list, current_depth: int):
            if current_depth <= 0:
                return
                
            legal_moves = current_board.get_legal_moves(player)
            for moves_per_piece in legal_moves:
                for move in moves_per_piece:
                    next_board = Board(self.n, np.copy(current_board.pieces))
                    next_board.execute_action(move, player)
                    
                    # Bewerte die Sequenz
                    sequence_value = self._evaluate_position(next_board, player)
                    
                    new_sequence = current_sequence + [(move, sequence_value)]
                    sequences.append(new_sequence)
                    
                    # Rekursiv weitere Züge suchen
                    search_sequences(next_board, new_sequence, current_depth - 1)
        
        search_sequences(board, [], depth)
        
        # Sortiere nach Gesamtwert der Sequenz
        sequences.sort(key=lambda seq: sum(value for _, value in seq), reverse=True)
        
        return sequences[:5]  # Rückgabe der 5 besten Sequenzen

    def _evaluate_move_sequence(self, board: Board, player: int, initial_move: tuple) -> float:
        """Bewertet eine mögliche Zugsequenz."""
        sequence_value = 0.0
        
        # Führe den initialen Zug aus
        test_board = Board(self.n, np.copy(board.pieces))
        test_board.execute_action(initial_move, player)
        
        # Prüfe auf Folgezüge
        next_moves = test_board.get_legal_moves(player)
        if next_moves:
            # Bewerte die besten Folgezüge
            follow_up_values = []
            for moves_per_piece in next_moves:
                for move in moves_per_piece:
                    next_board = Board(self.n, np.copy(test_board.pieces))
                    next_board.execute_action(move, player)
                    follow_up_values.append(self._evaluate_position(next_board, player))
            
            if follow_up_values:
                # Bonus für gute Folgezüge
                sequence_value += max(follow_up_values) * 0.3
        
        return sequence_value

    def _evaluate_position(self, board: Board, player: int) -> float:
        """
        Bewertet die aktuelle Position für den angegebenen Spieler.
        Berücksichtigt:
        - Materialvorteil
        - Kontrollierte Felder
        - Entwicklung der Steine
        - Schutz der eigenen Steine
        - Bedrohte gegnerische Steine
        - Kontrolle über wichtige Diagonalen
        - Bewegungsfreiheit
        - Endspielstrategie
        """
        value = 0.0
        pieces = board.pieces
        
        # Materialwert berechnen
        value += np.sum(pieces == player) * 1.0  # Normale Steine
        value += np.sum(pieces == player * 3) * 3.0  # Damen (3x so wertvoll)
        value -= np.sum(pieces == -player) * 1.0  # Gegnerische normale Steine
        value -= np.sum(pieces == -player * 3) * 3.0  # Gegnerische Damen
        
        total_pieces = np.count_nonzero(np.abs(pieces))
        is_endgame = total_pieces <= 8  # Endspielphase bei 8 oder weniger Steinen
        
        # Bonus für zentrale Position und Entwicklung
        center_rows = pieces[self.n//4:3*self.n//4]
        center_cols = pieces[:, self.n//4:3*self.n//4]
        
        if not is_endgame:
            # Im Mittelspiel ist Zentrumskontrolle wichtiger
            value += np.sum(center_rows == player) * 0.4  # Erhöhter Bonus für zentrale Steine
            value += np.sum(center_cols == player) * 0.4
            value += np.sum(center_rows == player * 3) * 0.8  # Erhöhter Bonus für zentrale Damen
        else:
            # Im Endspiel ist Materialvorteil und Bewegungsfreiheit wichtiger
            value += self._evaluate_endgame_position(board, player) * 0.6
        
        # Bonus für geschützte Steine
        protection_value = self._evaluate_protected_pieces(board, player)
        value += protection_value * (0.5 if not is_endgame else 0.3)
        
        # Bonus für bedrohte gegnerische Steine
        threat_value = self._evaluate_threatened_pieces(board, player)
        value += threat_value * (0.6 if not is_endgame else 0.4)
        
        # Bonus für Kontrolle über wichtige Diagonalen
        diagonal_control = self._evaluate_diagonal_control(board, player)
        value += diagonal_control * (0.4 if not is_endgame else 0.2)
        
        # Malus für isolierte Steine
        isolated_count = self._count_isolated_pieces(board, player)
        value -= isolated_count * (0.3 if not is_endgame else 0.1)
        
        # Bonus für Bewegungsfreiheit
        mobility_value = self._evaluate_mobility(board, player)
        value += mobility_value * (0.3 if not is_endgame else 0.5)
        
        return value

    def _evaluate_endgame_position(self, board: Board, player: int) -> float:
        """Bewertet die Position speziell für das Endspiel."""
        value = 0.0
        pieces = board.pieces
        opponent = -player
        
        # Position der Damen ist im Endspiel besonders wichtig
        for row in range(self.n):
            for col in range(self.n):
                if pieces[row, col] == player * 3:  # Dame
                    # Bewerte Abstand zu gegnerischen Steinen
                    distances = []
                    for orow in range(self.n):
                        for ocol in range(self.n):
                            if pieces[orow, ocol] == opponent or pieces[orow, ocol] == opponent * 3:
                                distance = abs(row - orow) + abs(col - ocol)
                                distances.append(distance)
                    if distances:
                        # Bonus für geringen Abstand zu gegnerischen Steinen
                        value += (8 - min(distances)) * 0.2
        
        return value

    def _evaluate_mobility(self, board: Board, player: int) -> float:
        """Bewertet die Bewegungsfreiheit der Steine."""
        mobility_value = 0.0
        
        # Zähle mögliche Züge für alle Steine
        legal_moves = board.get_legal_moves(player)
        total_moves = sum(len(moves) for moves in legal_moves)
        
        # Mehr mögliche Züge = bessere Bewegungsfreiheit
        mobility_value += total_moves * 0.1
        
        # Bonus für Damen mit vielen Zugmöglichkeiten
        pieces = board.pieces
        for row in range(self.n):
            for col in range(self.n):
                if pieces[row, col] == player * 3:  # Dame
                    moves_for_king = len([m for moves in legal_moves 
                                        for m in moves 
                                        if m[0] == row and m[1] == col])
                    mobility_value += moves_for_king * 0.2
        
        return mobility_value

    def _evaluate_protected_pieces(self, board: Board, player: int) -> float:
        """Bewertet wie gut die eigenen Steine geschützt sind."""
        protected_value = 0.0
        pieces = board.pieces
        
        # Steine am Rand sind teilweise geschützt
        edge_mask = np.zeros_like(pieces, dtype=bool)
        edge_mask[0, :] = edge_mask[-1, :] = edge_mask[:, 0] = edge_mask[:, -1] = True
        protected_value += np.sum((pieces == player) & edge_mask) * 0.5
        
        # Steine mit Unterstützung sind besser geschützt
        for row in range(1, self.n-1):
            for col in range(1, self.n-1):
                if pieces[row, col] == player:
                    # Prüfe Nachbarfelder auf unterstützende Steine
                    if (pieces[row-1, col-1] == player or 
                        pieces[row-1, col+1] == player or
                        pieces[row+1, col-1] == player or 
                        pieces[row+1, col+1] == player):
                        protected_value += 1.0
                        
        return protected_value

    def _evaluate_threatened_pieces(self, board: Board, player: int) -> float:
        """Bewertet wie viele gegnerische Steine bedroht sind."""
        threatened_value = 0.0
        pieces = board.pieces
        opponent = -player
        
        for row in range(1, self.n-1):
            for col in range(1, self.n-1):
                if pieces[row, col] == opponent:
                    # Prüfe ob der Stein geschlagen werden kann
                    if self._can_be_captured(board, row, col, player):
                        threatened_value += 1.0
                        if abs(pieces[row, col]) == 3:  # Wenn es eine Dame ist
                            threatened_value += 2.0
                            
        return threatened_value

    def _evaluate_diagonal_control(self, board: Board, player: int) -> float:
        """Bewertet die Kontrolle über wichtige Diagonalen."""
        control_value = 0.0
        pieces = board.pieces
        
        # Hauptdiagonalen
        main_diag = np.diagonal(pieces)
        second_diag = np.diagonal(np.fliplr(pieces))
        
        control_value += np.sum(main_diag == player) * 0.3
        control_value += np.sum(second_diag == player) * 0.3
        
        # Damen auf Diagonalen sind besonders wertvoll
        control_value += np.sum(main_diag == player * 3) * 0.6
        control_value += np.sum(second_diag == player * 3) * 0.6
        
        return control_value

    def _count_isolated_pieces(self, board: Board, player: int) -> int:
        """Zählt die Anzahl isolierter Steine (ohne Unterstützung)."""
        isolated_count = 0
        pieces = board.pieces
        
        for row in range(1, self.n-1):
            for col in range(1, self.n-1):
                if pieces[row, col] == player:
                    has_support = False
                    # Prüfe alle Nachbarfelder
                    for dr in [-1, 1]:
                        for dc in [-1, 1]:
                            if 0 <= row + dr < self.n and 0 <= col + dc < self.n:
                                if pieces[row + dr, col + dc] == player:
                                    has_support = True
                                    break
                    if not has_support:
                        isolated_count += 1
        
        return isolated_count

    def _can_be_captured(self, board: Board, row: int, col: int, player: int) -> bool:
        """Prüft ob ein Stein auf der angegebenen Position geschlagen werden kann."""
        pieces = board.pieces
        
        # Prüfe alle möglichen Schlagrichtungen
        for dr in [-2, 2]:
            for dc in [-2, 2]:
                if 0 <= row + dr < self.n and 0 <= col + dc < self.n:
                    # Position des schlagenden Steins
                    capture_row = row + dr//2
                    capture_col = col + dc//2
                    
                    if 0 <= capture_row < self.n and 0 <= capture_col < self.n:
                        if pieces[capture_row, capture_col] == player:
                            # Prüfe ob das Zielfeld frei ist
                            if pieces[row + dr, col + dc] == 0:
                                return True
        
        return False

    def _generate_move_explanation(self, board: np.array, move: tuple[int, int, int, int], value_change: float) -> str:
        """Generiert eine natürlichsprachliche Erklärung für einen Zug."""
        row, col, nrow, ncol = move
        explanations = []
        
        # Prüfe Spielphase
        total_pieces = np.count_nonzero(np.abs(board))
        is_endgame = total_pieces <= 8
        
        # Schlagzug
        if abs(row - nrow) == 2:
            explanations.append(f"Schlagzug von {row},{col} nach {nrow},{ncol}")
            if abs(board[row, col]) == 3:
                explanations.append("mit einer Dame")
            explanations.append("- gewinnt Material")
            
            # Zusätzliche Schlagmöglichkeiten prüfen
            test_board = Board(self.n, np.copy(board))
            test_board.execute_action(move, 1)
            if self._evaluate_threatened_pieces(test_board, 1) > 0:
                explanations.append("und ermöglicht weitere Schlagzüge")
        
        # Dame wird erreicht
        elif nrow == 0 or nrow == self.n-1:
            explanations.append(f"Zug von {row},{col} nach {nrow},{ncol}")
            explanations.append("- erreicht eine Dame")
            if is_endgame:
                explanations.append("(besonders wichtig im Endspiel)")
            
        # Strategische Bewertung
        else:
            explanations.append(f"Zug von {row},{col} nach {nrow},{ncol}")
            
            # Bewegung ins Zentrum
            if (self.n//4 <= nrow <= 3*self.n//4) and (self.n//4 <= ncol <= 3*self.n//4):
                if not is_endgame:
                    explanations.append("- verbessert die zentrale Position")
                else:
                    explanations.append("- sichert eine strategische Position im Endspiel")
            
            # Schutz und Unterstützung
            test_board = Board(self.n, np.copy(board))
            test_board.execute_action(move, 1)
            
            # Bewegungsfreiheit
            if self._evaluate_mobility(test_board, 1) > self._evaluate_mobility(board, 1):
                explanations.append("- erhöht die Bewegungsfreiheit")
                if abs(board[row, col]) == 3:
                    explanations.append("der Dame")
            
            # Schutz durch andere Steine
            if self._evaluate_protected_pieces(test_board, 1) > self._evaluate_protected_pieces(board, 1):
                explanations.append("- verstärkt den Schutz der Steine")
            
            # Bedrohung gegnerischer Steine
            if self._evaluate_threatened_pieces(test_board, 1) > self._evaluate_threatened_pieces(board, 1):
                explanations.append("- bedroht gegnerische Steine")
            
            # Kontrolle über Diagonalen
            if self._evaluate_diagonal_control(test_board, 1) > self._evaluate_diagonal_control(board, 1):
                explanations.append("- verbessert die Kontrolle über wichtige Diagonalen")
            
            # Vermeidung von Isolation
            if self._count_isolated_pieces(test_board, 1) < self._count_isolated_pieces(board, 1):
                explanations.append("- reduziert die Anzahl isolierter Steine")
            
            # Wertänderung mit Kontext
            if value_change > 0:
                if is_endgame:
                    explanations.append(f"- verbessert die Endspielposition um {value_change:.2f}")
                else:
                    explanations.append(f"- verbessert die Gesamtposition um {value_change:.2f}")
            elif value_change < 0:
                explanations.append(f"- Vorsicht: verschlechtert die Position um {abs(value_change):.2f}")
        
        return " ".join(explanations)

    def getSymmetries(self, board: np.array, pi: list):
        """mirror, rotational"""
        length = math.sqrt(len(pi))
        assert length.is_integer()  # otherwise padding would be wrong
        length = int(length)

        # therefore the padding:
        # => getting a pi distribution in form of a square two-dimensional array according to all the valid moves
        # in validMoves
        # => being able to rotate pi vector in the same manner as the board
        # ==> moves getting their according pi probability
        pi_board = np.reshape(pi, (length, length))
        lst = []

        for i in [2, 4]:  # rotate by 180 degree
            for fliplr in [False, True]:
                for flipud in [False, True]:
                    newB = np.rot90(board, i)
                    newPi = np.rot90(pi_board, i)
                    if fliplr and flipud:
                        continue
                    if fliplr:
                        newB = np.fliplr(newB)
                        newPi = np.fliplr(newPi)
                    if flipud:
                        newB = np.flipud(newB)
                        newPi = np.flipud(newPi)
                    lst.append((newB, list(newPi.ravel())))

        return lst

    def translate(self, board: np.array, player: int, index: int) -> any:
        """translates index calculated by nnet model to actual move"""
        b = Board(self.n, np.copy(board))
        if (self.stringRepresentation(b.pieces), player) in self.ll_capture_hist:
            b.last_long_capture = self.ll_capture_hist[(self.stringRepresentation(b.pieces), player)]
        moves = b.flat_legal_moves(player)
        move_indices = [self.calcValidMoveIndex(b, m) for m in moves]
        i = move_indices.index(index)
        move = moves[i]
        one_d_move = self.two_d_to_one_d(move)
        return one_d_move

    def rotateMove(self, move: int | tuple[int, int]):
        """for our frontend - both players play from bottom to top
        => necessity to rotate move for one of the players"""
        empty_board = np.zeros([self.n, self.n], dtype=int)
        if type(move) is tuple:
            to_rotate = [*move]
        else:
            to_rotate = [move]
        rotated = []
        for pos in to_rotate:
            empty_board[pos // self.n, pos % self.n] = 1
            rot_board = np.rot90(empty_board, 2)
            rotated.append([i for i, pos in enumerate(rot_board.flatten()) if pos == 1][0])
            empty_board[pos // self.n, pos % self.n] = 0
        return rotated[0] if len(rotated) == 1 else (rotated[0], rotated[1])

    def resetData(self):
        self.redundancy = 0
        self.ll_capture_hist.clear()
        self.board = Board(self.n)

    def two_d_to_one_d(self, move: tuple[int, int, int, int]) -> tuple[int, int]:
        row, col, nrow, ncol = move
        return row * self.n + col, nrow * self.n + ncol

    def calcValidMoveIndex(self, board: Board, move: tuple[int, int, int, int]):
        """calculates unique index for every move in range getActionsSize for method validMoves ..."""
        row, col, nrow, ncol = move
        index = ((((row * self.n + col) * (self.n - 1) * 4 + (nrow - row + 1) * 2 + (ncol - col + 1) * 2) // 2) +
                 (self.n - 3))
        padding = board.get_action_size()[1]
        if index > ((self.getActionSize() - padding) // 2):  # inserting padding "in the middle"
            index += padding
        return index - 1  # because array starts with index 0

    def stringRepresentation(self, board):
        return board.tostring()

    def drawTerminal(self, board: np.array, valid_moves: bool, cur_player: int, *args: any):
        if valid_moves:
            b = Board(self.n, pieces=np.copy(board))
            if (self.stringRepresentation(b.pieces), cur_player) in self.ll_capture_hist:
                b.last_long_capture = self.ll_capture_hist[(self.stringRepresentation(b.pieces), cur_player)]
            legal_moves = b.flat_legal_moves(cur_player)
            if args and len(args) > 0:  # returns valid moves only for the demanded position
                from_pos = args[0]
                one_dim_moves = [self.two_d_to_one_d(move) for move in legal_moves]
                return str([(f_pos, t_pos) for (f_pos, t_pos) in one_dim_moves if from_pos == f_pos])
            else:  # returns all valid moves
                return str([self.two_d_to_one_d(move) for move in legal_moves])

        else:
            horizontal_border = '  +' + '-' * (4 * self.n - 1) + '+\n'
            output = horizontal_border

            for row in range(self.n):
                row_str = f'{row} |'
                for col in range(self.n):
                    piece = board[row][col]
                    if piece == 0:
                        row_str += '   |'
                    elif piece == 1:
                        row_str += ' O |'  # O for Non_King
                    elif piece == 3:
                        row_str += ' @ |'  # @ for King
                    elif piece == -1:
                        row_str += ' X |'  # X for opponent's Non_King
                    elif piece == -3:
                        row_str += ' K |'  # K for opponent's King
                output += row_str + '\n' + horizontal_border

            # Add column indices below the board
            col_indices = '    ' + '   '.join([f'{col}' for col in range(self.n)]) + '\n'
            output += col_indices

            return output

    def draw(self, board: np.array, valid_moves: bool, cur_player: int, *args: any):
        import pygame
        b = Board(self.n, np.copy(board))
        if (self.stringRepresentation(b.pieces), cur_player) in self.ll_capture_hist:
            b.last_long_capture = self.ll_capture_hist[(self.stringRepresentation(b.pieces), cur_player)]

        king_white_img = pygame.image.load('../Games/checkers/king_white.png')
        king_black_img = pygame.image.load('../Games/checkers/king_black.png')
        king_valid = pygame.image.load('../Games/checkers/king_valid.png')

        SQUARESIZE = 100
        WIDTH = self.n * SQUARESIZE
        HEIGHT = self.n * SQUARESIZE

        color_light_square = (252, 252, 244)  # Cream
        color_dark_square = (211, 178, 104)  # Sand
        color_piece_white = (255, 255, 255)  # White
        color_piece_black = (0, 0, 0)  # Black
        color_valid = (144, 238, 144)  # Light green for valid moves

        pygame.init()
        surface = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)

        valid_squares = []

        if valid_moves and args and len(args) > 0:  # for drawing highlighting where moves are possible
            from_pos = args[0]

            legal_moves = b.flat_legal_moves(cur_player)
            one_dim_moves = [self.two_d_to_one_d(move) for move in legal_moves]
            indices = [(i, f_pos) for i, (f_pos, t_pos) in enumerate(one_dim_moves) if from_pos == f_pos]
            for i, from_pos in indices:
                to_pos = one_dim_moves[i][1]
                row, col = to_pos // self.n, to_pos % self.n
                valid_squares.append((row, col, from_pos))  # destin. row and col and the pos from where the move came

        # Draw the board
        for row in range(self.n):
            for col in range(self.n):
                if (row + col) % 2 == 0:
                    square_color = color_light_square
                else:
                    square_color = color_dark_square

                # Draw grid
                pygame.draw.rect(surface, square_color,
                                 (col * SQUARESIZE, row * SQUARESIZE, SQUARESIZE, SQUARESIZE))  # 1

                piece = board[row][col]
                center = (col * SQUARESIZE + SQUARESIZE // 2, row * SQUARESIZE + SQUARESIZE // 2)
                radius = SQUARESIZE // 3

                if piece == -1:
                    self.drawToken(surface, color_piece_black, color_piece_white, center, radius)
                elif piece == -3:
                    king_image = king_black_img
                    if cur_player == -1:
                        king_image = pygame.transform.rotate(king_image, 180)
                    king_image = pygame.transform.scale(king_image, (SQUARESIZE, SQUARESIZE))
                    surface.blit(king_image, (col * SQUARESIZE, row * SQUARESIZE))
                elif piece == 1:
                    self.drawToken(surface, color_piece_white, color_piece_black, center, radius)
                elif piece == 3:
                    king_image = king_white_img
                    if cur_player == -1:
                        king_image = pygame.transform.rotate(king_image, 180)
                    king_image = pygame.transform.scale(king_image, (SQUARESIZE, SQUARESIZE))
                    surface.blit(king_image, (col * SQUARESIZE, row * SQUARESIZE))

                if valid_moves and args and len(args) > 0:
                    for a, b, from_pos in valid_squares:
                        if (row, col) == (a, b):
                            piece = board[from_pos // self.n][from_pos % self.n]
                            if abs(piece) == 1:
                                pygame.draw.circle(surface, color_valid, center, radius * 0.6)
                            if abs(piece) == 3:
                                king_image = king_valid
                                if cur_player == -1:
                                    king_image = pygame.transform.rotate(king_image, 180)
                                king_image = pygame.transform.scale(king_image,
                                                                    (SQUARESIZE * 0.6, SQUARESIZE * 0.6))

                                surface.blit(king_image, (col * SQUARESIZE + SQUARESIZE // 5,
                                                          row * SQUARESIZE + SQUARESIZE // 5))

        if cur_player == -1:
            surface = pygame.transform.rotate(surface, 180)  # Rotate board for player -1

        return surface

    def drawToken(self, surface, color1, color2, center, radius):
        import pygame
        pygame.draw.circle(surface, color2, center, radius * 1.05)
        pygame.draw.circle(surface, color1, center, radius)
        pygame.draw.circle(surface, color2, center, radius * 0.80)
        pygame.draw.circle(surface, color1, center, radius * 0.72)

    def _evaluate_tactical_value(self, board: Board, player: int, move: tuple) -> float:
        """Bewertet den taktischen Wert eines Zuges."""
        tactical_value = 0.0
        
        # Analysiere taktische Muster
        tactics = self._analyze_tactical_patterns(board, player)
        
        # Gewichtung der verschiedenen taktischen Muster
        weights = {
            "gabel": 0.8,
            "fesselung": 0.6,
            "opferung": 0.7,
            "durchbruch": 1.0,
            "hinterhalt": 0.5
        }
        
        # Addiere gewichtete Werte für aktive Taktiken
        for tactic, active in tactics.items():
            if active:
                tactical_value += weights[tactic]
                
        # Zusätzliche taktische Bewertungen
        
        # Bewerte Materialgewinn durch Schlagzüge
        row, col, nrow, ncol = move
        if abs(row - nrow) == 2:  # Schlagzug
            tactical_value += 0.5
            # Bonus für Schlag einer Dame
            if abs(board.pieces[row + (nrow-row)//2, col + (ncol-col)//2]) == 3:
                tactical_value += 1.0
                
        # Bewerte Damenumwandlung
        if nrow == 0 or nrow == self.n-1:
            tactical_value += 0.8
            
        # Bewerte Kontrolle über kritische Felder
        if self.n//4 <= nrow <= 3*self.n//4 and self.n//4 <= ncol <= 3*self.n//4:
            tactical_value += 0.3
            
        # Bewerte Zugzwang-Situationen
        opponent_moves = len(board.get_legal_moves(-player))
        if opponent_moves <= 2:
            tactical_value += 0.4
            
        return tactical_value
