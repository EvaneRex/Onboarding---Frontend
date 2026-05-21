<script setup>
import { ref } from 'vue'
import { getUser, login as loginService } from './services/authService'

const email = ref('')
const adgangskode = ref('')
const error = ref('')
const user = ref(null)

const login = async () => {
  try {
    const data = await loginService(email.value, adgangskode.value)

    if (data.success) {
      const userData = await getUser()

      if (userData.success) {
        user.value = userData
      }
    } else {
      error.value = data.message
    }
  } catch (err) {
    error.value = 'Fejl ved login'
  }
}
</script>

<template>
  <main class="login">
    <div class="login-wrapper">
      <h1>Login</h1>
      <form method="post" @submit.prevent="login">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" required />

        <label for="adgangskode">Adgangskode</label>
        <input id="adgangskode" type="password" v-model="adgangskode" required />

        <p v-if="error">{{ error }}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  </main>
</template>
