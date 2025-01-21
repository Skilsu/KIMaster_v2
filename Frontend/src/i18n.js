import { createI18n } from "vue-i18n";
const messages = {
  ////////////////////////////////////////////////English///////////////////////////////////////////////////////////////////////////////
  en: {
    message: {
      home: "Home",
      instruction: "Instruction",
      leaderboard: "Leaderboard",
      achievements: "Achievements",
      welcome: "Welcome to KIMaster",
      subtitle: "Here you can test your Game-AI",
      enter_lobby_key: "Enter Lobby Key",
      join_lobby: "Join Lobby",
      joinAs: "Join as",
      lobby_join_failed: "Lobby Join Failed!",
      lobby_swap_failed: "Position occupied!",
      game_start_failed: "Wrong amount of players!",
      createLobby: "Create Lobby",
      create: "Create",
      chess: "Chess",
      connect4: "Connect 4",
      tictactoe: "Tic Tac Toe",
      othello: "Othello",
      nim: "Nim",
      checkers: "Checkers",
      lobby: "Lobby",
      lobby_welcome: "Welcome to the",
      leave_lobby: "Leave Lobby",
      start_game: "Start Game",
      lobby_key_generating: "Lobby Key: Being Generated",
      lobby_key: "Lobby Key: {key}",
      your_position: "Your Position {position}",
      lobby_position:
        "Lobby Positions: P1= {p1} P2= {p2} Spectator {spectators}",
      lobbyPos: "Lobby Pos",
      lobbyStatus: "Lobby Status",
      webSocketConnectionStatus: "WebSocket Connection Status:",
      player1: "Player 1",
      player2: "Player 2",
      spectator: "Spectator",
      timeLine: "Timeline",
      player_vs_player: "Player vs Player",
      player_vs_ai: "Player vs KIM",
      playerai_vs_ai: "Player AI vs KIM",
      playerai_vs_playerai: "Player AI vs Player AI",
      KIM_vs_Player: "KIM vs Player",
      KIM_vs_Player_AI: "KIM vs Player AI",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      surrender: "Surrender",
      quit_game: "Quit Game",
      first: "First",
      previous: "Previous",
      next: "Next",
      last: "Last",
      undo_move: "Undo Move",
      new_game: "New Game",
      game_over: "Game Over",
      nim_move: "Make Move",
      row: "Row",
      amount: "Amount",
      player_1_won: "Player 1 Won",
      player_2_won: "Player 2 Won",
      game_over_after: "Game over after",
      turn: "Turn",
      turns: "Turns",
      okay: "Okay",
      show_rules: "Rules",
      return_to_game: "Return to Game",
      surrender_before_start:
        "You need to first surrender before you can start a new Game or Lobby",
      draw: "Draw!",
      startGame: "Start Game",
      waitMessage: "Waiting until Lobby is created...",
      connection_not_possible: "Connecting to Server wasn't possible",
      copyright: "© 2024 Your Company. All rights reserved.",
      step: "Step",
      unstep: "Undo step",
      evaluate: "Evaluate",
      valid_Moves_Instead: "Valid Moves Instead of Make Move",
      activateTwoTurnGame: "Activate two turn Game",
      undo_this_num_of_terms: "Undo this Number of turns",
      grid_Width: "Grid Width",
      grid_Height: "Grid Height",
      play: "Play",
      received_from_server: "Received From Server",
      command: "Command",
      command_key: "Command Key",
      key_value_pair_input: "Key-Value Pair Input",
      key: "Key",
      value: "Value",
      add_pair: "Add Pair",
      json_output: "JSON Output",
      your_turn: "Your Turn",
      opponent_turn: "Opponents Turn",
      blunder: "Show Blunders",
      you_won: "You Won!",
      opponent_won: "Opponent Won",
      time_remaining: "Time Remaining",
      play_music: "Play Music",
      pause_music: "Pause Music",
      resume_game: "Resume Game",
      pause_game: "Pause Game",
      stop_timer: "Stop Timer",

    },

    rules: {
      connect4: {
        game_title: "Connect4 Rules",
        description:
          "Connect 4 is a two-player game where players take turns dropping their colored disc into a column. The objective is to be the first to get four of your discs in a row, either horizontally, vertically, or diagonally.",

        setup: {
          title: "Setup",
          point1: "The game board consists of 7 columns and 6 rows.",
          point2:
            "Each player chooses a color and receives an unlimited number of discs of that color.",
        },
        gameplay: {
          title: "Gameplay",
          point1: "Players take turns dropping a disc into one of the columns.",
          point2:
            "The disc falls to the lowest available position within the column.",
          point3:
            "The game continues until a player gets four of their discs in a row or the board is full.",
        },
        endgame: {
          title: "Endgame",
          point1:
            "A player wins by getting four discs in a row (horizontally, vertically, or diagonally).",
          point2:
            "The game ends in a draw if the board is full and no player has four discs in a row.",
        },
      },

      tictactoe: {
        game_title: "Tic Tac Toe Rules",
        description:
          "Tic Tac Toe is a two-player game where players take turns marking a space in a 3x3 grid. The objective is to be the first to get three of your marks in a row, either horizontally, vertically, or diagonally.",

        setup: {
          title: "Setup",
          point1: "The game board consists of a 3x3 grid.",
          point2: "Each player chooses a mark, either 'X' or 'O'.",
        },
        gameplay: {
          title: "Gameplay",
          point1: "Players take turns marking a space in the grid.",
          point2:
            "The game continues until a player gets three of their marks in a row or all spaces are filled.",
        },
        endgame: {
          title: "Endgame",
          point1:
            "A player wins by getting three marks in a row (horizontally, vertically, or diagonally).",
          point2:
            "The game ends in a draw if all spaces are filled and no player has three marks in a row.",
        },
      },

      nim: {
        game_title: "Nim Rules",
        description:
          "Nim is a strategy game where players take turns removing stones from distinct heaps. The player who removes the last stone wins.",

        setup: {
          title: "Setup",
          point1: "There are several rows of stones",
          point2: "Two player take turns",
        },

        gameplay: {
          title: "Gameplay",
          point1: "Players take turns removing stones from a single row.",
          point2: "A player must take at least one stone on their turn.",
          point3: "A player may take multiple stones from the same row.",
          point4:
            "Players cannot take stones from more than one row in a single turn.",
        },

        endgame: {
          title: "Endgame",
          point1: "The player who takes the last stone wins.",
        },
      },

      othello: {
        game_title: "Othello Rules",
        description:
          "Othello is played by two players on an 8×8 board with round disks that are black on one side and white on the other. Each player is provided with several disks.",

        setup: {
          title: "Setup",
          point1: "The game is played on an 8×8 board.",
          point2:
            "Each player is given a number of disks with a black and a white side.",
          point3:
            "At the start of the game, four disks are placed in a predetermined position in the center of the board.",
        },
        gameplay: {
          title: "Gameplay",
          point1: "Player 'Black' always moves first.",
          point2:
            "A player must place a disk on an empty square adjacent to an opponent's disk, with at least one opponent's disk between the placed disk and another disk of the player's color.",
          point3:
            "After placing a disk, all opponent's disks in a straight line between the new disk and another disk of the player's color are flipped.",
          point4:
            "Players alternate turns. If a player cannot make a move that flips an opponent's disk, they must pass.",
        },
        endgame: {
          title: "Endgame",
          point1:
            "The game ends when the board is full or neither player can make a valid move.",
          point2:
            "The player with the most disks of their color on the board at the end wins.",
        },
      },

      checkers: {
        game_title: "Checkers Rules",
        description:
          "Checkers, also known as Draughts, is a strategy board game for two players. Each player starts with 12 pieces placed on the dark squares of the three rows closest to them. The objective of the game is to capture all of the opponent's pieces or block them so they cannot move.",

        setup: {
          title: "The Game Board at the Beginning",
          description:
            "The checkerboard is automatically placed so that a dark square is on the bottom left. The player with the white pieces starts.",
        },

        movement: {
          title: "Moving the Pieces",
          description:
            "Pieces move one square diagonally forward to an empty dark square.",
        },

        capturing: {
          title: "Capturing",
          description1:
            "There is a capture obligation. If your own free pieces cannot be clicked during a move, it may be because there is a capture opportunity somewhere on the board. Only one of these pieces can then be selected. Single pieces are only allowed to capture forward. When capturing, the piece must stand directly in front of the opponent's piece and must land directly behind the captured piece. This square must be free.",
          description2:
            "If you have a choice between different capture opportunities, you are free to decide. An exception is multiple captures.",
          description3:
            "Multiple captures mean: If a piece has captured and there is an opportunity to capture again with the same piece, the player continues their turn until multiple captures are no longer possible.",
        },

        queening: {
          title: "Queening",
          description1:
            "You get a queen when one of your pieces reaches the opponent's back row, either by a normal move or by a capture. The piece is marked with a 'Crown' (in the board game, a second piece is placed on top).",
          description2:
            "A queen can move diagonally both forward and backward and can also capture in both directions. Unlike international checkers, the king can only move one square forward or backward.",
        },

        endgame: {
          title: "End of the Game",
          description:
            "You lose if you have no pieces left or if your pieces are blocked and cannot move. You can also concede the game by choosing 'Surrender'.",
        },

        draw: {
          title: "Draw",
          description:
            "Some games end in a draw. This happens when neither player can win unless the other makes a significant mistake. To prevent endless games, there are two ways to declare a draw:",
          point1: "Both players agree to a draw, or",
          point2: "30 moves have been made without a capture.",
        },
      },
    },

    instructions: {
      instruction_title: "Instructions",
      introduction: {
        title: "Introduction",
        description1:
          "This documentation describes the process of using a WebSocket connection in a selected programming language to connect to the URI wss://kimaster.mni.thm.de/ws.",
        description2:
          "Additionally, it explains how to log in to the THM internal network and send messages in JSON format and receive feedback from the server.",
        description3: "A sample connection using Python is also provided.",
      },
      requirements: {
        title: "Requirements",
        network_access:
          "You must be in the THM internal network. This can be done either via the THM VPN or the Eduroam network.",
        websocket_uri_title: "WebSocket URI: ",
        websocket_uri: "wss://kimaster.mni.thm.de/ws",
        browser_url_title: "Browser URL:",
        browser_url: " https://kimaster.mni.thm.de (for browser connections)",
        message_format_title: "Message format: ",
        message_format: "JSON",
        documentation_title: "Documentation: ",
        documentation:
          "Information about the JSON commands can be found in the command.md file.",
      },
      webSocketConnection: {
        title: "WebSocket Connection",
        step1: {
          title: "Step 1: Establish Network Access",
          vpn: "THM VPN:",
          vpn_description:
            " Connect to the THM VPN. You can find instructions on how to set it up on the official THM website.",
          vpn_link: "THM VPN Guide",
          eduroam: "Eduroam Network: ",
          eduroam_description:
            "Alternatively, you can connect to the Eduroam network, if available.",
          eduroam_link: "Eduroam Guide",
        },
        step2: {
          title: "Step 2: Establish WebSocket Connection",
          browser: {
            title: "Connection via Browser",
            open_browser: "1. Open your web browser.",
            enter_url: "2. Enter the URL https://kimaster.mni.thm.de.",
            internal_network: "3. Ensure you are in the THM internal network.",
          },
          connection_with_ProgrammingLanguage: {
            title: "Connection with a Programming Language (Python Example)",
            install_python:
              "1. Install Python: Ensure Python is installed on your computer.",
            install_webSocket:
              "2. Install WebSocket library: Install the WebSocket library for Python using the following command:",
            pip_command: "pip install websocket-client",
            connection_code: "Connection code:",
            example_code: `
          import asyncio
          import json
          from abc import ABC
          import io
          from typing import Coroutine
          from PIL import Image
          from websockets import WebSocketClientProtocol, connect, InvalidURI, ConnectionClosedOK
          
          class KIMaster(ABC):
              def __init__(self, uri_pool: list[str]):
                  """
                  Initialize the KIMaster with a list of URIs.
                  :param uri_pool: List of URIs to connect to.
                  """
                  self.connection: WebSocketClientProtocol | None = None
                  self.uri_pool: list[str] = uri_pool
          
              async def connect(self) -> None:
                  """
                  Try to connect to one of the URIs in the uri_pool.
                  """
                  for uri in self.uri_pool:
                      print(f"Try to connect to URI: '{uri}'")
                      try:
                          self.connection = await connect(uri)
                          print(f"Connected to URI: '{uri}'")
                          break
                      except InvalidURI:
                          print(f"URI: '{uri}' not reachable!")
          
              async def send_cmd(self, command: str, command_key: str, data: dict | None = None) -> None:
                  """
                  Send a command to the connected WebSocket server.
                  :param command: The command to send.
                  :param command_key: The command key associated with the command.
                  :param data: Optional additional data to send with the command.
                  """
                  if self.connection:
                      payload: dict = {"command": command, "command_key": command_key}
                      if data is not None:
                          payload.update(data)
                      await self.connection.send(json.dumps(payload))
          
              async def receive(self) -> dict | str | bytes | None:
                  """
                  Receive a message from the WebSocket server.
                  :return: The received message, either as a dictionary, string, or bytes.
                  """
                  if self.connection:
                      message = None
                      try:
                          message = await self.connection.recv()
                      except ConnectionClosedOK:
                          return
                      try:
                          data = json.loads(message)
                          return data
                      except json.JSONDecodeError:
                          return message
                      except UnicodeDecodeError:
                          return message
          
              async def close(self) -> None:
                  """
                  Close the WebSocket connection.
                  """
                  if self.connection:
                      await self.connection.close()
          
              def run(self, target: Coroutine) -> None:
                  """
                  Run the given coroutine until it completes.
                  :param target: The coroutine to run.
                  """
                  asyncio.run(target)
          
              async def handler(self, send_handler, receive_handler) -> None:
                  """
                  Handle both sending and receiving of WebSocket messages.
                  :param send_handler: The coroutine handling sending messages.
                  :param receive_handler: The coroutine handling receiving messages.
                  """
                  send_task = asyncio.create_task(send_handler())
                  receive_task = asyncio.create_task(receive_handler())
                  await asyncio.gather(send_task, receive_task)
          
              def print_(self, message: dict) -> None:
                  """
                  Print a formatted message to the console.
                  :param message: The message to print.
                  """
                  print("\\n")
                  for k, v in message.items():
                      print(f" -- {k}: {v}")
          
              def show(self, message: bytes) -> None:
                  """
                  Display an image from a byte stream.
                  :param message: The image data as bytes.
                  """
                  image_stream = io.BytesIO(message)
                  image = Image.open(image_stream)
                  image.show()
          `,
          },
        },
        step3: {
          title: "Step 3: Send JSON Messages",
          json_format: "1. Format JSON message: ",
          json_format_description: "All messages must be sent in JSON format.",
          example_message: "2. Example message:",
          example_code: `
            {
              "command": "start_game",
              "parameters": {}
            }
          `,
          send_message: "3. Send message:",
          send_message_description:
            "Use the WebSocket library of your chosen programming language to send messages.",
        },
        step4: {
          title: "Step 4: Receive Feedback",
          json_feedback: "1. JSON feedback: ",
          feedback: "The server sends feedback in JSON format.",
          bytestream: "2. Receive bytestreams: ",
          bytestream_receive:
            "If the feedback is a bytestream representing a PNG, save it accordingly.",
        },
      },
    },
    footer: {
      datenschutz: "Privacy Policy",
      impressum: "Imprint",
    },
  },

  ////////////////////////////////////////////////////German/////////////////////////////////////////////////////////////////////////////////////////
  de: {
    message: {
      home: "Startseite",
      instruction: "Anleitung",
      leaderboard: "Rangliste",
      achievements: "Erfolge",
      welcome: "Willkommen zu KIMaster",
      subtitle: "Hier kannst du deine Spiele-KI testen",
      enter_lobby_key: "Lobby-Schlüssel eingeben",
      join_lobby: "Lobby beitreten",
      joinAs: "Beitreten als",
      lobby_join_failed: "Lobbybeitritt fehlgeschlagen!",
      lobby_swap_failed: "Position besetzt!",
      game_start_failed: "Falsche Spieleranzahl!",
      createLobby: "Lobby erstellen",
      create: "erstellen",
      chess: "Schach",
      connect4: "Vier Gewinnt",
      tictactoe: "Tic Tac Toe",
      othello: "Othello",
      nim: "Nim",
      checkers: "Dame",
      lobby: "Lobby",
      lobby_welcome: "Willkommen zur {game}",
      leave_lobby: "Lobby verlassen",
      start_game: "Spiel starten",
      lobby_key_generating: "Lobby-Schlüssel: Wird generiert",
      lobby_key: "Lobby-Schlüssel: {key}",
      your_position: "Ihre Position {position}",
      lobby_position:
        "Lobby Positionen: P1= {p1} P2= {p2} Zuschauer {spectators}",
      lobbyPos: "Lobby Pos",
      lobbyStatus: "Lobby Status",
      webSocketConnectionStatus: "WebSocketverbindung Status:",
      player1: "Spieler 1",
      player2: "Spieler 2",
      spectator: "Zuschauer",
      timeLine: "Zeitleiste",
      player_vs_player: "Spieler gegen Spieler",
      player_vs_ai: "Spieler gegen KIM",
      playerai_vs_ai: "Spieler-KI gegen KIM",
      playerai_vs_playerai: "Spieler-KI gegen Spieler-KI",
      KIM_vs_Player: "KIM gegen Spieler",
      KIM_vs_Player_AI: "KIM gegen Spieler KI",
      easy: "Einfach",
      medium: "Mittel",
      hard: "Schwer",
      surrender: "Aufgeben",
      quit_game: "Spiel verlassen",
      first: "Erstes",
      previous: "Vorherig",
      next: "Nächstes",
      last: "Letztes",
      undo_move: "Zug zurück",
      new_game: "Neues Spiel",
      game_over: "Spiel vorbei",
      nim_move: "Zug ausführen",
      row: "Reihe",
      amount: "Anzahl",
      player_1_won: "Spieler 1 hat gewonnen",
      player_2_won: "Spieler 2 hat gewonnen",
      game_over_after: "Spiel vorbei nach",
      turn: "Zug",
      turns: "Zügen",
      okay: "Okay",
      show_rules: "Regeln",
      return_to_game: "Zurück zum Spiel",
      surrender_before_start:
        "Sie müssen erst aufgeben, bevor Sie ein neues Spiel oder eine neue Lobby beginnen können",
      draw: "Unentschieden!",
      startGame: "Spiel Starten",
      waitMessage: "Warten, bis die Lobby erstellt ist...",
      connection_not_possible: "Die Verbindung zum Server war nicht möglich",
      copyright: "© 2024 Dein Unternehmen. Alle Rechte vorbehalten.",
      step: "Schritt",
      unstep: "Schritt rückgängig machen",
      evaluate: "bewerten",
      valid_Moves_Instead: "Gültige Züge anstelle von Zug machen",
      activateTwoTurnGame: "Aktivieren Sie zwei Runden Spiel",
      undo_this_num_of_terms: "Die Anzahl der Umdrehungen rückgängig machen",
      grid_Width: "Breite des Rasters",
      grid_Height: "Rasterhöhe",
      play: "Spielen",
      received_from_server: "Empfangen vom Server",
      command: "Befehl",
      command_key: "Befehlstaste",
      key_value_pair_input: "Schlüssel-Werte-Paar Eingabe",
      key: "Schlüssel",
      value: "Wert",
      add_pair: "Paar hinzufügen",
      json_output: "JSON-Ausgabe",
      your_turn: "Dein Zug",
      opponent_turn: "Gegner am Zug",
      blunder: "Fehler anzeigen",
      you_won: "Du hast gewonnen!",
      opponent_won: "Gegner hat gewonnen",
      time_remaining: "Verbleibende Zeit",
      play_music: "Musik abspielen",
      pause_music: "Musik pausieren",
      resume_game: "Spiel fortsetzen",
      pause_game: "Spiel pausieren",
      stop_timer: "Timer stoppen",
    },
    /////////////////////////////////////////Spielregeln///////////////////////////////////////////////////////////////////////////////////////
    rules: {
      connect4: {
        game_title: "Vier Gewinnt Regeln",
        description:
          " Vier Gewinnt ist ein Zwei-Personen-Spiel, bei dem die Spieler abwechselnd einen Stein ihrer Farbe in eine der sieben Spalten des Gitters fallen lassen. Das Ziel ist es, als Erster vier Steine in einer Reihe zu haben, sei es horizontal, vertikal oder diagonal.",

        setup: {
          title: "Spielvorbereitung",
          point1: "Das Spielbrett besteht aus 7 Spalten und 6 Reihen",
          point2:
            "Jeder Spieler wählt eine Farbe und erhält eine unbegrenzte Anzahl an Steinen in dieser Farbe.",
        },
        gameplay: {
          title: "Spielablauf",
          point1:
            "Die Spieler lassen abwechselnd einen Stein in eine der Spalten fallen.",
          point2:
            "Der Stein fällt in die tiefste verfügbare Position in der Spalte.",
          point3:
            "Das Spiel geht weiter, bis ein Spieler vier seiner Steine in einer Reihe hat oder das Spielfeld voll ist.",
        },
        endgame: {
          title: "Spielende",
          point1:
            "Ein Spieler gewinnt, wenn er vier Steine in einer Reihe hat (horizontal, vertikal oder diagonal).",
          point2:
            "Das Spiel endet unentschieden, wenn das Spielfeld voll ist und kein Spieler vier Steine in einer Reihe hat.",
        },
      },

      tictactoe: {
        game_title: "Tic Tac Toe Regeln",
        description:
          "Tic Tac Toe ist ein Zwei-Personen-Spiel, bei dem die Spieler abwechselnd ein Feld in einem 3x3 Raster markieren. Das Ziel ist es, als Erster drei seiner Zeichen in einer Reihe zu haben, sei es horizontal, vertikal oder diagonal.",

        setup: {
          title: "Spielvorbereitung",
          point1: "Das Spielfeld besteht aus einem 3x3 Raster.",
          point2: 'Jeder Spieler wählt ein Zeichen, entweder "X" oder "O".',
        },

        gameplay: {
          title: "Spielablauf",
          point1: "Die Spieler markieren abwechselnd ein Feld im Raster.",
          point2:
            "Das Spiel geht weiter, bis ein Spieler drei seiner Zeichen in einer Reihe hat oder alle Felder belegt sind.",
        },

        endgame: {
          title: "Spielende",
          point1:
            "Ein Spieler gewinnt, wenn er drei Zeichen in einer Reihe hat (horizontal, vertikal oder diagonal).",
          point2:
            "Das Spiel endet unentschieden, wenn alle Felder belegt sind und kein Spieler drei Zeichen in einer Reihe hat.",
        },
      },

      nim: {
        game_title: "Nim Regeln",
        description:
          "Nim ist ein Strategiespiel, bei dem die Spieler abwechselnd Steine aus verschiedenen Reihen nehmen. Der Spieler, der den letzten Stein nimmt, gewinnt.",

        setup: {
          title: "Spielvorbereitung",
          point1: "Es gibt mehrere Reihen von Steinen.",
          point2: "Zwei Spieler sind an der Reihe.",
        },

        gameplay: {
          title: "Spielablauf",
          point1:
            "Die Spieler nehmen abwechselnd Steine aus einer einzigen Reihe.",
          point2:
            "Ein Spieler muss mindestens einen Stein in seinem Zug nehmen.",
          point3: "Ein Spieler kann mehrere Steine aus derselben Reihe nehmen.",
          point4:
            "Die Spieler können nicht Steine aus mehr als einer Reihe in einem Zug nehmen.",
        },

        endgame: {
          title: "Spielende",
          point1: "Der Spieler, der den letzten Stein nimmt, gewinnt.",
        },
      },

      othello: {
        game_title: "Othello Regeln",
        description:
          "Othello wird von zwei Spielern auf einem 8×8-Brett mit runden Steinen gespielt, die eine schwarze und eine weiße Seite haben. Jeder Spieler erhält mehrere Steine.",

        setup: {
          title: "Aufbau",
          point1: "Das Spiel wird auf einem 8×8-Brett gespielt.",
          point2:
            "Jeder Spieler erhält mehrere Steine mit einer schwarzen und einer weißen Seite.",
          point3:
            "Zu Beginn des Spiels werden vier Steine in einer vorgegebenen Position in der Mitte des Brettes platziert.",
        },
        gameplay: {
          title: "Spielablauf",
          point1: "Spieler 'Schwarz' macht immer den ersten Zug.",
          point2:
            "Ein Spieler muss einen Stein auf ein leeres Feld legen, das an ein Feld mit gegnerischen Steinen angrenzt, wobei mindestens ein gegnerischer Stein zwischen dem neuen und einem anderen Stein derselben Farbe liegen muss.",
          point3:
            "Nach dem Platzieren eines Steins werden alle gegnerischen Steine in einer geraden Linie zwischen dem neuen Stein und einem anderen Stein derselben Farbe umgedreht.",
          point4:
            "Die Spieler wechseln sich ab. Wenn ein Spieler keinen gültigen Zug machen kann, muss er passen.",
        },
        endgame: {
          title: "Spielende",
          point1:
            "Das Spiel endet, wenn das Brett voll ist oder beide Spieler keinen gültigen Zug mehr machen können.",
          point2:
            "Der Spieler mit den meisten Steinen seiner Farbe auf dem Brett am Ende gewinnt.",
        },
      },

      checkers: {
        game_title: "Dame Regeln",
        description:
          "Dame ist ein strategisches Brettspiel für zwei Spieler. Jeder Spieler beginnt mit 12 Steinen, die auf den dunklen Feldern der drei ihm nächstgelegenen Reihen platziert werden. Ziel des Spiels ist es, alle gegnerischen Steine zu schlagen oder zu blockieren, sodass sie nicht mehr ziehen können.",

        setup: {
          title: "Das Spielbrett zu Beginn",
          description:
            "Das Damebrett wird automatisch so platziert, dass links unten ein dunkles Feld liegt. Der Startspieler beginnt mit den weißen Steinen.",
        },

        movement: {
          title: "Das Ziehen der Steine",
          description:
            "Die Steine ziehen ein Feld in diagonaler Richtung, aber nur vorwärts und nur auf freie dunkle Felder.",
        },

        capturing: {
          title: "Schlagen",

          description1:
            "Es gilt Schlagzwang. Wenn sich eigene freie Steine bei einem Zug nicht anklicken lassen, kann das daran liegen, dass irgendwo auf dem Brett die Möglichkeit zum Schlagen besteht. Nur einer dieser Steine kann dann ausgewählt werden. Einfache Steine dürfen nur vorwärts schlagen. Beim Schlagen muss der Stein direkt vor dem gegnerischen Stein stehen und muss nach dem Schlagen direkt hinter dem geschlagenen Stein landen. Dieses Feld muss frei sein.",
          description2:
            "Wenn man die Auswahl zwischen verschiedenen Schlagmöglichkeiten hat, darf man frei entscheiden. Ausnahme bildet Mehrfachschlagen.",
          description3:
            "Mehrfachschlagen bedeutet: Wenn geschlagen wurde und danach die Möglichkeit besteht, noch einmal zu schlagen mit demselben Stein, so bleibt der Spieler am Zug, bis Mehrfachschlagen nicht länger möglich ist.",
        },

        queening: {
          title: "In Dame umwandeln",
          description1:
            "Man bekommt eine Dame, wenn einer der eigenen Steine auf der gegnerischen Grundlinie stehen bleibt, egal ob durch einen normalen Zug oder durch ein Schlagen. Der Stein wird dann durch eine 'Krone' gekennzeichnet (im Brettspiel wird ein zweiter Stein darauf gestellt).",
          description2:
            "Eine Dame kann nun sowohl schräg vorwärts als auch rückwärts bewegt werden und genauso darf man mit ihr auch schlagen. Im Gegensatz zur internationalen Damenvariante darf sich die Dame aber nur um ein Feld vorwärts oder rückwärts bewegen.",
        },

        endgame: {
          title: "Spielende",
          description:
            "Man hat verloren, wenn man keinen Stein mehr hat oder wenn man mit seinen Steinen keinen Zug mehr machen kann, weil die eigenen Steine durch den Gegner blockiert sind. Man kann auch die Partie verloren geben durch die Aktion 'Aufgeben', zum Beispiel weil man so weit zurück liegt, dass ein weiteres Spielen keinen Sinn mehr macht.",
        },

        draw: {
          title: "Unentschieden",
          description:
            "Manche Partien gehen unentschieden aus. In so einem Fall kann keiner der beiden Spieler mehr gewinnen, es sei denn, der andere macht einen enormen Fehler. Um endlose Partien zu vermeiden, gibt es zwei Möglichkeiten für ein Unentschieden:",
          point1: "Beide Spieler sind sich darin einig geworden, oder",
          point2:
            "30 Züge wurden gezogen, in denen kein Stein geschlagen wurde.",
        },
      },
    },
    ///////////////////////////////////////////////////////////////Anleitung/////////////////////////////////////////////////////////////////////////////////////////////////////
    instructions: {
      instruction_title: "Anmeldungsdokumentation",

      introduction: {
        title: "Einleitung",
        description1:
          "Diese Dokumentation beschreibt den Prozess zur Nutzung einer WebSocket-Verbindung in einer ausgewählten Programmiersprache, um eine Verbindung zu der URI wss://kimaster.mni.thm.de/ws herzustellen. ",
        description2:
          "Zusätzlich wird beschrieben, wie man sich im THM internen Netzwerk anmeldet und Nachrichten im JSON-Format sendet sowie Rückmeldungen vom Server empfängt.",
        description3:
          " Es wird auch eine Beispielsverbindung mit Python vorgestellt.",
      },

      requirements: {
        title: "Voraussetzungen",
        network_access:
          "Sie müssen sich im THM internen Netzwerk befinden. Dies kann entweder über das THM VPN oder das Eduroam Netzwerk erfolgen.",
        websocket_uri_title: "WebSocket-URI:",
        websocket_uri: " wss://kimaster.mni.thm.de/ws",
        browser_url_title: "Browser-URL:",
        browser_url:
          " https://kimaster.mni.thm.de (für Verbindungen über den Browser)",
        message_format_title: "Nachrichtenformat: ",
        message_format: "JSON",
        documentation_title: "Dokumentation:",
        documentation:
          "Informationen zu den JSON-Kommandos finden Sie in der Datei command.md",
      },

      webSocketConnection: {
        title: "Verbindung mit Websocket",
        step1: {
          title: "Schritt 1: Netzwerkzugang herstellen",
          vpn: "THM VPN:",
          vpn_description:
            " Verbinden Sie sich mit dem THM VPN. Anweisungen zur Einrichtung finden Sie auf der offiziellen THM-Website.",
          vpn_link: "THM VPN Anleitung",
          eduroam: "Eduroam Netzwerk: ",
          eduroam_description:
            "Alternativ können Sie sich mit dem Eduroam Netzwerk verbinden, falls verfügbar.",
          eduroam_link: "Eduroam Anleitung",
        },
        step2: {
          title: "Schritt 2: WebSocket-Verbindung herstellen",
          browser: {
            title: " Verbindung über Browser",
            open_browser: "1. Öffnen Sie Ihren Webbrowser.",
            enter_url: "2. Geben Sie die URL https://kimaster.mni.thm.de ein.",
            internal_network:
              "3. Stellen Sie sicher, dass Sie sich im THM internen Netzwerk befinden.",
          },
          connection_with_ProgrammingLanguage: {
            title:
              "Verbindung mit einer Programmiersprache (Beispiel in Python)",
            install_python:
              "1. Python installieren: Stellen Sie sicher, dass Python auf Ihrem Computer installiert ist.",
            install_webSocket:
              "2. WebSocket-Bibliothek installieren: Installieren Sie die WebSocket-Bibliothek für Python mit folgendem Befehl:",
            pip_command: "pip install websocket-client",
            connection_code: "Connection Code Beispiel:",
            sending_code: "Sending Code Beispiel",

            example_code: `
          
            import asyncio
            import json
            from abc import ABC
            import io
            from typing import Coroutine
            from PIL import Image
            from websockets import WebSocketClientProtocol, connect, InvalidURI, ConnectionClosedOK
            
            class KIMaster(ABC):
                def __init__(self, uri_pool: list[str]):
                    """
                    Initialize the KIMaster with a list of URIs.
                    :param uri_pool: List of URIs to connect to.
                    """
                    self.connection: WebSocketClientProtocol | None = None
                    self.uri_pool: list[str] = uri_pool
            
                async def connect(self) -> None:
                    """
                    Try to connect to one of the URIs in the uri_pool.
                    """
                    for uri in self.uri_pool:
                        print(f"Try to connect to URI: '{uri}'")
                        try:
                            self.connection = await connect(uri)
                            print(f"Connected to URI: '{uri}'")
                            break
                        except InvalidURI:
                            print(f"URI: '{uri}' not reachable!")
            
                async def send_cmd(self, command: str, command_key: str, data: dict | None = None) -> None:
                    """
                    Send a command to the connected WebSocket server.
                    :param command: The command to send.
                    :param command_key: The command key associated with the command.
                    :param data: Optional additional data to send with the command.
                    """
                    if self.connection:
                        payload: dict = {"command": command, "command_key": command_key}
                        if data is not None:
                            payload.update(data)
                        await self.connection.send(json.dumps(payload))
            
                async def receive(self) -> dict | str | bytes | None:
                    """
                    Receive a message from the WebSocket server.
                    :return: The received message, either as a dictionary, string, or bytes.
                    """
                    if self.connection:
                        message = None
                        try:
                            message = await self.connection.recv()
                        except ConnectionClosedOK:
                            return
                        try:
                            data = json.loads(message)
                            return data
                        except json.JSONDecodeError:
                            return message
                        except UnicodeDecodeError:
                            return message
            
                async def close(self) -> None:
                    """
                    Close the WebSocket connection.
                    """
                    if self.connection:
                        await self.connection.close()
            
                def run(self, target: Coroutine) -> None:
                    """
                    Run the given coroutine until it completes.
                    :param target: The coroutine to run.
                    """
                    asyncio.run(target)
            
                async def handler(self, send_handler, receive_handler) -> None:
                    """
                    Handle both sending and receiving of WebSocket messages.
                    :param send_handler: The coroutine handling sending messages.
                    :param receive_handler: The coroutine handling receiving messages.
                    """
                    send_task = asyncio.create_task(send_handler())
                    receive_task = asyncio.create_task(receive_handler())
                    await asyncio.gather(send_task, receive_task)
            
                def print_message(self, message: dict) -> None:
                    """
                    Print a formatted message to the console.
                    :param message: The message to print.
                    """
                    print("\\n")
                    for k, v in message.items():
                        print(f" -- {k}: {v}")
            
                def show(self, message: bytes) -> None:
                    """
                    Display an image from a byte stream.
                    :param message: The image data as bytes.
                    """
                    image_stream = io.BytesIO(message)
                    image = Image.open(image_stream)
                    image.show()
            
                    `,
          },
        },
        step3: {
          title: "Schritt 3: JSON-Nachrichten senden",
          json_format: "1. JSON-Nachricht formatieren: ",
          json_format_descripton:
            "Alle Nachrichten müssen im JSON-Format gesendet werden.",
          example_message: "2. Beispielnachricht:",
          example_code: {
            command: "start_game",
            parameters: {},
          },

          send_message: "3. Nachricht senden:",
          send_message_description:
            "Nutzen Sie die WebSocket-Bibliothek Ihrer gewählten Programmiersprache, um Nachrichten zu senden.",
        },

        step4: {
          title: "Schritt 4: Rückmeldung empfangen",
          json_feedback: " 1. JSON-Rückmeldungen:",
          feedback: "Der Server sendet Rückmeldungen im JSON-Format zurück.",
          bytestream: "2. Bytestreams empfangen:",
          bytestream_receive:
            "Falls die Rückmeldung ein Bytestream ist, der ein PNG darstellt, speichern Sie diesen entsprechend ab.",
        },
      },
    },
    footer: {
      datenschutz: "Datenschutz",
      impressum: "Impressum",
    },
  },
  ////////////////////////////////////////////////////////////////Französisch///////////////////////////////////////////////////////////////////////////////////
  fr: {
    message: {
      home: "Accueil",
      instruction: "Instruction",
      leaderboard: "Classement",
      achievements: "Réalisations",
      welcome: "Bienvenue chez KIMaster",
      subtitle: "Ici, vous pouvez tester votre IA de jeu",
      enter_lobby_key: "Entrez la clé de la salle",
      join_lobby: "Rejoindre la salle",
      lobby_join_failed: "Échec de la connexion à la salle!",
      lobby_swap_failed: "Position occupée!",
      game_start_failed: "Nombre de joueurs incorrect!",
      createLobby: "créer un hall d'entrée",
      create: "créer",
      joinAs: "Adhérer en tant que",
      chess: "Échecs",
      connect4: "Puissance 4",
      tictactoe: "Morpion",
      othello: "Othello",
      nim: "Nim",
      checkers: "Dame",
      leave_lobby: "Quitter la salle",
      start_game: "Commencer le jeu!",
      lobby_key_generating: "Clé de salle: Génération en cours",
      lobby_key: "Clé de salle: {key}",
      your_position: "Votre position {position}",
      lobby_position:
        "Positions du lobby: P1= {p1} P2= {p2} Spectateurs {spectators}",
      lobbyPos: "Lobby Pos",
      lobbyStatus: "Statut du lobby",
      webSocketConnectionStatus: "État de la connexion WebSocket:",
      player1: "Joueur 1",
      player2: "Joueur 2",
      spectator: "Spectateur",
      timeLine: "Ligne temporelle",
      player_vs_player: "Joueur contre Joueur",
      player_vs_ai: "Joueur contre KIM",
      playerai_vs_ai: "IA Joueur contre KIM",
      playerai_vs_playerai: "IA Joueur contre IA Joueur",
      KIM_vs_Player: "KIM contre les joueurs",
      KIM_vs_Player_AI: "KIM contre joueur IA",
      easy: "Facile",
      medium: "Moyen",
      hard: "Difficile",
      lobby: "Lobby",
      lobby_welcome: "Bienvenue dans la salle de {game}",
      surrender: "Abandonner",
      quit_game: "Quitter le jeu",
      first: "Premier",
      previous: "Précédent",
      next: "Suivant",
      last: "Dernier",
      undo_move: "Annuler le coup",
      new_game: "Nouveau jeu",
      game_over: "Fin du jeu",
      nim_move: "Faire move",
      row: "Rangée",
      amount: "Quantité",
      player_1_won: "Le joueur 1 a gagné",
      player_2_won: "Le joueur 2 a gagné",
      game_over_after: "Fin du jeu après",
      turn: "Tour",
      turns: "Tours",
      okay: "D'accord",
      show_rules: "Réglementer",
      return_to_game: "Retour au jeu",
      surrender_before_start:
        "Vous devez abandonner avant de pouvoir commencer une nouvelle partie ou un nouveau lobby.",
      draw: "Match nul!",
      startGame: "Démarrer le jeu",
      waitMessage: "Attendre que le lobby soit créé...",
      connection_not_possible: "La connexion au serveur n'était pas possible",
      copyright: "© 2024 Votre entreprise. Tous droits réservés.",
      step: "étape",
      unstep: "annuler l'étape",
      evaluate: "évaluer",
      valid_Moves_Instead:
        "Des mouvements valables au lieu de faire un mouvement",
      activateTwoTurnGame: "Activer deux tours de jeu",
      undo_this_num_of_terms: "Annuler le nombre de rotations",
      grid_Width: "Largeur de la grille",
      grid_Height: "Hauteur de la grille",
      play: "Jouer",
      received_from_server: "Reçu du serveur",
      command: "Commandement",
      command_key: "Touche de commande",
      key_value_pair_input: "Entrée d'une paire clé-valeur",
      key: "Clé",
      value: "Valeur",
      add_pair: "Ajouter une paire",
      json_output: "Sortie JSON",
      your_turn: "Ton tour",
      opponent_turn: "Au tour de l'adversaire",
      blunder: "Montre Erreurs",
      you_won: "Vous avez gagné!",
      opponent_won: "L'adversaire a gagné",
      time_remaining: "Temps Restant",
      play_music: "Jouer de la musique",
      pause_music: "Mettre la musique en pause",
      resume_game: "Reprendre la Partie",
      pause_game: "Mettre en Pause",
      stop_timer: "Arrêter le minuteur",
    },
    /////////////////////////////////////////////////////////////Spielregeln//////////////////////////////////////////////////////////////////////////////////////////////
    rules: {
      connect4: {
        game_title: 'Règles du jeu "Quatre gagnants',
        description:
          " Quatre gagnants est un jeu pour deux personnes dans lequel les joueurs font tomber à tour de rôle un pion de leur couleur dans l'une des sept colonnes de la grille. Le but est d'être le premier à aligner quatre pions, que ce soit horizontalement, verticalement ou en diagonale.",

        setup: {
          title: "Préparation du jeu",
          point1: "Le plateau de jeu se compose de 7 colonnes et 6 rangées",
          point2:
            "Chaque joueur choisit une couleur et reçoit un nombre illimité de pions de cette couleur.",
        },

        gameplay: {
          title: "Déroulement du jeu",
          point1: "Les joueurs marquent à tour de rôle une case de la grille.",
          point2:
            "La pierre tombe dans la position la plus basse disponible dans la colonne.",
          point3:
            "Le jeu se poursuit jusqu'à ce qu'un joueur ait aligné quatre de ses pions ou que le plateau de jeu soit plein.",
        },
        endgame: {
          title: "Fin du jeu",
          point1:
            "Un joueur gagne s'il a trois signes dans une rangée (horizontale, verticale ou diagonale).",
          point2:
            "Le jeu se termine par un match nul lorsque toutes les cases sont occupées et qu'aucun joueur n'a trois signes dans une rangée.",
        },
      },

      tictactoe: {
        game_title: "Règles du Tic Tac Toe",
        description:
          "Tic Tac Toe est un jeu à deux personnes dans lequel les joueurs marquent à tour de rôle une case dans une grille 3x3. Le but est d'être le premier à aligner trois de ses signes, que ce soit horizontalement, verticalement ou en diagonale.",

        setup: {
          title: "Préparation du jeu",
          point1: "Le terrain de jeu se compose d'une grille de 3x3.",
          point2: "Chaque joueur choisit un signe, soit 'X', soit 'O'.",
        },

        gameplay: {
          title: "Déroulement du jeu",
          point1: '"Les joueurs marquent à tour de rôle une case de la grille.',
          point2:
            "Le jeu se poursuit jusqu'à ce qu'un joueur ait aligné trois de ses signes ou que toutes les cases soient occupées.",
        },
        endgame: {
          title: "Fin du jeu",
          point1:
            "Un joueur gagne s'il a trois signes dans une rangée (horizontale, verticale ou diagonale).",
          point2:
            "Le jeu se termine par un match nul lorsque toutes les cases sont occupées et qu'aucun joueur n'a trois signes dans une rangée.",
        },
      },

      nim: {
        game_title: "Règles de Nim",
        description:
          "Nim est un jeu de stratégie où les joueurs prennent tour à tour des pierres dans des tas distincts. Le joueur qui enlève la dernière pierre gagne ou perd, selon la règle convenue.",
        setup: {
          title: "Préparation",
          point1: "Il y a plusieurs rangées de pierres.",
          point2: "Deux joueurs jouent à tour de rôle.",
        },
        gameplay: {
          title: "Déroulement du jeu",
          point1:
            "Les joueurs prennent à tour de rôle des pierres d'une seule rangée.",
          point2: "Un joueur doit prendre au moins une pierre à son tour.",
          point3: "Un joueur peut prendre plusieurs pierres de la même rangée.",
          point4:
            "Les joueurs ne peuvent pas prendre des pierres de plus d'une rangée en un seul tour.",
        },
        endgame: {
          title: "Fin de la partie",
          point1: "Le joueur qui prend la dernière pierre gagne.",
        },
      },

      othello: {
        game_title: "Règles de Othello",
        description:
          "Othello se joue à deux joueurs sur un plateau de 8×8 avec des disques ronds qui sont noirs d'un côté et blancs de l'autre. Chaque joueur dispose de plusieurs disques.",

        setup: {
          title: "Mise en place",
          point1: "Le jeu se joue sur un plateau de 8×8.",
          point2:
            "Chaque joueur reçoit un certain nombre de disques avec un côté noir et un côté blanc.",
          point3:
            "Au début du jeu, quatre disques sont placés dans une position prédéterminée au centre du plateau.",
        },

        gameplay: {
          title: "Déroulement du jeu",
          point1: "Le joueur noir commence toujours.",
          point2:
            "Un joueur doit placer un disque sur une case vide adjacente à un disque de l'adversaire, avec au moins un disque de l'adversaire entre le disque placé et un autre disque de la couleur du joueur.",
          point3:
            "Après avoir placé un disque, tous les disques de l'adversaire en ligne droite entre le nouveau disque et un autre disque de la couleur du joueur sont retournés.",
          point4:
            "Les joueurs jouent à tour de rôle. Si un joueur ne peut pas faire de mouvement retournant un disque de l'adversaire, il doit passer son tour.",
        },

        endgame: {
          title: "Fin de partie",
          point1:
            "Le jeu se termine lorsque le plateau est plein ou qu'aucun joueur ne peut faire de mouvement valide.",
          point2:
            "Le joueur ayant le plus de disques de sa couleur sur le plateau à la fin gagne.",
        },
      },

      checkers: {
        game_title: "Règles de dame",
        description:
          "Le jeu de dames est un jeu de société stratégique pour deux joueurs. Chaque joueur commence avec 12 pions, qui sont placés sur les cases sombres des trois rangées les plus proches de lui. Le but du jeu est de capturer ou de bloquer tous les pions de l'adversaire afin qu'ils ne puissent plus se déplacer.",

        setup: {
          title: "Le plateau de jeu au début",
          description:
            "Le plateau de dames est automatiquement placé de manière à ce qu'il y ait une case sombre en bas à gauche. Le premier joueur commence avec les pions blancs.",
        },

        movement: {
          title: "Le tirage des pierres",
          description:
            "Les pions se déplacent d'une case dans le sens de la diagonale, mais uniquement vers l'avant et uniquement sur des cases sombres libres.",
        },

        capturing: {
          title: "Frapper",
          description1:
            "Il y a une obligation de capture. Si vos propres pièces libres ne peuvent pas être cliquées pendant un coup, cela peut être dû au fait qu'il y a une possibilité de capture quelque part sur le plateau. Seule une de ces pièces peut alors être sélectionnée. Les simples pièces ne sont autorisées à capturer que vers l'avant. Lors de la capture, la pièce doit se trouver directement devant la pièce adverse et doit atterrir directement derrière la pièce capturée. Cette case doit être libre.",
          description2:
            "Si vous avez le choix entre différentes possibilités de capture, vous êtes libre de décider. Une exception est la capture multiple.",
          description3:
            "La capture multiple signifie: Si une pièce a capturé et qu'il est possible de capturer à nouveau avec la même pièce, le joueur continue son tour jusqu'à ce que les captures multiples ne soient plus possibles.",
        },

        queening: {
          title: "Convertir en dame",
          description1:
            "On obtient une dame lorsqu'un de ses pions s'arrête sur la ligne de base de l'adversaire, que ce soit par un coup normal ou par une prise. Le pion est alors marqué par une 'couronne' (dans le jeu de plateau, on place un deuxième pion dessus).",
          description2:
            "Une dame peut être déplacée en oblique vers l'avant ou vers l'arrière et il est également possible de frapper avec elle. Contrairement à la variante internationale de la dame, la dame ne peut se déplacer que d'une case en avant ou en arrière.",
        },

        endgame: {
          title: "Fin du jeu",
          description:
            "On a perdu quand on n'a plus de pion ou quand on ne peut plus faire de mouvement avec ses pions parce que ses pions sont bloqués par l'adversaire. On peut aussi perdre la partie par l'action 'abandonner', par exemple parce que l'on est tellement en retard que continuer à jouer n'a plus de sens.",
        },

        draw: {
          title: "Match nul",
          description:
            "Certaines parties se terminent par un match nul. Dans ce cas, aucun des deux joueurs ne peut plus gagner, à moins que l'autre ne fasse une énorme erreur. Pour éviter les parties interminables, il existe deux possibilités de match nul :",
          point1: "Les deux joueurs se sont mis d'accord sur ce point, ou",
          point2:
            "30 coups ont été tirés, au cours desquels aucun pion n'a été capturé.",
        },
      },
    },

    //////////////////////////////////////////////////////////////////Anleitung//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    instructions: {
      instruction_title: "Documentation d'inscription",

      introduction: {
        title: "Introduction",
        description1:
          "Cette documentation décrit le processus d'utilisation d'une connexion WebSocket dans un langage de programmation sélectionné afin d'établir une connexion à l'URI wss://kimaster.mni.thm.de/ws. ",
        description2:
          "En outre, il décrit comment se connecter au réseau interne THM et envoyer des messages au format JSON et recevoir des retours du serveur.",
        description3:
          " Un exemple de connexion avec Python est également présenté.",
      },
      requirements: {
        title: "Conditions préalables",
        network_access:
          "Vous devez vous trouver dans le réseau interne du THM. Cela peut se faire soit via le VPN THM, soit via le réseau Eduroam.",
        websocket_uri: "WebSocket-URI: wss://kimaster.mni.thm.de/ws",
        browser_url:
          "Browser-URL: https://kimaster.mni.thm.de (pour les connexions via le navigateur)",
        message_format: "Format du message: JSON",
        documentation:
          "Documentation : Vous trouverez des informations sur les commandes JSON dans le fichier command.md.",
      },
      webSocketConnection: {
        title: "Verbindung mit Websocket",
        step1: {
          title: "Étape 1 : Créer un accès réseau",
          vpn: "THM VPN:",
          vpn_description:
            " Connectez-vous au VPN THM. Vous trouverez les instructions de configuration sur le site officiel de la THM.",
          vpn_link: "THM VPN Instructions",
          eduroam: "Réseau Eduroam: ",
          eduroam_description:
            "Alternativement, vous pouvez vous connecter au réseau Eduroam, si disponible.",
          eduroam_link: "Instructions Eduroam",
        },
        step2: {
          title: "Étape 2 : établir une connexion WebSocket",
          browser: {
            title: " Connexion par navigateur",
            open_browser: "1. ouvrez votre navigateur web",
            enter_url: "2. Saisissez l'URL https://kimaster.mni.thm.de.",
            internal_network:
              "3. Assurez-vous que vous vous trouvez dans le réseau interne THM.",
          },

          connection_with_ProgrammingLanguage: {
            title: "Lien avec un langage de programmation (exemple en Python)",
            install_python:
              "1. Installer Python : Assurez-vous que Python est installé sur votre ordinateur.",
            install_webSocket:
              "2. installer la bibliothèque WebSocket : Installez la bibliothèque WebSocket pour Python avec la commande suivante :",
            pip_command: "3. pip install websocket-client",
            connection_code: "Connection code:",
          },
        },
        step3: {
          title: "Étape 3 : Envoyer des messages JSON",
          json_format: "1. Formater un message JSON : ",
          json_format_descripton:
            "Tous les messages doivent être envoyés au format JSON.",
          example_message: "2. Exemple de message :",
          example_code: {
            command: "start_game",
            parameters: {},
          },

          send_message: "3. Envoyer un message :",
          send_message_description:
            "Utilisez la bibliothèque WebSocket du langage de programmation que vous avez choisi pour envoyer des messages.",
        },

        step4: {
          title: "Étape 4 : Recevoir une réponse",
          json_feedback: " 1.Confirmations JSON:",
          feedback: " Le serveur renvoie des réponses au format JSON.",
          bytestream: "2. Recevoir des bytestreams :",
          bytestream_receive:
            "Si le feed-back est un bytestream représentant un PNG, enregistrez-le en conséquence.",
        },
      },
    },
    footer: {
      datenschutz: "Politique",
      impressum: "Mentions légales",
    },
  },
  /////////////////////////////////////////////////////////Spanisch////////////////////////////////////////////////////////////////////////////////////////////////////

  es: {
    message: {
      home: "Inicio",
      instruction: "Instrucción",
      leaderboard: "Tabla de clasificación",
      achievements: "Logros",
      welcome: "Bienvenido a KIMaster",
      subtitle: "Aquí puedes probar tu IA de juegos",
      enter_lobby_key: "Introducir la clave del vestíbulo",
      join_lobby: "Unirse al vestíbulo",
      lobby_join_failed: "¡Falló la unión al vestíbulo!",
      lobby_swap_failed: "Posición ocupada!",
      game_start_failed: "Cantidad incorrecta de jugadores!",
      joinAs: "Únete como",
      createLobby: "crear vestíbulo",
      create: "crear",
      chess: "Ajedrez",
      connect4: "Conecta 4",
      tictactoe: "Tres en raya",
      othello: "Othello",
      nim: "Nim",
      checkers: "Damas",
      leave_lobby: "Salir del vestíbulo",
      start_game: "¡Empezar el juego!",
      lobby_key_generating: "Clave del vestíbulo: Generando",
      lobby_key: "Clave del vestíbulo: {key}",
      your_position: "Tu posición {position}",
      lobby_position:
        "Posiciones de lobby: P1= {p1} P2= {p2} Espectadores {spectators}",
      lobbyPos: "Lobby Pos",
      lobbyStatus: "Estado del lobby",
      webSocketConnectionStatus: "Estado de la conexión WebSocket:",
      player1: "Jugador 1",
      player2: "Jugador 2",
      spectator: "Espectador",
      timeLine: "Línea del tiempo",
      player_vs_player: "Jugador contra Jugador",
      player_vs_ai: "Jugador contra KIM",
      playerai_vs_ai: "IA Jugador contra KIM",
      playerai_vs_playerai: "IA Jugador contra IA Jugador",
      KIM_vs_Player: "KIM contra los jugadores",
      KIM_vs_Player_AI: "KIM contra la IA",
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
      lobby: "Vestíbulo",
      lobby_welcome: "Bienvenido al vestíbulo de {game}",
      surrender: "Rendirse",
      quit_game: "Salir del juego",
      first: "Primero",
      previous: "Anterior",
      next: "Siguiente",
      last: "Último",
      undo_move: "Deshacer movimiento",
      new_game: "Nuevo juego",
      game_over: "Fin del juego",
      nim_move: "Hacer movimiento",
      row: "Fila",
      amount: "Cantidad",
      player_1_won: "El jugador 1 ganó",
      player_2_won: "El jugador 2 ganó",
      game_over_after: "Fin del juego después de",
      turn: "Turno",
      turns: "Turnos",
      okay: "Aceptar",
      show_rules: "regular",
      return_to_game: "Volver al juego",
      surrender_before_start:
        "Debes abandonar antes de poder empezar una nueva partida o lobby.",
      draw: "Indecisos!",
      startGame: "¡Que empiece el juego",
      waitMessage: "Esperar a que se cree el vestíbulo...",
      connection_not_possible: "La conexión con el servidor no ha sido posible",
      copyright: "© 2024 Tu empresa. Todos los derechos reservados.",
      step: "paso",
      unstep: "Deshacer el paso",
      evaluate: "evaluar",
      valid_Moves_Instead: "Valid Moves en lugar de Make Move",
      activateTwoTurnGame: "Activar dos rondas del juego",
      undo_this_num_of_terms: "Deshacer el número de revoluciones",
      grid_Width: "Ancho de rejilla",
      grid_Height: "Altura de la rejilla",
      play: "Jugar",
      received_from_server: "Recibido del servidor",
      command: "Comando",
      command_key: "Tecla de mando",
      key_value_pair_input: "Entrada de pares clave-valor",
      key: "Clave",
      value: "valor",
      add_pair: "Añadir par",
      json_output: "Salida JSON",
      your_turn: "Tu turno",
      opponent_turn: "Turno del adversario",
      blunder: "Muestra Errores",
      you_won: "¡Has ganado!",
      opponent_won: "El oponente ganó",
      time_remaining: "Tiempo Restante",
      play_music: "Reproducir música",
      pause_music: "Pausar música",
      resume_game: "Reanudar Juego",
      pause_game: "Pausar Juego",
      stop_timer: "Detener temporizador",
    },

    rules: {
      connect4: {
        game_title: "Reglas de las cuatro victorias",
        description:
          "Cuatro victorias es un juego para dos jugadores en el que, por turnos, dejan caer una ficha de su color en una de las siete columnas de la cuadrícula. El objetivo es ser el primero en tener cuatro fichas seguidas, ya sea en horizontal, vertical o diagonal.",

        setup: {
          title: "Preparación del juego",
          point1: "El tablero de juego consta de 7 columnas y 6 filas",
          point2:
            "Cada jugador elige un color y recibe un número ilimitado de fichas de ese color.",
        },

        gameplay: {
          title: "Jugabilidad",
          point1:
            "Por turnos, los jugadores dejan caer una piedra en una de las columnas.",
          point2:
            "La piedra cae en la posición más baja disponible de la columna.",
          point3:
            "El juego continúa hasta que un jugador tiene cuatro de sus piezas en fila o el tablero está lleno.",
        },
        endgame: {
          title: "Fin del juego",
          point1:
            "Un jugador gana cuando tiene cuatro fichas en fila (horizontal, vertical o diagonalmente).",
          point2:
            "El juego termina en tablas cuando el campo de juego está lleno y ningún jugador tiene cuatro fichas seguidas.",
        },
      },

      tictactoe: {
        game_title: "Reglas del tres en raya",
        description:
          "El tres en raya es un juego para dos jugadores en el que se turnan para marcar un cuadrado en una cuadrícula de 3x3. El objetivo es ser el primero en tener tres de tus personajes seguidos, ya sea en horizontal, vertical o diagonal.",

        setup: {
          title: "Preparación del juego",
          point1: "El campo de juego consiste en una cuadrícula de 3x3.",
          point2:
            "El juego continúa hasta que un jugador tiene tres de sus personajes seguidos o todos los espacios están ocupados.",
        },

        gameplay: {
          title: "Jugabilidad",
          point1:
            "Los jugadores se turnan para marcar una casilla en la cuadrícula.",
          point2:
            "El juego continúa hasta que un jugador tiene tres de sus personajes seguidos o todos los espacios están ocupados.",
        },

        endgame: {
          title: "Fin del juego",
          point1:
            "Un jugador gana si tiene tres personajes seguidos (horizontal, vertical o diagonalmente).",
          point2:
            "El juego termina en empate cuando todos los campos están ocupados y ningún jugador tiene tres personajes seguidos.",
        },
      },

      nim: {
        game_title: "Reglas de Nim",
        description:
          "Nim es un juego de estrategia donde los jugadores se turnan para quitar piedras de montones distintos. El jugador que quita la última piedra gana o pierde, dependiendo de la regla acordada.",

        setup: {
          title: "Preparación",
          point1: "Hay varias filas de piedras.",
          point2: "Dos jugadores se turnan.",
        },

        gameplay: {
          title: "Desarrollo del juego",
          point1:
            "Los jugadores se turnan para quitar piedras de una sola fila.",
          point2: "Un jugador debe tomar al menos una piedra en su turno.",
          point3: "Un jugador puede tomar varias piedras de la misma fila.",
          point4:
            "Los jugadores no pueden tomar piedras de más de una fila en un solo turno.",
        },

        endgame: {
          title: "Fin del juego",
          point1: "El jugador que toma la última piedra gana.",
        },
      },

      othello: {
        game_title: "Reglas de Othello",
        description:
          "Othello se juega entre dos jugadores en un tablero de 8×8 con discos redondos que son negros por un lado y blancos por el otro. Cada jugador recibe varios discos.",

        setup: {
          title: "Preparación",
          point1: "El juego se juega en un tablero de 8×8.",
          point2:
            "Cada jugador recibe un número de discos con un lado negro y un lado blanco.",
          point3:
            "Al comienzo del juego, cuatro discos se colocan en una posición predeterminada en el centro del tablero.",
        },

        gameplay: {
          title: "Desarrollo del juego",
          point1: "El jugador negro siempre mueve primero.",
          point2:
            "Un jugador debe colocar un disco en una casilla vacía adyacente a un disco del oponente, con al menos un disco del oponente entre el disco colocado y otro disco del color del jugador.",
          point3:
            "Después de colocar un disco, todos los discos del oponente en línea recta entre el nuevo disco y otro disco del color del jugador son volteados.",
          point4:
            "Los jugadores alternan turnos. Si un jugador no puede hacer un movimiento que voltee un disco del oponente, debe pasar.",
        },

        endgame: {
          title: "Fin del juego",
          point1:
            "El juego termina cuando el tablero está lleno o ninguno de los jugadores puede hacer un movimiento válido.",
          point2:
            "El jugador con más discos de su color en el tablero al final gana.",
        },
      },

      checkers: {
        game_title: "Reglas de las damas",
        description:
          "Las damas son un juego de mesa estratégico para dos jugadores. Cada jugador empieza con 12 fichas, que se colocan en las casillas oscuras de las tres filas más cercanas a él. El objetivo del juego es capturar o bloquear todas las fichas del adversario para que no puedan moverse.",

        setup: {
          title: "El tablero de juego al principio",
          description:
            "El tablero se coloca automáticamente de modo que haya una casilla oscura en la parte inferior izquierda. El jugador inicial comienza con las fichas blancas.",
        },

        movement: {
          title: "Tirando de las piedras",
          description:
            "Las piedras se mueven una casilla en diagonal, pero sólo hacia delante y sólo a casillas oscuras libres.",
        },

        capturing: {
          title: "Vencer a",
          description1:
            "Existe obligación de capturar. Si no se pueden hacer clic en tus propias piezas libres durante un movimiento, puede ser porque hay una oportunidad de captura en algún lugar del tablero. Solo una de estas piezas puede ser seleccionada. Las piezas simples solo pueden capturar hacia adelante. Al capturar, la pieza debe estar directamente frente a la pieza del oponente y debe aterrizar directamente detrás de la pieza capturada. Esta casilla debe estar libre.",
          description2:
            "Si tienes la opción entre diferentes oportunidades de captura, puedes decidir libremente. La excepción es la captura múltiple.",
          description3:
            "Captura múltiple significa: Si una pieza ha capturado y existe la posibilidad de capturar nuevamente con la misma pieza, el jugador continúa su turno hasta que la captura múltiple ya no sea posible.",
        },

        queening: {
          title: "Convertir en reina",
          description1:
            "Obtienes una dama si una de tus fichas se detiene en la línea de fondo de tu adversario, ya sea mediante un movimiento normal o una captura. La ficha se marca entonces con una 'corona' (en el juego de mesa, se coloca una segunda ficha encima).",
          description2:
            "Ahora la dama puede moverse en diagonal hacia delante y hacia atrás, y también se puede capturar con ella. Sin embargo, a diferencia de la variante de dama internacional, la dama sólo puede avanzar o retroceder una casilla.",
        },

        endgame: {
          title: "Fin del juego",
          description:
            "Has perdido si no tienes más piezas o si ya no puedes hacer ningún movimiento con tus piezas porque las tuyas están bloqueadas por tu adversario. También puedes perder la partida si realizas la acción 'Renunciar', por ejemplo, porque vas tan retrasado que ya no tiene sentido seguir jugando.",
        },

        draw: {
          title: "Dibujar",
          description:
            "Algunas partidas acaban en tablas. En tal caso, ningún jugador puede volver a ganar a menos que el otro cometa un error garrafal. Para evitar partidas interminables, hay dos posibilidades de tablas:",
          point1: "Ambos jugadores se han puesto de acuerdo",
          point2:
            "se realizaron 30 jugadas en las que no se capturó ninguna pieza.",
        },
      },
    },

    instructions: {
      instruction_title: "Instrucciones",
      introduction: {
        title: "Introducción",
        description1:
          "Esta documentación describe el proceso de utilización de una conexión WebSocket en un lenguaje de programación seleccionado para conectarse a la URI wss://kimaster.mni.thm.de/ws.",
        description2:
          "Además, explica cómo conectarse a la red interna de THM y enviar mensajes en formato JSON y recibir respuesta del servidor.",
        description3:
          "También se proporciona un ejemplo de conexión utilizando Python.",
      },
      requirements: {
        title: "Requisitos",
        network_access:
          "Debe estar en la red interna de THM. Puede hacerlo a través de la VPN de THM o de la red Eduroam.",
        websocket_uri_title: "WebSocket URI:",
        websocket_uri: " wss://kimaster.mni.thm.de/ws",
        browser_url_title: "Browser URL:",
        browser_url:
          " https://kimaster.mni.thm.de (para conexiones de navegador)",
        message_format_title: "Formato del mensaje: ",
        message_format: "JSON",
        documentation_title: "Documentación:",
        documentation:
          " Encontrará información sobre los comandos JSON en el archivo command.md.",
      },
      webSocketConnection: {
        title: "Conexión WebSocket",
        step1: {
          title: "Paso 1: Establecer el acceso a la red",
          vpn: "THM VPN:",
          vpn_description:
            " Conéctese a la VPN de THM. Puedes encontrar instrucciones sobre cómo configurarlo en el sitio web oficial de THM.",
          vpn_link: "Guía THM VPN",
          eduroam: "Red Eduroam: ",
          eduroam_description:
            "También puede conectarse a la red Eduroam, si está disponible.",
          eduroam_link: "Guía Eduroam",
        },
        step2: {
          title: "Paso 2: Establecer conexión WebSocket",
          browser: {
            title: "Conexión a través del navegador",
            open_browser: "1. Abre tu navegador web.",
            enter_url: "2. Introduzca la URL https://kimaster.mni.thm.de.",
            internal_network:
              "3.Asegúrese de que se encuentra en la red interna de THM.",
          },
          connection_with_ProgrammingLanguage: {
            title: "Enlace con un lenguaje de programación (ejemplo en Python)",
            install_python:
              "1. Instalar Python : Asegúrese de que Python está instalado en su ordenador.",
            install_webSocket:
              "2. Instalar la librería WebSocket : Instale la librería WebSocket para Python con el siguiente comando :",
            pip_command: "3. pip install websocket-client",
            connection_code: "Código de conexión:",
          },
        },
        step3: {
          title: "Paso 3: Envío de mensajes JSON",
          json_format: "1. Formatear un mensaje JSON : ",
          json_format_descripton:
            "Todos los mensajes deben enviarse en formato JSON.",
          example_message: "2. Ejemplo de mensaje :",
          example_code: {
            command: "start_game",
            parameters: {},
          },

          send_message: "3. Enviar un mensaje :",
          send_message_description:
            "Utiliza la biblioteca WebSocket del lenguaje de programación que elijas para enviar mensajes.",
        },

        step4: {
          title: "Paso 4: Recibir una respuesta",
          json_feedback: " 1.Confirmaciones JSON:",
          feedback: " El servidor devuelve las respuestas en formato JSON.",
          bytestream: "2. Recibir bytestreams :",
          bytestream_receive:
            "Si la respuesta es un flujo de bytes que representa un PNG, guárdelo en consecuencia.",
        },
      },
    },
    footer: {
      datenschutz: "Política de Privacidad",
      impressum: "Pie de imprenta",
    },
  },

  ar: {
    message: {
      home: "الرئيسية",
      instruction: "التعليمات",
      leaderboard: "قائمة المتصدرين",
      achievements: "الإنجازات",
      welcome: "مرحبًا بك في KIMaster",
      subtitle: "هنا يمكنك اختبار الذكاء الاصطناعي الخاص بالألعاب",
      enter_lobby_key: "أدخل مفتاح الغرفة",
      join_lobby: "انضم إلى الغرفة",
      joinAs: "الانضمام كـ",
      lobby_join_failed: "فشل الانضمام إلى الغرفة!",
      lobby_swap_failed: "الموضع مشغول!",
      game_start_failed: "عدد اللاعبين غير صحيح!",
      upload_ai: "يجب رفع نماذج الذكاء الاصطناعي",
      createLobby: "إنشاء غرفة",
      create: "إنشاء",
      chess: "الشطرنج",
      connect4: "كونيكت فور",
      tictactoe: "إكس أو",
      othello: "أوتيلو",
      nim: "نيم",
      checkers: "داما",
      lobby: "الغرفة",
      lobby_welcome: "مرحبًا بك في",
      leave_lobby: "غادر الغرفة",
      start_game: "ابدأ اللعبة",
      lobby_key_generating: "مفتاح الغرفة: يتم إنشاؤه",
      lobby_key: "مفتاح الغرفة: {key}",
      your_position: "موضعك {position}",
      lobby_position:
        "مواضع الغرفة: اللاعب 1= {p1} اللاعب 2= {p2} المشاهدون {spectators}",
      lobbyPos: "موضع الغرفة",
      lobbyStatus: "حالة الغرفة",
      webSocketConnectionStatus: "حالة اتصال WebSocket:",
      player1: "اللاعب 1",
      player2: "اللاعب 2",
      spectator: "مشاهد",
      timeLine: "الجدول الزمني",
      player_vs_player: "لاعب ضد لاعب",
      player_vs_ai: "لاعب ضد KIM",
      playerai_vs_ai: "ذكاء اصطناعي لاعب ضد KIM",
      playerai_vs_playerai: "ذكاء اصطناعي لاعب ضد ذكاء اصطناعي لاعب",
      KIM_vs_Player: "KIM ضد لاعب",
      KIM_vs_Player_AI: "KIM ضد ذكاء اصطناعي لاعب",
      easy: "سهل",
      medium: "متوسط",
      hard: "صعب",
      surrender: "استسلام",
      quit_game: "الخروج من اللعبة",
      first: "الأول",
      previous: "السابق",
      next: "التالي",
      last: "الأخير",
      undo_move: "تراجع عن الحركة",
      new_game: "لعبة جديدة",
      game_over: "انتهت اللعبة",
      nim_move: "قم بالحركة",
      row: "صف",
      amount: "الكمية",
      player_1_won: "فاز اللاعب 1",
      player_2_won: "فاز اللاعب 2",
      game_over_after: "انتهت اللعبة بعد",
      turn: "دور",
      turns: "أدوار",
      okay: "حسنًا",
      show_rules: "عرض القواعد",
      return_to_game: "العودة إلى اللعبة",
      surrender_before_start: "يجب الاستسلام أولاً قبل بدء لعبة أو غرفة جديدة",
      draw: "تعادل!",
      startGame: "ابدأ اللعبة",
      waitMessage: "انتظر حتى يتم إنشاء الغرفة...",
      connection_not_possible: "تعذر الاتصال بالخادم",
      copyright: "© 2024 شركتك. جميع الحقوق محفوظة.",
      step: "خطوة",
      unstep: "تراجع عن الخطوة",
      evaluate: "تقييم",
      valid_Moves_Instead: "حركات صالحة بدلاً من القيام بالحركة",
      activateTwoTurnGame: "تفعيل لعبة الدورين",
      undo_this_num_of_terms: "تراجع عن هذا العدد من الأدوار",
      grid_Width: "عرض الشبكة",
      grid_Height: "ارتفاع الشبكة",
      play: "لعب",
      received_from_server: "تم الاستلام من الخادم",
      command: "أمر",
      command_key: "مفتاح الأمر",
      key_value_pair_input: "إدخال زوج المفتاح والقيمة",
      key: "مفتاح",
      value: "قيمة",
      add_pair: "إضافة زوج",
      json_output: "مخرجات JSON",
      your_turn: "دورك",
      opponent_turn: "دور الخصم",
      blunder: "عرض الأخطاء",
      you_won: "لقد فزت!",
      opponent_won: "فاز الخصم",
      time_remaining: "الوقت المتبقي",
      play_music: "تشغيل الموسيقى",
      pause_music: "إيقاف الموسيقى",
      resume_game: "استئناف اللعبة",
      pause_game: "إيقاف مؤقت للعبة",
      stop_timer: "إيقاف الوقت",
    },

    rules: {
      connect4: {
        game_title: "قواعد كونكت فور",
        description:
          "كونكت فور هي لعبة بين لاعبين حيث يتناوب اللاعبان على إسقاط أقراصهم الملونة في عمود. الهدف هو أن يكون أول من يحصل على أربعة أقراص متتالية أفقيًا، عموديًا، أو قطريًا.",

        setup: {
          title: "الإعداد",
          point1: "لوحة اللعبة تتكون من 7 أعمدة و6 صفوف.",
          point2:
            "يختار كل لاعب لونًا ويحصل على عدد غير محدود من الأقراص بذلك اللون.",
        },
        gameplay: {
          title: "طريقة اللعب",
          point1: "يتناوب اللاعبون على إسقاط قرص في أحد الأعمدة.",
          point2: "يسقط القرص إلى أدنى موضع متاح داخل العمود.",
          point3:
            "تستمر اللعبة حتى يحصل أحد اللاعبين على أربعة أقراص متتالية أو تمتلئ اللوحة.",
        },
        endgame: {
          title: "نهاية اللعبة",
          point1:
            "يفوز اللاعب عندما يحصل على أربعة أقراص متتالية (أفقيًا، عموديًا، أو قطريًا).",
          point2:
            "تنتهي اللعبة بالتعادل إذا امتلأت اللوحة ولم يحصل أي لاعب على أربعة أقراص متتالية.",
        },
      },

      tictactoe: {
        game_title: "قواعد إكس أو",
        description:
          "إكس أو هي لعبة بين لاعبين حيث يتناوب اللاعبان على وضع علامة في شبكة 3x3. الهدف هو أن يكون أول من يحصل على ثلاثة علامات متتالية أفقيًا، عموديًا، أو قطريًا.",

        setup: {
          title: "الإعداد",
          point1: "لوحة اللعبة تتكون من شبكة 3x3.",
          point2: "يختار كل لاعب علامة، إما 'X' أو 'O'.",
        },
        gameplay: {
          title: "طريقة اللعب",
          point1: "يتناوب اللاعبون على وضع علامة في الشبكة.",
          point2:
            "تستمر اللعبة حتى يحصل أحد اللاعبين على ثلاثة علامات متتالية أو تمتلئ كل المساحات.",
        },
        endgame: {
          title: "نهاية اللعبة",
          point1:
            "يفوز اللاعب عندما يحصل على ثلاثة علامات متتالية (أفقيًا، عموديًا، أو قطريًا).",
          point2:
            "تنتهي اللعبة بالتعادل إذا امتلأت كل المساحات ولم يحصل أي لاعب على ثلاثة علامات متتالية.",
        },
      },

      nim: {
        game_title: "قواعد نيم",
        description:
          "نيم هي لعبة استراتيجية حيث يتناوب اللاعبون على إزالة الأحجار من أكوام مميزة. اللاعب الذي يزيل الحجر الأخير يفوز.",

        setup: {
          title: "الإعداد",
          point1: "تتكون اللعبة من عدة صفوف من الأحجار.",
          point2: "يتناوب اللاعبان على الدور.",
        },
        gameplay: {
          title: "طريقة اللعب",
          point1: "يتناوب اللاعبون على إزالة الأحجار من صف واحد.",
          point2: "يجب على اللاعب إزالة حجر واحد على الأقل في دوره.",
          point3: "يمكن للاعب إزالة عدة أحجار من نفس الصف.",
          point4:
            "لا يمكن للاعبين إزالة الأحجار من أكثر من صف واحد في دور واحد.",
        },
        endgame: {
          title: "نهاية اللعبة",
          point1: "يفوز اللاعب الذي يزيل الحجر الأخير.",
        },
      },

      othello: {
        game_title: "قواعد أوتيلو",
        description:
          "تُلعب أوتيلو بين لاعبين على لوحة 8×8 باستخدام أقراص دائرية يكون جانبها أسود والجانب الآخر أبيض. يحصل كل لاعب على عدد من الأقراص.",

        setup: {
          title: "الإعداد",
          point1: "تُلعب اللعبة على لوحة 8×8.",
          point2: "يُمنح كل لاعب عددًا من الأقراص ذات الجانب الأسود والأبيض.",
          point3:
            "في بداية اللعبة، يتم وضع أربعة أقراص في موقع محدد مسبقًا في وسط اللوحة.",
        },
        gameplay: {
          title: "طريقة اللعب",
          point1: "يبدأ اللاعب 'الأسود' اللعب دائمًا.",
          point2:
            "يجب على اللاعب وضع قرص في مربع فارغ مجاور لقرص الخصم، بحيث يكون هناك قرص واحد على الأقل للخصم بين القرص الذي تم وضعه وقرص آخر بلون اللاعب.",
          point3:
            "بعد وضع قرص، يتم قلب كل أقراص الخصم في خط مستقيم بين القرص الجديد وقرص آخر بلون اللاعب.",
          point4:
            "يتناوب اللاعبون الأدوار. إذا لم يتمكن اللاعب من القيام بحركة تقلب قرص الخصم، يجب أن يمر.",
        },
        endgame: {
          title: "نهاية اللعبة",
          point1:
            "تنتهي اللعبة عندما تمتلئ اللوحة أو عندما لا يستطيع أي من اللاعبين القيام بحركة صالحة.",
          point2:
            "يفوز اللاعب الذي لديه أكبر عدد من الأقراص بلونه على اللوحة في النهاية.",
        },
      },

      checkers: {
        game_title: "قواعد الداما",
        description:
          "الداما، المعروفة أيضًا باسم الدرفتس، هي لعبة لوحية استراتيجية للاعبين. يبدأ كل لاعب بـ 12 قطعة توضع على المربعات الداكنة من الصفوف الثلاثة الأقرب إليه. الهدف هو الاستيلاء على جميع قطع الخصم أو منعها من التحرك.",

        setup: {
          title: "لوحة اللعبة عند البداية",
          description:
            "يتم وضع رقعة الداما تلقائيًا بحيث يكون المربع الداكن في الزاوية اليسرى السفلى. يبدأ اللاعب بالقطع البيضاء.",
        },
        movement: {
          title: "تحريك القطع",
          description:
            "تتحرك القطع مربعًا واحدًا قطريًا للأمام إلى مربع داكن فارغ.",
        },
        capturing: {
          title: "الأسر",
          description1:
            "هناك التزام بالأسر. إذا لم تكن قطعك الحرة قابلة للنقر أثناء الحركة، فقد يكون السبب وجود فرصة للأسر في مكان ما على اللوحة. يُسمح فقط بتحديد إحدى هذه القطع. يمكن للقطع الفردية الأسر فقط للأمام. عند الأسر، يجب أن تقف القطعة مباشرة أمام قطعة الخصم ويجب أن تهبط مباشرة خلف القطعة المأسورة. يجب أن يكون هذا المربع فارغًا.",
          description2:
            "إذا كان لديك اختيار بين فرص أسر مختلفة، فأنت حر في القرار. الاستثناء هو الأسر المتعدد.",
          description3:
            "الأسر المتعدد يعني: إذا أسر اللاعب قطعة وكان هناك فرصة أخرى للأسر بنفس القطعة، يكمل اللاعب دوره حتى لا يكون هناك أسر إضافي ممكن.",
        },
        queening: {
          title: "التتويج",
          description1:
            "تحصل على ملكة عندما تصل إحدى قطعك إلى الصف الخلفي للخصم، إما بحركة عادية أو بالأسر. يتم تمييز القطعة بـ 'تاج' (في اللعبة اللوحية، يتم وضع قطعة ثانية فوقها).",
          description2:
            "يمكن للملكة التحرك قطريًا للأمام والخلف ويمكنها أيضًا الأسر في كلا الاتجاهين. بخلاف الداما الدولية، يمكن للملك التحرك مربعًا واحدًا فقط للأمام أو الخلف.",
        },
        endgame: {
          title: "نهاية اللعبة",
          description:
            "تخسر إذا لم يتبق لديك أي قطع أو إذا كانت قطعك محاصرة وغير قادرة على الحركة. يمكنك أيضًا الاستسلام عن طريق اختيار 'الاستسلام'.",
        },
        draw: {
          title: "التعادل",
          description:
            "بعض الألعاب تنتهي بالتعادل. يحدث هذا عندما لا يستطيع أي من اللاعبين الفوز إلا إذا ارتكب الآخر خطأ كبيرًا. لمنع الألعاب الطويلة جدًا، هناك طريقتان لإعلان التعادل:",
          point1: "يتفق كلا اللاعبين على التعادل، أو",
          point2: "تم تنفيذ 30 حركة بدون أسر.",
        },
      },
    },

    instructions: {
      instruction_title: "تعليمات",
      introduction: {
        title: "مقدمة",
        description1:
          "تصف هذه الوثيقة عملية استخدام اتصال WebSocket بلغة برمجة مختارة للاتصال بالعنوان URI wss://kimaster.mni.thm.de/ws.",
        description2:
          "بالإضافة إلى ذلك، توضح كيفية تسجيل الدخول إلى شبكة THM الداخلية وإرسال الرسائل بتنسيق JSON وتلقي ردود الخادم.",
        description3: "تم توفير مثال اتصال باستخدام لغة Python.",
      },
      requirements: {
        title: "المتطلبات",
        network_access:
          "يجب أن تكون داخل شبكة THM الداخلية. يمكن تحقيق ذلك إما عبر شبكة THM VPN أو شبكة Eduroam.",
        websocket_uri_title: "عنوان WebSocket URI:",
        websocket_uri: "wss://kimaster.mni.thm.de/ws",
        browser_url_title: "رابط المتصفح:",
        browser_url: "https://kimaster.mni.thm.de (للاتصالات عبر المتصفح)",
        message_format_title: "تنسيق الرسائل:",
        message_format: "JSON",
        documentation_title: "التوثيق:",
        documentation:
          "يمكن العثور على معلومات حول أوامر JSON في ملف command.md.",
      },
      webSocketConnection: {
        title: "اتصال WebSocket",
        step1: {
          title: "الخطوة 1: إنشاء اتصال بالشبكة",
          vpn: "THM VPN:",
          vpn_description:
            "اتصل بشبكة THM VPN. يمكن العثور على تعليمات الإعداد على الموقع الرسمي لـ THM.",
          vpn_link: "دليل THM VPN",
          eduroam: "شبكة Eduroam:",
          eduroam_description:
            "بدلاً من ذلك، يمكنك الاتصال بشبكة Eduroam إذا كانت متوفرة.",
          eduroam_link: "دليل Eduroam",
        },
        step2: {
          title: "الخطوة 2: إنشاء اتصال WebSocket",
          browser: {
            title: "الاتصال عبر المتصفح",
            open_browser: "1. افتح متصفح الويب الخاص بك.",
            enter_url: "2. أدخل الرابط https://kimaster.mni.thm.de.",
            internal_network: "3. تأكد من أنك داخل شبكة THM الداخلية.",
          },
          connection_with_ProgrammingLanguage: {
            title: "الاتصال باستخدام لغة برمجة (مثال بلغة Python)",
            install_python: "1. تثبيت Python: تأكد من تثبيت Python على جهازك.",
            install_webSocket:
              "2. تثبيت مكتبة WebSocket: قم بتثبيت مكتبة WebSocket لـ Python باستخدام الأمر التالي:",
            pip_command: "pip install websocket-client",
            connection_code: "رمز الاتصال:",
            example_code: `
                import asyncio
                import json
                from abc import ABC
                import io
                from typing import Coroutine
                from PIL import Image
                from websockets import WebSocketClientProtocol, connect, InvalidURI, ConnectionClosedOK
                
                class KIMaster(ABC):
                    def __init__(self, uri_pool: list[str]):
                        self.connection: WebSocketClientProtocol | None = None
                        self.uri_pool: list[str] = uri_pool
    
                    async def connect(self) -> None:
                        for uri in self.uri_pool:
                            print(f"Try to connect to URI: '{uri}'")
                            try:
                                self.connection = await connect(uri)
                                print(f"Connected to URI: '{uri}'")
                                break
                            except InvalidURI:
                                print(f"URI: '{uri}' not reachable!")
    
                    async def send_cmd(self, command: str, command_key: str, data: dict | None = None) -> None:
                        if self.connection:
                            payload: dict = {"command": command, "command_key": command_key}
                            if data is not None:
                                payload.update(data)
                            await self.connection.send(json.dumps(payload))
    
                    async def receive(self) -> dict | str | bytes | None:
                        if self.connection:
                            message = None
                            try:
                                message = await self.connection.recv()
                            except ConnectionClosedOK:
                                return
                            try:
                                data = json.loads(message)
                                return data
                            except json.JSONDecodeError:
                                return message
                            except UnicodeDecodeError:
                                return message
    
                    async def close(self) -> None:
                        if self.connection:
                            await self.connection.close()
    
                    def run(self, target: Coroutine) -> None:
                        asyncio.run(target)
    
                    async def handler(self, send_handler, receive_handler) -> None:
                        send_task = asyncio.create_task(send_handler())
                        receive_task = asyncio.create_task(receive_handler())
                        await asyncio.gather(send_task, receive_task)
    
                    def print_message(self, message: dict) -> None:
                        print("\\n")
                        for k, v in message.items():
                            print(f" -- {k}: {v}")
    
                    def show(self, message: bytes) -> None:
                        image_stream = io.BytesIO(message)
                        image = Image.open(image_stream)
                        image.show()
              `,
          },
        },
        step3: {
          title: "الخطوة 3: إرسال رسائل JSON",
          json_format: "1. صياغة رسالة JSON:",
          json_format_description: "يجب إرسال جميع الرسائل بتنسيق JSON.",
          example_message: "2. رسالة مثال:",
          example_code: `
              {
                "command": "start_game",
                "parameters": {}
              }
            `,
          send_message: "3. إرسال الرسالة:",
          send_message_description:
            "استخدم مكتبة WebSocket الخاصة بلغة البرمجة التي اخترتها لإرسال الرسائل.",
        },
        step4: {
          title: "الخطوة 4: استلام الردود",
          json_feedback: "1. ردود JSON:",
          feedback: "يرسل الخادم الردود بتنسيق JSON.",
          bytestream: "2. استلام تدفقات بايت:",
          bytestream_receive:
            "إذا كان الرد تدفق بايت يمثل صورة PNG، قم بحفظها وفقًا لذلك.",
        },
      },
    },
    footer: {
      datenschutz: "سياسة الخصوصية",
      impressum: "البيان القانوني",
    },
  },

  tr: {
    message: {
      home: "Ana Sayfa",
      instruction: "Talimatlar",
      leaderboard: "Lider Tablosu",
      achievements: "Başarılar",
      welcome: "KIMaster'a Hoş Geldiniz",
      subtitle: "Burada oyun yapay zekasını test edebilirsiniz",
      enter_lobby_key: "Lobi anahtarını girin",
      join_lobby: "Lobiye Katıl",
      joinAs: "Katılma Tipi",
      lobby_join_failed: "Lobiye katılma başarısız!",
      lobby_swap_failed: "Yer dolu!",
      game_start_failed: "Oyuncu sayısı yanlış!",
      upload_ai: "AI modellerini yüklemelisiniz",
      createLobby: "Lobi Oluştur",
      create: "Oluştur",
      chess: "Satranç",
      connect4: "Connect Four",
      tictactoe: "X-O",
      othello: "Othello",
      nim: "Nim",
      checkers: "Dama",
      lobby: "Lobi",
      lobby_welcome: "KIMaster'a Hoş Geldiniz",
      leave_lobby: "Lobiden Çık",
      start_game: "Oyunu Başlat",
      lobby_key_generating: "Lobi Anahtarı: Oluşturuluyor",
      lobby_key: "Lobi Anahtarı: {key}",
      your_position: "Pozisyonunuz: {position}",
      lobby_position: "Lobi Pozisyonları: Oyuncu 1= {p1}, Oyuncu 2= {p2}, İzleyiciler {spectators}",
      lobbyPos: "Lobi Pozisyonu",
      lobbyStatus: "Lobi Durumu",
      webSocketConnectionStatus: "WebSocket: Bağlantı Durumu",
      player1: "Oyuncu 1",
      player2: "Oyuncu 2",
      spectator: "İzleyici",
      timeLine: "Zaman Çizelgesi",
      player_vs_player: "Oyuncu vs Oyuncu",
      player_vs_ai: "Oyuncu vs Yapay Zeka",
      playerai_vs_ai: "AI Oyuncu vs AI",
      playerai_vs_playerai: "AI Oyuncu vs AI Oyuncu",
      KIM_vs_Player: "KIM vs Oyuncu",
      KIM_vs_Player_AI: "KIM AI vs Oyuncu",
      easy: "Kolay",
      medium: "Orta",
      hard: "Zor",
      surrender: "Teslim Ol",
      quit_game: "Oyundan Çık",
      first: "İlk",
      previous: "Önceki",
      next: "Sonraki",
      last: "Son",
      undo_move: "Hamleyi Geri Al",
      new_game: "Yeni Oyun",
      game_over: "Oyun Bitti",
      nim_move: "Hamle Yap",
      row: "Satır",
      amount: "Miktar",
      player_1_won: "Oyuncu 1 Kazandı",
      player_2_won: "Oyuncu 2 Kazandı",
      game_over_after: "Oyun şu kadar hamle sonra bitti",
      turn: "Hamle",
      turns: "Hamleler",
      okay: "Tamam",
      show_rules: "Kuralları Göster",
      return_to_game: "Oyuna Dön",
      surrender_before_start: "Yeni bir oyun veya lobi başlatmadan önce teslim olmanız gerekiyor",
      draw: "Beraberlik!",
      startGame: "Oyunu Başlat",
      waitMessage: "Lobi oluşturulmasını bekleyin...",
      connection_not_possible: "Sunucuya bağlanılamıyor",
      copyright: "© 2024 Şirketiniz. Tüm hakları saklıdır.",
      step: "Adım",
      unstep: "Adımı Geri Al",
      evaluate: "Değerlendir",
      valid_Moves_Instead: "Geçerli hamleler mevcut",
      activateTwoTurnGame: "Çift Hamle Modunu Etkinleştir",
      undo_this_num_of_terms: "Bu kadar hamle geri al",
      grid_Width: "Izgara Genişliği",
      grid_Height: "Izgara Yüksekliği",
      play: "Oyna",
      received_from_server: "Sunucudan Alındı",
      command: "Komut",
      command_key: "Komut Anahtarı",
      key_value_pair_input: "Anahtar-Değer Çifti Girişi",
      key: "Anahtar",
      value: "Değer",
      add_pair: "Çift Ekle",
      json_output: "JSON Çıktısı",
      your_turn: "Sıra Sizde",
      opponent_turn: "Rakip Sırada",
      blunder: "Hataları Göster",
      you_won: "Kazandınız!",
      opponent_won: "Rakip Kazandı",
      time_remaining: "Kalan Zaman",
      play_music: "Müziği Oynat",
      pause_music: "Müziği Durdur",
      resume_game: "Oyunu Sürdür",
      pause_game: "Oyunu Duraklat",
      stop_timer: "Zamanlayıcıyı Durdur",
    },

    rules: {
      connect4: {
        game_title: "Connect Four Kuralları",
        description:
          "Connect Four, iki oyuncu arasında oynanan bir oyundur. Oyuncular sırayla kendi renkli disklerini bir sütuna bırakır. Amaç, yatay, dikey veya çapraz olarak dört diski arka arkaya dizmektir.",
        setup: {
          title: "Kurulum",
          point1: "Oyun tahtası 7 sütun ve 6 sıradan oluşur.",
          point2: "Her oyuncu bir renk seçer ve o renkten sınırsız diske sahip olur.",
        },
        gameplay: {
          title: "Oynanış",
          point1: "Oyuncular sırayla bir diski bir sütuna bırakır.",
          point2: "Disk, sütundaki en alt uygun konuma yerleşir.",
          point3: "Bir oyuncu dört diski arka arkaya dizene kadar oyun devam eder.",
        },
        endgame: {
          title: "Oyunun Sonu",
          point1: "Bir oyuncu dört diski arka arkaya dizdiğinde kazanır.",
          point2: "Tahta dolup kimse kazanamazsa oyun berabere biter.",
        },
      },
      // Diğer kurallar benzer şekilde çevrilebilir.
    },

    footer: {
      datenschutz: "Gizlilik Politikası",
      impressum: "Yasal Bildirim",
    },
  },


  ja: {
    message: {
      home: "ホーム",
      instruction: "説明",
      leaderboard: "ランキング",
      achievements: "実績",
      welcome: "KIMasterへようこそ",
      subtitle: "ここでゲームAIをテストできます",
      enter_lobby_key: "ロビーキーを入力",
      join_lobby: "ロビーに参加",
      joinAs: "参加方法",
      lobby_join_failed: "ロビー参加に失敗しました！",
      lobby_swap_failed: "その場所は埋まっています！",
      game_start_failed: "プレイヤー数が正しくありません！",
      upload_ai: "AIモデルをアップロードする必要があります",
      createLobby: "ロビーを作成",
      create: "作成",
      chess: "チェス",
      connect4: "四目並べ",
      tictactoe: "三目並べ",
      othello: "オセロ",
      nim: "ニム",
      checkers: "チェッカー",
      lobby: "ロビー",
      lobby_welcome: "KIMasterへようこそ",
      leave_lobby: "ロビーを退出",
      start_game: "ゲームを開始",
      lobby_key_generating: "ロビーキー: 生成中",
      lobby_key: "ロビーキー: {key}",
      your_position: "あなたの位置: {position}",
      lobby_position: "ロビーの位置: プレイヤー1= {p1}, プレイヤー2= {p2}, 観戦者= {spectators}",
      lobbyPos: "ロビー位置",
      lobbyStatus: "ロビーステータス",
      webSocketConnectionStatus: "WebSocket: 接続状況",
      player1: "プレイヤー1",
      player2: "プレイヤー2",
      spectator: "観戦者",
      timeLine: "タイムライン",
      player_vs_player: "プレイヤー対プレイヤー",
      player_vs_ai: "プレイヤー対AI",
      playerai_vs_ai: "AIプレイヤー対AI",
      playerai_vs_playerai: "AIプレイヤー対AIプレイヤー",
      KIM_vs_Player: "KIM対プレイヤー",
      KIM_vs_Player_AI: "KIM AI対プレイヤー",
      easy: "簡単",
      medium: "普通",
      hard: "難しい",
      surrender: "降参",
      quit_game: "ゲームを終了",
      first: "最初",
      previous: "前",
      next: "次",
      last: "最後",
      undo_move: "手を戻す",
      new_game: "新しいゲーム",
      game_over: "ゲーム終了",
      nim_move: "手を進める",
      row: "行",
      amount: "量",
      player_1_won: "プレイヤー1が勝利",
      player_2_won: "プレイヤー2が勝利",
      game_over_after: "ゲーム終了（{turns}ターン後）",
      turn: "ターン",
      turns: "ターン",
      okay: "OK",
      show_rules: "ルールを表示",
      return_to_game: "ゲームに戻る",
      surrender_before_start: "新しいゲームまたはロビーを開始する前に降参してください",
      draw: "引き分け！",
      startGame: "ゲームを開始",
      waitMessage: "ロビー生成を待っています...",
      connection_not_possible: "サーバーへの接続ができません",
      copyright: "© 2024 あなたの会社。全著作権所有。",
      step: "ステップ",
      unstep: "ステップを戻す",
      evaluate: "評価",
      valid_Moves_Instead: "有効な手があります",
      activateTwoTurnGame: "2ターン制ゲームを有効化",
      undo_this_num_of_terms: "このターン数を取り消す",
      grid_Width: "グリッドの幅",
      grid_Height: "グリッドの高さ",
      play: "プレイ",
      received_from_server: "サーバーから受信",
      command: "コマンド",
      command_key: "コマンドキー",
      key_value_pair_input: "キーと値のペアを入力",
      key: "キー",
      value: "値",
      add_pair: "ペアを追加",
      json_output: "JSON出力",
      your_turn: "あなたのターン",
      opponent_turn: "相手のターン",
      blunder: "ミスを表示",
      you_won: "あなたの勝利！",
      opponent_won: "相手が勝ちました",
      time_remaining: "残り時間",
      play_music: "音楽を再生",
      pause_music: "音楽を一時停止",
      resume_game: "ゲームを再開",
      pause_game: "ゲームを一時停止",
      stop_timer: "タイマーを停止",
    },

    rules: {
      connect4: {
        game_title: "四目並べのルール",
        description:
          "四目並べは2人でプレイするゲームです。プレイヤーは交互に自分の色のコマを列に配置します。目標は、横、縦、または斜めに4つのコマを並べることです。",
        setup: {
          title: "セットアップ",
          point1: "ゲームボードは7列×6行で構成されています。",
          point2: "各プレイヤーは色を選択し、その色のコマを無制限に使用できます。",
        },
        gameplay: {
          title: "プレイ方法",
          point1: "プレイヤーは交互にコマを列に配置します。",
          point2: "コマは列の最下部の空いている位置に落ちます。",
          point3: "プレイヤーが4つのコマを並べるまでゲームは続きます。",
        },
        endgame: {
          title: "ゲーム終了",
          point1: "4つのコマを並べたプレイヤーが勝利します。",
          point2: "ボードが埋まって誰も勝てない場合、引き分けになります。",
        },
      },
      // 他のゲームのルールも同様に翻訳可能です。
    },

    footer: {
      datenschutz: "プライバシーポリシー",
      impressum: "法的通知",
    },
  },


  zh: {
    message: {
      home: "主页",
      instruction: "说明",
      leaderboard: "排行榜",
      achievements: "成就",
      welcome: "欢迎来到 KIMaster",
      subtitle: "在这里，您可以测试游戏人工智能",
      enter_lobby_key: "输入房间密钥",
      join_lobby: "加入房间",
      joinAs: "加入方式",
      lobby_join_failed: "加入房间失败！",
      lobby_swap_failed: "位置已被占用！",
      game_start_failed: "玩家数量不正确！",
      upload_ai: "必须上传 AI 模型",
      createLobby: "创建房间",
      create: "创建",
      chess: "国际象棋",
      connect4: "四子棋",
      tictactoe: "井字棋",
      othello: "黑白棋",
      nim: "Nim 游戏",
      checkers: "跳棋",
      lobby: "房间",
      lobby_welcome: "欢迎来到 KIMaster",
      leave_lobby: "离开房间",
      start_game: "开始游戏",
      lobby_key_generating: "正在生成房间密钥",
      lobby_key: "房间密钥：{key}",
      your_position: "您的位置：{position}",
      lobby_position: "房间位置：玩家1={p1} 玩家2={p2} 观众={spectators}",
      lobbyPos: "房间位置",
      lobbyStatus: "房间状态",
      webSocketConnectionStatus: "WebSocket：连接状态",
      player1: "玩家1",
      player2: "玩家2",
      spectator: "观众",
      timeLine: "时间轴",
      player_vs_player: "玩家对玩家",
      player_vs_ai: "玩家对 AI",
      playerai_vs_ai: "AI 玩家对 AI",
      playerai_vs_playerai: "AI 玩家对 AI 玩家",
      KIM_vs_Player: "KIM 对玩家",
      KIM_vs_Player_AI: "KIM AI 对玩家",
      easy: "简单",
      medium: "中等",
      hard: "困难",
      surrender: "投降",
      quit_game: "退出游戏",
      first: "第一个",
      previous: "上一个",
      next: "下一个",
      last: "最后一个",
      undo_move: "撤销移动",
      new_game: "新游戏",
      game_over: "游戏结束",
      nim_move: "执行移动",
      row: "行",
      amount: "数量",
      player_1_won: "玩家1获胜",
      player_2_won: "玩家2获胜",
      game_over_after: "游戏结束，共进行了",
      turn: "回合",
      turns: "回合",
      okay: "确定",
      show_rules: "显示规则",
      return_to_game: "返回游戏",
      surrender_before_start: "必须先投降，然后才能开始新游戏或房间",
      draw: "平局！",
      startGame: "开始游戏",
      waitMessage: "正在等待创建房间...",
      connection_not_possible: "无法连接到服务器",
      copyright: "© 2024 您的公司。版权所有。",
      step: "步骤",
      unstep: "撤销步骤",
      evaluate: "评估",
      valid_Moves_Instead: "有可行的移动",
      activateTwoTurnGame: "激活双回合游戏",
      undo_this_num_of_terms: "撤销此回合数",
      grid_Width: "网格宽度",
      grid_Height: "网格高度",
      play: "玩",
      received_from_server: "从服务器接收到",
      command: "命令",
      command_key: "命令键",
      key_value_pair_input: "键值对输入",
      key: "键",
      value: "值",
      add_pair: "添加键值对",
      json_output: "JSON 输出",
      your_turn: "轮到您",
      opponent_turn: "对手回合",
      blunder: "显示失误",
      you_won: "您赢了！",
      opponent_won: "对手赢了",
      time_remaining: "剩余时间",
      play_music: "播放音乐",
      pause_music: "暂停音乐",
      resume_game: "继续游戏",
      pause_game: "暂停游戏",
      stop_timer: "停止计时器",
    },

    rules: {
      connect4: {
        game_title: "四子棋规则",
        description:
          "四子棋是两名玩家的游戏，玩家轮流将自己的棋子放入某列。目标是首先在水平、垂直或对角线上连接四个棋子。",
        setup: {
          title: "设置",
          point1: "棋盘由7列和6行组成。",
          point2: "每位玩家选择一种颜色，并拥有无限数量的该颜色棋子。",
        },
        gameplay: {
          title: "游戏玩法",
          point1: "玩家轮流在某列放置一个棋子。",
          point2: "棋子将落在该列的最底部可用位置。",
          point3: "游戏持续到某个玩家连接四个棋子，或者棋盘填满。",
        },
        endgame: {
          title: "游戏结束",
          point1: "当玩家连接四个棋子时，他们获胜。",
          point2: "如果棋盘填满且无人获胜，游戏平局。",
        },
      },
      // 其他游戏规则可以类似翻译。
    },

    footer: {
      datenschutz: "隐私政策",
      impressum: "法律声明",
    },
  },

  ru: {
    message: {
      home: "Главная",
      instruction: "Инструкции",
      leaderboard: "Таблица лидеров",
      achievements: "Достижения",
      welcome: "Добро пожаловать в KIMaster",
      subtitle: "Здесь вы можете протестировать игровую ИИ",
      enter_lobby_key: "Введите ключ лобби",
      join_lobby: "Присоединиться к лобби",
      joinAs: "Присоединиться как",
      lobby_join_failed: "Не удалось присоединиться к лобби!",
      lobby_swap_failed: "Место занято!",
      game_start_failed: "Неверное количество игроков!",
      upload_ai: "Вы должны загрузить модели ИИ",
      createLobby: "Создать лобби",
      create: "Создать",
      chess: "Шахматы",
      connect4: "Connect Four",
      tictactoe: "Крестики-нолики",
      othello: "Отелло",
      nim: "Ним",
      checkers: "Шашки",
      lobby: "Лобби",
      lobby_welcome: "Добро пожаловать в KIMaster",
      leave_lobby: "Покинуть лобби",
      start_game: "Начать игру",
      lobby_key_generating: "Генерация ключа лобби...",
      lobby_key: "Ключ лобби: {key}",
      your_position: "Ваша позиция: {position}",
      lobby_position: "Позиции в лобби: Игрок 1= {p1}, Игрок 2= {p2}, Наблюдатели {spectators}",
      lobbyPos: "Позиция в лобби",
      lobbyStatus: "Статус лобби",
      webSocketConnectionStatus: "WebSocket: Состояние подключения",
      player1: "Игрок 1",
      player2: "Игрок 2",
      spectator: "Наблюдатель",
      timeLine: "Хронология",
      player_vs_player: "Игрок против Игрока",
      player_vs_ai: "Игрок против ИИ",
      playerai_vs_ai: "ИИ-Игрок против ИИ",
      playerai_vs_playerai: "ИИ-Игрок против ИИ-Игрока",
      KIM_vs_Player: "KIM против Игрока",
      KIM_vs_Player_AI: "KIM ИИ против Игрока",
      easy: "Легко",
      medium: "Средне",
      hard: "Трудно",
      surrender: "Сдаться",
      quit_game: "Выйти из игры",
      first: "Первый",
      previous: "Предыдущий",
      next: "Следующий",
      last: "Последний",
      undo_move: "Отменить ход",
      new_game: "Новая игра",
      game_over: "Игра окончена",
      nim_move: "Сделать ход",
      row: "Ряд",
      amount: "Количество",
      player_1_won: "Игрок 1 победил",
      player_2_won: "Игрок 2 победил",
      game_over_after: "Игра завершилась после",
      turn: "Ход",
      turns: "Ходы",
      okay: "Хорошо",
      show_rules: "Показать правила",
      return_to_game: "Вернуться к игре",
      surrender_before_start: "Сначала нужно сдаться, чтобы начать новую игру или лобби",
      draw: "Ничья!",
      startGame: "Начать игру",
      waitMessage: "Ожидание создания лобби...",
      connection_not_possible: "Невозможно подключиться к серверу",
      copyright: "© 2024 Ваша компания. Все права защищены.",
      step: "Шаг",
      unstep: "Отменить шаг",
      evaluate: "Оценить",
      valid_Moves_Instead: "Доступны допустимые ходы",
      activateTwoTurnGame: "Активировать игру с двумя ходами",
      undo_this_num_of_terms: "Отменить это количество ходов",
      grid_Width: "Ширина сетки",
      grid_Height: "Высота сетки",
      play: "Играть",
      received_from_server: "Получено от сервера",
      command: "Команда",
      command_key: "Ключ команды",
      key_value_pair_input: "Ввод ключ-значение",
      key: "Ключ",
      value: "Значение",
      add_pair: "Добавить пару",
      json_output: "Вывод JSON",
      your_turn: "Ваш ход",
      opponent_turn: "Ход противника",
      blunder: "Показать ошибки",
      you_won: "Вы выиграли!",
      opponent_won: "Противник выиграл",
      time_remaining: "Оставшееся время",
      play_music: "Воспроизвести музыку",
      pause_music: "Приостановить музыку",
      resume_game: "Продолжить игру",
      pause_game: "Пауза игры",
      stop_timer: "Остановить таймер",
    },
    rules: {
      connect4: {
        game_title: "Правила Connect Four",
        description:
          "Connect Four - игра для двух игроков. Игроки по очереди опускают свои цветные диски в колонну. Цель - первым соединить четыре диска в ряд по горизонтали, вертикали или диагонали.",
        setup: {
          title: "Настройка",
          point1: "Игровая доска состоит из 7 колонн и 6 рядов.",
          point2: "Каждый игрок выбирает цвет и имеет неограниченное количество дисков этого цвета.",
        },
        gameplay: {
          title: "Игровой процесс",
          point1: "Игроки по очереди опускают диск в одну из колонн.",
          point2: "Диск опускается в нижнюю доступную позицию в колонне.",
          point3: "Игра продолжается, пока один из игроков не соединит четыре диска подряд.",
        },
        endgame: {
          title: "Окончание игры",
          point1: "Игрок выигрывает, если соединяет четыре диска подряд.",
          point2: "Игра заканчивается вничью, если доска заполнена, и никто не выигрывает.",
        },
      },
      // Остальные правила можно перевести аналогично.
    },
    footer: {
      datenschutz: "защита данных",
      impressum: "Юридическая",
    },
  },

};


const i18n = createI18n({
  locale: "de", // Standard-Sprache
  fallbackLocale: "en", // Ausweichsprache
  messages,
});

export default i18n;
