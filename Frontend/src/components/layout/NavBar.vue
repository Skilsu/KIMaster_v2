<template>
  <nav :class="['navbar', currentBackground]">
    <div class="container-fluid">
      <div class="nav-left">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
          <img :src="logo" alt="KIM Logo" class="logo" />
        </router-link>
        <span class="nav-title">Anleitung</span>
        <router-link class="navbar-brand" :to="{ name: 'login' }">
          <img :src="logo" alt="KIM Logo" class="logo" />
        </router-link>
      </div>

      <div class="nav-right">
        <div class="color-select">
          <select @change="changeBackground($event.target.value)">
            <option
              v-for="color in colors"
              :key="color.name"
              :value="color.class"
            >
              {{ color.name }}
            </option>
          </select>
        </div>
        <language-switcher class="language-switcher"></language-switcher>
      </div>
    </div>
    <!-- Rules Dialog Component -->
    <teleport to="body">
      <base-dialog
        :title="$t('rules.game_title')"
        v-if="isRulesVisible"
        @close="closeRules"
      >
        <component :is="currentRuleComponent" />
        <template #actions>
          <base-button @click="closeRules">{{
            $t("message.okay")
          }}</base-button>
        </template>
      </base-dialog>
    </teleport>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useRoute } from "vue-router";
// Importing rule components for various games
import Connect4Rules from "@/components/gameRules/Connect4Rules.vue";
import NimRules from "@/components/gameRules/NimRules.vue";
import OthelloRules from "@/components/gameRules/OthelloRules.vue";
import TicTacToeRules from "@/components/gameRules/TicTacToeRules.vue";
import PlayPageLogic from "../UI/PlayPage.js";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import logo from "@/components/icons/logo.png"; // Import the logo image

/**
 * NavBar component that includes a Home Button and language selection Options
 * @module NavBar
 */

export default {
  components: {
    Connect4Rules,
    NimRules,
    OthelloRules,
    TicTacToeRules,
    LanguageSwitcher,
    BaseDialog,
  },
  mixins: [PlayPageLogic],
  data() {
    return {
      /** 
       * Current language of the application */
      currentLanguage: this.$i18n.locale,
      /** Whether the rules dialog is visible */
      isRulesVisible: false,
      /** - Component name to be displayed in the rules dialog */
      currentRuleComponent: null,
      currentBackground: "background-gray",
      /** - Path to the logo image */
      logo,
      colors: [
        { name: "Grau", class: "background-gray" },
        { name: "Dark", class: "background-dark" },
        { name: "Gelb", class: "background-yellow" },
        { name: "Rot", class: "background-red" },
        { name: "Grün", class: "background-green" },
        { name: "Blau", class: "background-blue" },
          ]
    };
  },
  computed: {
    /**
     * Checks if the current route is the starting page.
     * @returns {boolean} - True if on the starting page, otherwise false.
     * @method
     */
    isStartingPage() {
      return this.$route.name === "home";
    },
    /**
     * Checks if the current route is the play page.
     * @returns {boolean} - True if on the play page, otherwise false.
     */
    isPlayPage() {
      return this.$route.name === "play";
    },
    /**
     * Checks if the current route is the lobby page.
     * @returns {boolean} - True if on the lobby page, otherwise false.
     */
    isLobbyPage() {
      return this.$route.name === "lobby";
    },
    /**
     * Vuex getter for game active state.
     * @type {boolean}
     */
    ...mapGetters(["gameActive"]),
    ...mapGetters(["isDarkMode"]),
  },
  methods: {
    /**
     * Maps Vuex actions to the component.
     * @type {Function}
     */
    ...mapActions(["sendWebSocketMessage"]),

    /**
     * Sends a WebSocket message.
     * @param {Object} data - Data to be sent in the message.
     */
    sendMessage(data) {
      console.log(data);
      this.sendWebSocketMessage(JSON.stringify(data));
    },

    /**
     * Handles leaving the lobby based on the current route and game state.
     */
    leaveLobby() {
      if (
        this.$route.name === "lobby" ||
        this.$route.name === "wait" ||
        (this.$route.name === "play" && !this.gameActive) ||
        (this.$route.name === "instructions" && !this.gameActive) ||
        (this.$route.name === "impressum" && !this.gameActive) ||
        (this.$route.name === "about" && !this.gameActive)
      ) {
        const data = {
          command: "lobby",
          command_key: "leave",
        };
        this.sendMessage(data);
      }
    },

    /**
     * Toggles the application language.
     */
    changeLanguage() {
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "de";
        this.currentLanguage = "de";
      } else {
        this.$i18n.locale = "en";
        this.currentLanguage = "en";
      }
      this.$nextTick(() => {
        document.querySelector(".form-select").blur();
      });
    },

    /**
     * Shows the rules dialog based on the current game.
     */
    showRules() {
      if (this.game === "connect4") {
        this.currentRuleComponent = "Connect4Rules";
      } else if (this.game === "tictactoe") {
        this.currentRuleComponent = "TicTacToeRules";
      } else if (this.game === "nim") {
        this.currentRuleComponent = "NimRules";
      } else if (this.game === "othello") {
        this.currentRuleComponent = "OthelloRules";
      } else {
        this.currentRuleComponent = null;
      }
      this.isRulesVisible = true;
    },
    ...mapActions(["toggleDarkMode"]),
    /**
     * Closes the rules dialog.
     */
    closeRules() {
      this.isRulesVisible = false;
    },
    changeBackground(backgroundClass) {
      this.currentBackground = backgroundClass;
      this.$emit('change-bg', backgroundClass);
    },
  },
};
</script>

<style scoped>
.color-select select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #000;
  cursor: pointer;
  font-size: 1rem;
}

.color-select select:focus {
  outline: none;
  border-color: #2196f3;
}



.navbar {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-fluid {
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

/* Styles for the navbar brand (logo and text) */
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center; /* Ensures the logo is vertically centered */
}

/* Styles for navigation items */
.nav-item {
  margin-left: 10px;
}

.nav-link {
  padding-left: 12px;
}

/* Hover effect for navigation links */
.nav-link:hover {
  color: #007bff;
}

/* Styles for the collapsible navbar */
.navbar-collapse {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}

/* Styles for the top-right controls (toggle switch and language switcher) */
.top-right-controls {
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
}

/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Styles for the logo image */
.logo {
  width: auto;
  height: 30px; /* Adjust the height to fit within the navbar */
  max-height: 40px; /* Ensure it doesn't overflow the navbar */
  aspect-ratio: 2.31; /* Maintain the aspect ratio */
}
.nav-title {
  font-size: 1.2rem;
  font-weight: 500;
}

.color-buttons {
  display: flex;
  gap: 0.5rem;
}

.color-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.background-gray {
  background-color: #cccccc;
}

.color-btn.background-dark {
  background-color: #000000;
}

.color-btn.background-yellow {
  background-color: #ffeb3b;
}

.color-btn.background-red {
  background-color: #f44336;
}

.color-btn.background-green {
  background-color: #4caf50;
}

.color-btn.background-blue {
  background-color: #2196f3;
}

/* Background classes for the navbar */
.navbar.background-gray {
  background-color: #cccccc;
  color: #000000;
}

.navbar.background-yellow {
  background-color: #ffeb3b;
  color: #000000;
}

.navbar.background-red {
  background-color: #f44336;
  color: #000000;
}

.navbar.background-green {
  background-color: #4caf50;
  color: #000000;
}

.navbar.background-blue {
  background-color: #2196f3;
  color: #ffffff;
}

.language-switcher {
  margin-left: 1rem;
}

@media (max-width: 768px) {
  .nav-title {
    display: none;
  }

  .color-buttons {
    gap: 0.25rem;
  }

  .color-btn {
    width: 20px;
    height: 20px;
  }
}
.dark-mode .navbar-brand {
  color: #fff;
}

.dark-mode .navbar-brand:hover {
  color: #ddd;
}

.dark-mode .nav-link {
  color: #ccc;
}

.dark-mode .nav-link:hover {
  color: #00bfff;
}

.dark-mode .navbar-collapse {
  background-color: #1e1e1e;
}

.dark-mode .top-right-controls {
  color: #ccc;
}

.dark-mode .switch .slider {
  background-color: #444;
}

.dark-mode .switch input:checked + .slider {
  background-color: #00bfff;
}

.dark-mode .bg-body-tertiary {
  background-color: #1e1e1e !important;
}

.dark-mode .logo {
  filter: brightness(0.8);
}

/* Responsive adjustments for mobile view */
@media (max-width: 1100px) and (max-height: 1400px)  {
  .dark-mode .navbar-collapse {
    background-color: #1e1e1e;
  }
  .dark-mode.nav-link{
    background-color: #1e1e1e;
    color: #9dcc67;
  }
  .nav-link {
    font-family: 'Honk', sans-serif;
    font-size: 25px;
    font-weight: bolder;
    color: #98ca60;
    font-size: small;
  }
  .me-2 {
    margin-right: 0px !important;
    padding: 0px;
    font-family: 'Honk', sans-serif;

  }
}
</style>