<template>
  <header>
    <nav-bar></nav-bar>
  </header>
  <main>
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
         
          <option v-for="audio in audioFiles" :key="audio.name" :value="audio">
            {{ audio.name }}
          </option>
        </select>
        <button class="floating-button" @click="toggleAudio" :disabled="!selectedAudio">
          {{ isPlaying ? '⏸️' : '▶️' }}
        </button>
      </div>
  </main>
</template>
<script>
import { useRouter } from 'vue-router';
import { mapGetters } from "vuex";
import NavBar from "@/components/layout/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters(["gameActive", "connectionLost", "isDarkMode"]),
    isPlayPage() {
      return this.$route.name === "play";
    }
  },
  data() {
    return {
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
      this.$root.$emit("show-rules");
    },
    handleAudioChange() {
      if (this.audio) {
        this.audio.pause();
        this.isPlaying = false;
      }
      if (this.selectedAudio) {
        this.audio = new Audio(this.selectedAudio.url);
        this.audio.addEventListener("ended", () => {this.isPlaying = false;});
        this.isPlaying = false;
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
    const savedAudio = localStorage.getItem("selectedAudio");
    if (savedAudio) {
      this.selectedAudio = JSON.parse(savedAudio); 
    } else if (this.audioFiles.length > 0) {
      this.selectedAudio = this.audioFiles[0]; // Set first item as default
    }

    
    if (this.selectedAudio) {
      this.audio = new Audio(this.selectedAudio.url);
      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
      });
    }
  },
};
</script>

<style scoped>
.dark-mode {
  background-color: #121212;
  color: #ffffff;
}
.floating-button {
  position: fixed;
  bottom: 90px;
  right: 20px;
  background-color: #ffa800;
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

</style>
