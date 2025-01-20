<template>
  <nav :class="['navbar', currentBackground]">
    <div class="container-fluid">
      <div class="nav-left">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
          <img :src="logo" alt="KIM Logo" class="logo" />
        </router-link>
        <span class="nav-title">Anleitung</span>
      </div>
      
      <div class="nav-right">
        <div class="color-buttons">
          <button 
            v-for="color in colors" 
            :key="color.name"
            @click="changeBackground(color.class)"
            :class="['color-btn', color.class]"
            :title="color.name"
          ></button>
        </div>
        <language-switcher class="language-switcher"></language-switcher>
      </div>
    </div>
  </nav>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import logo from "@/components/icons/logo.png";

export default {
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      currentBackground: "background-gray",
      logo,
      colors: [
        { name: "Grau", class: "background-gray" },
        { name: "Dark", class: "background-dark" },
        { name: "Gelb", class: "background-yellow" },
        { name: "Rot", class: "background-red" },
        { name: "Grün", class: "background-green" },
        { name: "Blau", class: "background-blue" }
      ]
    };
  },
  methods: {
    changeBackground(backgroundClass) {
      this.currentBackground = backgroundClass;
      this.$emit('change-bg', backgroundClass);
    }
  }
};
</script>

<style scoped>
.navbar {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-fluid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  height: 40px;
  width: auto;
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
  color: #ffffff;
}

.navbar.background-green {
  background-color: #4caf50;
  color: #ffffff;
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
</style>