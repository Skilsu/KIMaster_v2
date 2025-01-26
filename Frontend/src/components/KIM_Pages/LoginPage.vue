<template>
  <section class="d-flex align-items-center justify-content-center">
    <div class="content-container">
      <div class="welcome-container">
        <base-card>
          <template #header>
            <h3>{{ $t('message.login.header') }}</h3>
          </template>
        </base-card>
      </div>
      <base-card>
        <div class="login-form-container">
          <form>
            <div class="form-group">
              <label for="email">{{ $t('message.login.email') }}</label>
              <input
                type="text"
                id="email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="password">{{ $t('message.login.password') }}</label>
              <input
                type="password"
                id="password"
                v-model="password"
              />
            </div>
            <div class="message-box" v-if="loginError" v-html="$t('message.login.failed')">
            </div>
            <div class="button-group">
              <!-- Anmelden -->
              <base-button @click.prevent="handleLogin">{{ $t('message.login.loginBtn') }}</base-button>
              
              <!-- Registrieren -->
              <base-button @click.prevent="handleRegister">{{ $t('message.login.registerBtn') }}</base-button>
            </div>
          </form>
        </div>
      </base-card>
    </div>
  </section>
  <footer-bar class="FooterStart"></footer-bar>
</template>



<script src="./src/components/UI/LoginPage.js"></script>
<style src="./src/components/UI/LoginPage.css"></style>
<style src="./src/components/UI/StartPage.css"></style>