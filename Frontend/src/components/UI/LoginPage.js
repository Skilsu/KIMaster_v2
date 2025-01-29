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
          this.$router.push({ name: "home" }).then(()=>window.location.reload());
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
         * Ruft Benutzerinformationen vom Server ab.
         * @param {string} field - Das gewünschte Feld (z. B. 'fullname', 'email').
         * @returns {Object|null} - Das Ergebnis der API-Anfrage oder null bei Fehlern.
         */
    async getUserInformation(field = "email") {
      const VUE_APP_API_URL = "http://localhost:8010";
      const sessionKey = localStorage.getItem("authToken");

      if (!sessionKey) {
        console.warn("No session key found in local storage.");
        return null;
      }

      try {
        const response = await axios.get(`${VUE_APP_API_URL}/auth/getUserInformation`, {
          params: {
            sessionKey: sessionKey,
            field: field,
          },
        });

        if (response.data && response.data.message === "User is authenticated") {
          return response.data; // Gibt das abgerufene Objekt zurück
        } else {
          console.warn("User not authenticated:", response.data);
          return null;
        }
      } catch (error) {
        console.error("Failed to get user information:", error.response?.data || error.message);
        return null;
      }
    },

    /**
     * Speichert das Authentifizierungs-Token (z. B. im LocalStorage).
     * Ruft außerdem die Benutzerdaten ab und speichert sie im LocalStorage.
     * @param {string} token - Das Authentifizierungs-Token
     */
    async saveAuthToken(token) {
      try {
        // Speichere das Token im LocalStorage
        localStorage.setItem("authToken", token);

        // Rufe Benutzerdaten ab
        const fullnameResponse = await this.getUserInformation("fullname");
        const emailResponse = await this.getUserInformation("email");

        // Prüfe, ob die Antworten gültig sind, bevor du sie speicherst
        if (fullnameResponse && fullnameResponse.fullname) {
          localStorage.setItem("fullname", fullnameResponse.fullname);
        } else {
          console.warn("Failed to retrieve fullname.");
        }

        if (emailResponse && emailResponse.email) {
          localStorage.setItem("email", emailResponse.email);
        } else {
          console.warn("Failed to retrieve email.");
        }
      } catch (error) {
        console.error("Failed to save user information:", error);
      }
    },

    /**
     * Überprüft, ob der Benutzer bereits eingeloggt ist.
     * Wenn ja, wird er zur Startseite weitergeleitet.
     */
    checkAlreadyLoggedIn(forward=false) {
      const token = localStorage.getItem("authToken");
      if (token && forward) {
        this.$router.push({ name: "home" });
      }
      return token != null;
    }

  },
  created() {
    // Prüft beim Laden der Seite, ob der Benutzer bereits eingeloggt ist
    this.checkAlreadyLoggedIn();
  },
};