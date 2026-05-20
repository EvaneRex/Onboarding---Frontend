<script setup>
import { ref } from 'vue'
import { getUser } from './services/authService'
import axios from 'axios'

const email = ref('')
const adgangskode = ref('')
const error = ref('')
const user = ref(null)

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: adgangskode.value,
    })

    const data = res.data

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
  <h1>Login</h1>
  <form method="post" @submit.prevent="login">
    <label for="email">Email</label>
    <input type="email" v-model="email" required />

    <label for="adgangskode">Adgangskode</label>
    <input type="password" v-model="adgangskode" required />

    <p v-if="err">{{ err }}</p>
    <button type="submit">Login</button>
  </form>
</template>
