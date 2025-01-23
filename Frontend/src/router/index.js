import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/KIM_Pages/StartPage.vue';
import Lobby from '@/components/KIM_Pages/LobbyPage.vue';
import Play from '@/components/KIM_Pages/PlayPage.vue';
import Impressum from '@/components/ImpressumView.vue';
import About from '@/components/KIM_Pages/AboutView.vue';
import Wait from '@/components/KIM_Pages/WaitPage.vue';
import Instructions from '@/components/KIM_Pages/InstructionsPage.vue';
import LoginPage from '@/components/KIM_Pages/LoginPage.vue';
import axios from "axios";

// Funktion, um Authentifizierungsstatus zu prüfen
async function isAuthenticated() {
  const VUE_APP_API_URL = "http://localhost:8010";
  const sessionKey = localStorage.getItem('authToken');
  if (!sessionKey) {
    return false; // Kein Token vorhanden
  }

  try {
    const response = await axios.get(VUE_APP_API_URL + "/auth/is_authenticated", {
      params: { sessionKey: sessionKey },
    });
    return response.data && response.data.message === 'User is authenticated';
  } catch (error) {
    console.error('Authentication check failed:', error.response?.data || error.message);
    return false;
  }
}




const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { authRequired: true },
  },
  {
    path: '/',
    name: 'lobby',
    component: Lobby,
    meta: { authRequired: true },
  },
  {
    path: '/',
    name: 'play',
    component: Play,
    meta: { authRequired: true },
  },
  {
    path: '/',
    name: 'impressum',
    component: Impressum,
  },
  {
    path: '/',
    name: 'about',
    component: About,
  },
  {
    path: '/',
    name: 'wait',
    component: Wait,
    meta: { authRequired: true },
  },
  {
    path: '/',
    name: 'instruction',
    component: Instructions,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Globaler Navigation Guard
router.beforeEach(async (to, from, next) => {
  // Überspringen der Authentifizierung für die Login-Seite
  const authenticated = await isAuthenticated();

  // if(authenticated){
  //   const fullnameResponse = await getUserInformation("fullname");
  //   const emailResponse = await getUserInformation("email");

  //   localStorage.setItem("fullname", fullnameResponse.fullname);
  //   localStorage.setItem("email", emailResponse.email);
  // }else {
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("fullname");
  // }

  if (to.name === 'login' && !authenticated) {
    return next();
  }

  if (to.name === 'login' && authenticated) {
    return next({ name: 'home' });
  }

  // Wenn die Route Authentifizierung erfordert
  // if (to.meta.authRequired) {
  //   if (!authenticated) {
  //     return next({ name: 'login' });
  //   }
  // }

  next(); // Erlaubt den Zugriff
});

export default router;
