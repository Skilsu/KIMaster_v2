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
  </main>
</template>
<script>
import { useRouter } from 'vue-router';
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["gameActive", "connectionLost", "isDarkMode"]),
    isPlayPage() {
      return this.$route.name === "play";
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
    }
  }
};
</script>

<style scoped>
.dark-mode {
  background-color: #121212;
  color: #ffffff;
}
</style>
