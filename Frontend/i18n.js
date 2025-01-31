import { createI18n } from "vue-i18n";

const messages = {
  en: {
    // ... existing English translations ...
    rules: {
      // ... existing rules ...
      qawale: {
        game_title: "Qawale Rules",
        description: "Qawale is a strategy board game where players stack and distribute colored stones on a 4x4 board. The goal is to create a line of four stones of your color.",
        setup: {
          title: "Setup",
          point1: "The game is played on a 4x4 board.",
          point2: "Each player starts with 8 stones of their color (blue or red).",
          point3: "Each corner of the board starts with 2 yellow stones."
        },
        gameplay: {
          title: "Gameplay",
          point1: "Players take turns either placing a stone or distributing a stack.",
          point2: "When placing a stone, it goes at the bottom of the chosen stack.",
          point3: "When distributing a stack, stones are moved in a straight line, with each stone being placed under existing stones.",
          point4: "Distribution must use as many stones as spaces moved."
        },
        endgame: {
          title: "Endgame",
          point1: "A player wins by forming a line of four stones of their color at the bottom of stacks.",
          point2: "The line can be horizontal, vertical, or diagonal."
        }
      }
    }
  },
  de: {
    // ... existing German translations ...
    rules: {
      // ... existing rules ...
      qawale: {
        game_title: "Qawale Regeln",
        description: "Qawale ist ein strategisches Brettspiel, bei dem die Spieler farbige Steine auf einem 4x4-Brett stapeln und verteilen. Das Ziel ist es, eine Reihe von vier Steinen der eigenen Farbe zu bilden.",
        setup: {
          title: "Spielaufbau",
          point1: "Das Spiel wird auf einem 4x4-Brett gespielt.",
          point2: "Jeder Spieler beginnt mit 8 Steinen seiner Farbe (blau oder rot).",
          point3: "Jede Ecke des Bretts beginnt mit 2 gelben Steinen."
        },
        gameplay: {
          title: "Spielablauf",
          point1: "Die Spieler legen abwechselnd entweder einen Stein oder verteilen einen Stapel.",
          point2: "Beim Platzieren eines Steins kommt dieser an den Boden des gewählten Stapels.",
          point3: "Bei der Verteilung eines Stapels werden die Steine in gerader Linie bewegt, wobei jeder Stein unter vorhandene Steine gelegt wird.",
          point4: "Die Verteilung muss so viele Steine verwenden wie Felder bewegt werden."
        },
        endgame: {
          title: "Spielende",
          point1: "Ein Spieler gewinnt, indem er eine Reihe von vier Steinen seiner Farbe am Boden von Stapeln bildet.",
          point2: "Die Reihe kann horizontal, vertikal oder diagonal sein."
        }
      }
    }
  },
  fr: {
    // ... existing French translations ...
    rules: {
      // ... existing rules ...
      qawale: {
        game_title: "Règles du Qawale",
        description: "Qawale est un jeu de société stratégique où les joueurs empilent et distribuent des pierres colorées sur un plateau 4x4. Le but est de créer une ligne de quatre pierres de sa couleur.",
        setup: {
          title: "Mise en place",
          point1: "Le jeu se joue sur un plateau 4x4.",
          point2: "Chaque joueur commence avec 8 pierres de sa couleur (bleue ou rouge).",
          point3: "Chaque coin du plateau commence avec 2 pierres jaunes."
        },
        gameplay: {
          title: "Déroulement du jeu",
          point1: "Les joueurs placent à tour de rôle soit une pierre, soit distribuent une pile.",
          point2: "Lors du placement d'une pierre, celle-ci va au fond de la pile choisie.",
          point3: "Lors de la distribution d'une pile, les pierres sont déplacées en ligne droite, chaque pierre étant placée sous les pierres existantes.",
          point4: "La distribution doit utiliser autant de pierres que d'espaces déplacés."
        },
        endgame: {
          title: "Fin de partie",
          point1: "Un joueur gagne en formant une ligne de quatre pierres de sa couleur au fond des piles.",
          point2: "La ligne peut être horizontale, verticale ou diagonale."
        }
      }
    }
  },
  es: {
    // ... existing Spanish translations ...
    rules: {
      // ... existing rules ...
      qawale: {
        game_title: "Reglas del Qawale",
        description: "Qawale es un juego de mesa estratégico donde los jugadores apilan y distribuyen piedras de colores en un tablero de 4x4. El objetivo es crear una línea de cuatro piedras de tu color.",
        setup: {
          title: "Preparación",
          point1: "El juego se juega en un tablero de 4x4.",
          point2: "Cada jugador comienza con 8 piedras de su color (azul o rojo).",
          point3: "Cada esquina del tablero comienza con 2 piedras amarillas."
        },
        gameplay: {
          title: "Desarrollo del juego",
          point1: "Los jugadores se turnan para colocar una piedra o distribuir una pila.",
          point2: "Al colocar una piedra, esta va al fondo de la pila elegida.",
          point3: "Al distribuir una pila, las piedras se mueven en línea recta, colocando cada piedra debajo de las piedras existentes.",
          point4: "La distribución debe usar tantas piedras como espacios se muevan."
        },
        endgame: {
          title: "Fin del juego",
          point1: "Un jugador gana formando una línea de cuatro piedras de su color en el fondo de las pilas.",
          point2: "La línea puede ser horizontal, vertical o diagonal."
        }
      }
    }
  }
};

const i18n = createI18n({
  locale: "de", // Default language
  fallbackLocale: "en", // Fallback language
  messages,
});

export default i18n;