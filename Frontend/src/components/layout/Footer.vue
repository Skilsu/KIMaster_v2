<template>
  <footer>
    <!-- External link to the THM website -->
    <a href="https://www.thm.de">THM</a>



    <!-- Router link to the 'about' page -->
    <RouterLink :to="{ name: 'about' }">{{ $t('footer.datenschutz') }}</RouterLink>

    <!-- External link to the Impressum page -->
    <a href="https://www.thm.de/site/impressum.html">{{ $t('footer.impressum') }}</a>

    <!-- Logout button, only visible if the user is logged in -->
    <button v-if="isLoggedIn" @click="logout">{{ $t('footer.logout') }}</button>
    <button v-if="!isLoggedIn" @click="goToLogin">{{ $t('footer.login') }}</button>
  </footer>
</template>

<script>
/**
 * Footer component that includes links for navigation and external sites.
 * 
 * @component
 */
export default {
  name: 'Footer',
  data() {
    return {
      isLoggedIn: false, // Status, ob der Benutzer eingeloggt ist
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' }); // 'login' sollte der Name deiner Route sein
    },
    /**
     * Meldet den Benutzer ab.
     * Entfernt das Authentifizierungs-Token und leitet zur Login-Seite um.
     */
    logout() {
      // Entfernt das Authentifizierungs-Token aus dem LocalStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("fullname");
      localStorage.removeItem("email");

      this.isLoggedIn = false;

      // Leitet den Benutzer zur Login-Seite um
      this.$router.push({ name: "login" }).then(()=>document.getElementById("fullname").innerHTML="");
      // this.$router.push({ name: "home" }).then(()=>window.location.reload());

      // Aktualisiert den Login-Status
      
    },
    /**
     * Überprüft, ob der Benutzer eingeloggt ist.
     */
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem("authToken");
    },
  },
  created() {
    // Überprüft den Login-Status beim Laden des Footers
    this.checkLoginStatus();
  },
};
</script>

<style scoped>
/* Styles for the footer element */
footer {
  width: 100%; /* Full width of the container */
  bottom: 0; /* Fixed at the bottom of the viewport */
  display: flex; /* Flexbox layout for the footer */
  justify-content: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
  padding: 10px; /* Padding inside the footer */
  background-color: #f8f9fa; /* Light background color */
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
}

/* Styles for anchor tags within the footer */
footer a {
  color: green; /* Text color for links */
  text-decoration: none; /* No underline for links */
  margin-left: 30px; /* Space between links */
}

/* Styles for anchor tags on hover */
footer a:hover {
  color: #007bff; /* Text color on hover */
}

/* Styles for the logout button */
footer button {
  margin-left: 30px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

/* Styles for the logout button on hover */
footer button:hover {
  background-color: darkred;
}
</style>
