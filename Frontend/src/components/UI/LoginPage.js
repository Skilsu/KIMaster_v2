import BaseDialog from "@/components/UI/BaseDialog.vue";
import axios from "axios";
    const VUE_APP_API_URL="http://localhost:8010"
export default {
  components: {
    BaseDialog,
  },
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
      loginErrorMessage: "",
    };
  },
  methods: {


    
    /**
     * Registrierung eines neuen Benutzers.
     */
    async handleRegister() {
      if (this.email && this.password) {
        try {
          const response = await axios.post(
            VUE_APP_API_URL+"/auth/register",
            {
              email: this.email,
              password: this.password,
            }
          );
          console.log(response.data.message);
          alert("Registration successful!");
        } catch (error) {
          console.error(error.response?.data?.detail || error.message);
          this.loginErrorMessage = error.response?.data?.detail || "Registration failed!";
          this.loginError = true;
        }
      } else {
        this.loginErrorMessage = "Please fill in all fields.";
        this.loginError = true;
      }
    },

    /**
     * Anmeldung eines Benutzers.
     */
    async handleLogin() {
      if (this.email && this.password) {
        try {
          const response = await axios.post(
            VUE_APP_API_URL+"/auth/login",
            {
              email: this.email,
              password: this.password,
            }
          );
          console.log(response.data.message);
          this.saveAuthToken(response.data.sessionKey);
          this.$router.push({ name: "home" });
        } catch (error) {
          console.error(error.response?.data?.detail || error.message);
          this.loginErrorMessage = error.response?.data?.detail || "Login failed!";
          this.loginError = true;
        }
      } else {
        this.loginErrorMessage = "Please fill in all fields.";
        this.loginError = true;
      }
    },

    /**
     * Speichert das Authentifizierungs-Token (z. B. im LocalStorage).
     * @param {string} token - Das Authentifizierungs-Token
     */
    saveAuthToken(token) {
      localStorage.setItem("authToken", token);
    },

    /**
     * Überprüft, ob der Benutzer bereits eingeloggt ist.
     * Wenn ja, wird er zur Startseite weitergeleitet.
     */
    checkAlreadyLoggedIn() {
      const token = localStorage.getItem("authToken");
      if (token) {
        this.$router.push({ name: "home" });
      }
    },
  },
  created() {
    // Prüft beim Laden der Seite, ob der Benutzer bereits eingeloggt ist
    this.checkAlreadyLoggedIn();
  },
};