<!-- <script setup>
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
</template> -->

<script setup>
import { ref } from 'vue'

// emit
const emit = defineEmits(['login-success'])

const email = ref('')
const adgangskode = ref('')
const error = ref('')

const login = async () => {
  error.value = ''

  // FAKE LOGIN
  if (email.value === 'admin@test.dk') {
    emit('login-success', {
      name: 'Admin',
      role: 'admin'
    })

    return
  }

  if (email.value === 'client@test.dk') {
    emit('login-success', {
      name: 'Client',
      role: 'client'
    })

    return
  }

  error.value = 'Forkert login'
}
</script>

<template>
  <h1>Login</h1>

  <form @submit.prevent="login">
    <label>Email</label>
    <input
      type="email"
      v-model="email"
      required
    />

    <label>Adgangskode</label>
    <input
      type="password"
      v-model="adgangskode"
      required
    />

    <p v-if="error">
      {{ error }}
    </p>

    <button type="submit">
      Login
    </button>
  </form>
</template>
