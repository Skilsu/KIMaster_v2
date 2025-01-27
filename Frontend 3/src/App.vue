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
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      selectedBackground: "background-gray", // Standardhintergrund
    };
  },
  computed: {
    ...mapGetters(["gameActive", "connectionLost", "isDarkMode"]),
    isPlayPage() {
      return this.$route.name === "play";
    }
  },
  methods: {
    changeBackground(backgroundClass) {
      this.selectedBackground = backgroundClass;
    },
    connectWebSocket() {
      this.$store.dispatch("initWebSocket");
    },
  },
  mounted() {
    // Initialisiere WebSocket und Spracheinstellungen
    this.$store.dispatch("initWebSocket");
    const savedLanguage = localStorage.getItem("locale");
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage;
    }
  },
};
</script>
  
</script>

< scoped>
.dark-mode {
  background-color: #121212;
  color: #ffffff;
  .background-gray {
  background-color: #cccccc;
  color: #000000;
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

.dark-mode .background-red {
  background-color: #8b0000;
  color: #e0e0e0;
}

.dark-mode .background-green {
  background-color: #006400;
  color: #000000 !important;
}

.dark-mode .background-blue {
  background-color: #00008b;
  color: #e0e0e0;
}
  
}
</style>
