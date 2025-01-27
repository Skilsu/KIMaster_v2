 <template>
  <nav :class="['navbar-expand-lg', 'bg-body-tertiary', currentBackground, 'nav-bar']">
    <div class="container-fluid">
      <nav>
    <button @click="$emit('change-bg', 'background-gray')">Grau</button>
    <button @click="$emit('change-bg', 'background-yellow')">Gelb</button>
    <button @click="$emit('change-bg', 'background-red')">Rot</button>
    <button @click="$emit('change-bg', 'background-green')">Grün</button>
    <button @click="$emit('change-bg', 'background-blue')">Blau</button>
  </nav>
      <router-link class="navbar-brand" @click="leaveLobby()" :to="{ name: 'home' }">
        <img :src="logo" alt="KI Master Logo" class="logo" />
      </router-link>
      <div class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isStartingPage">
            <router-link class="nav-link" :to="{ name: 'instruction' }">{{
              $t("message.instruction")
            }}</router-link>
          </li>
        </ul>
      </div>
      <div class="top-right-controls">
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" />
          <span class="slider round"></span>
        </label>
        <language-switcher class="me-2"></language-switcher>
      </div>
    </div>
  </nav>
</template>

<script>

import logo from "@/components/icons/logo.png";
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
  data() {
    return {
      currentBackground: "background-default", // Standardhintergrund
    };
  },
  computed: {
    isStartingPage() {
      return this.$route.name === "home";
    },
  },
  watch: {
    '$route.name'(newRoute) {
      if (newRoute === 'home') {
        this.currentBackground = 'background-default';
      } else if (newRoute === 'instruction') {
        this.currentBackground = 'background-gradient';
      } else if (newRoute === 'play') {
        this.currentBackground = 'background-2';
      }
    },
  },
};
</script>


< scoped>
.background-default {
  background: linear-gradient(to right, #ffffff, #e6e6e6);
}

.background-1 {
  background: url('/path/to/image1.jpg') no-repeat center center;
  background-size: cover;
}

.background-2 {
  background: url('/path/to/image2.jpg') no-repeat center center;
  background-size: cover;
}

.background-gradient {
  background: linear-gradient(to bottom, #ff7e5f, #feb47b);
}

  .switch {
    margin-right: 3px;
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

@media (max-width: 768px) {
  .dark-mode .navbar-collapse {
    background-color: #1e1e1e;
  }

  .me-2 {
    margin-right: 0px !important;
    padding: 0px;
  }
}
</style>
