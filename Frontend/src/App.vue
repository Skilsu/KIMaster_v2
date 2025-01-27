<template>
  <div :class="selectedBackground" :style="dynamicStyles">
    <header>
      <nav-bar  @change-bg="changeBackground"></nav-bar>
    </header>
    <main :class="selectedBackground">
      <RouterView v-if="connectionLost===false"/>
      <div v-else>
        <teleport to="body"><base-dialog  :title="'Connection Lost'">
          <template #default>
            {{$t('message.connection_not_possible')}}:
          </template>
          <template #actions>
            <base-button @click="connectWebSocket">Try Reconnecting</base-button>
          </template></base-dialog> </teleport></div>
      <dragable-image v-if="gameActive && !isPlayPage"></dragable-image>

      <div>
        <select class="floating-select" v-model="selectedAudio" @change="handleAudioChange">
          <option disabled value="">Wählen Sie eine Musik aus</option>
          <option v-for="audio in audioFiles" :key="audio.name" :value="audio">
            {{ audio.name }}
          </option>
        </select>
        <button class="floating-button" @click="toggleAudio" :disabled="!selectedAudio">
          {{ isPlaying ? '⏸️' : '▶️' }}
        </button>
      </div>
    </main>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { mapGetters } from "vuex";
import NavBar from "@/components/layout/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      selectedBackground: "background-gray", 
      colorSchemes: {
        'background-dark': {
          primary: '#333333',
          secondary: '#a0a0a0',
          accent: '#808080',
          text: '#ffffff',
          link: '#404040',
          hover: '#666666',
          border: '#fff',
          shadow: 'rgba(0, 0, 0, 0.1)'
        },
        'background-gray': {
          primary: '#cccccc',
          secondary: '#a0a0a0',
          accent: '#808080',
          text: '#000000',
          link: '#404040',
          hover: '#666666',
          border: '#b3b3b3',
          shadow: 'rgba(0, 0, 0, 0.1)'
        },
        'background-yellow': {
          primary: '#ffeb3b',
          secondary: '#fdd835',
          accent: '#fbc02d',
          text: '#000000',
          link: '#f57f17',
          hover: '#f9a825',
          border: '#ffd600',
          shadow: 'rgba(251, 192, 45, 0.1)'
        },
        'background-red': {
          primary: '#f44336',
          secondary: '#e53935',
          accent: '#d32f2f',
          text: '#000000',
          link: '#ffcdd2',
          hover: '#ef5350',
          border: '#ef9a9a',
          shadow: 'rgba(244, 67, 54, 0.1)'
        },
        'background-green': {
          primary: '#4caf50',
          secondary: '#43a047',
          accent: '#388e3c',
          text: '#000000',
          link: '#c8e6c9',
          hover: '#66bb6a',
          border: '#a5d6a7',
          shadow: 'rgba(76, 175, 80, 0.1)'
        },
        'background-blue': {
          primary: '#2196f3',
          secondary: '#1e88e5',
          accent: '#1976d2',
          text: '#000000',
          link: '#bbdefb',
          hover: '#42a5f5',
          border: '#90caf9',
          shadow: 'rgba(33, 150, 243, 0.1)'
        }
      },
      audioFiles: [
        { name: "Musik 1", url: "/audios/audio1.mp3" },
        { name: "Musik 2", url: "/audios/audio2.mp3" },
        { name: "Musik 3", url: "/audios/audio3.mp3" },
      ],
      selectedAudio: null, // Musique sélectionnée
      audio: null, // Instance Audio
      isPlaying: false, // État de lecture
    };
  },
  computed: {
    ...mapGetters(["gameActive", "connectionLost", "isDarkMode"]),
    isPlayPage() {
      return this.$route.name === "play";
    },

    currentColorScheme() {
      return this.colorSchemes[this.selectedBackground];
    },

    dynamicStyles() {
      const colors = this.currentColorScheme;
      return {
        '--primary-color': colors.primary,
        '--secondary-color': colors.secondary,
        '--accent-color': colors.accent,
        '--text-color': colors.text,
        '--link-color': colors.link,
        '--hover-color': colors.hover,
        '--border-color': colors.border,
        '--shadow-color': colors.shadow,

        // Apply CSS variables to common elements
        color: 'var(--text-color)',
        backgroundColor: 'var(--primary-color)',
        '--button-bg': 'var(--secondary-color)',
        '--button-text': 'var(--text-color)',
        '--button-hover': 'var(--hover-color)',
        '--input-border': 'var(--border-color)',
        '--card-shadow': '0 2px 4px var(--shadow-color)',
        '--link-text': 'var(--link-color)',
        '--border': '1px solid var(--border-color)'
      };
    }
  },
  watch: {
    isDarkMode(newVal) {
      this.updateDarkModeClass(newVal);
      localStorage.setItem("dark-mode", newVal);
    }
  },
  created() {

    const darkModePreference = localStorage.getItem("dark-mode");

    if (darkModePreference === "true") {
      if (!this.isDarkMode) {
        this.$store.commit("SET_DARK_MODE", true);
      }
      this.updateDarkModeClass(true);
    } else if (darkModePreference === "false") {
      if (this.isDarkMode) {
        this.$store.commit("SET_DARK_MODE", false);
      }
      this.updateDarkModeClass(false);
    } else {

      localStorage.setItem("dark-mode", this.isDarkMode);
      this.updateDarkModeClass(this.isDarkMode);
    }

    // Initialize WebSocket and language settings
    this.$store.dispatch("initWebSocket");
    const savedLanguage = localStorage.getItem("locale");
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage;
    }
  },
  methods: {
    changeBackground(backgroundClass) {
      this.selectedBackground = backgroundClass;
    },
    updateDarkModeClass(isDarkMode) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
    },
    connectWebSocket() {
      this.$router.push({ name: "home" });
      this.$store.dispatch("initWebSocket");
    },
    showRules() {
      this.$root.$emit('show-rules');
    },
    handleAudioChange() {
      if (this.audio) {
        this.audio.pause();
        this.isPlaying = false;
      }
      if (this.selectedAudio) {
        this.audio = new Audio(this.selectedAudio.url);
        this.audio.addEventListener("ended", () => {
          this.isPlaying = false;
        });
      }
    },
    toggleAudio() {
      if (!this.audio) return;

      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
      } else {
        this.audio.play();
        this.isPlaying = true;
      }
    },
  },
  mounted() {
    // Initialisiere WebSocket und Spracheinstellungen
    this.$store.dispatch("initWebSocket");
    const savedLanguage = localStorage.getItem("locale");
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage;
    }

    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
      this.selectedBackground = savedBackground;
    }
  },
};
</script>


<style scoped>

:root {
  --primary-color: #cccccc;
  --secondary-color: #a0a0a0;
  --accent-color: #808080;
  --text-color: #000000;
  --link-color: #404040;
  --hover-color: #666666;
  --border-color: #b3b3b3;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

.background-gray,
.background-dark,
.background-yellow,
.background-red,
.background-green,
.background-blue {
  transition: all 0.3s ease;
}

/*header {
  top: 0;
  background-color: var(--primary-color);
  border-bottom: var(--border);
}*/


.dark-mode {
  background-color: #121212;
  color: #ffffff;
  .background-gray {
  background-color: #cccccc;
  color: #000000;
}

.background-dark {
  background-color:#000000;
}

.background-yellow {
  background-color: #ffeb3b;
  color: #000000;
}

.background-red {
  background-color: #f44336;
  color: #000000;
}

.background-green {
  background-color: #4caf50;
  color: #000000 !important;
}

.background-blue {
  background-color: #2196f3;
  color: #000000;
}

/* Dark Mode */
.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

.dark-mode .background-gray {
  background-color: #3c3c3c;
  color: #e0e0e0;
}

.dark-mode .background-yellow {
  background-color: #8b8000;
  color: #e0e0e0;
}

.dark-mode footer{
  color: #00008b;
}



.dark-mode .background-red {
  background-color: #8b0000;
  color: #e0e0e0;
}

.dark-mode .background-green {
  background-color: #006400;
  color: #000000;
}

.dark-mode .background-blue {
  background-color: #00008b;
  color: #e0e0e0;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.floating-button:hover {
  background-color: #3700b3;
}

select {
  margin: 10px;
  padding: 5px;
  font-size: 16px;
}

}
</style>
