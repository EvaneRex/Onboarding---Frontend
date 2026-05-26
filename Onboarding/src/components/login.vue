<script setup>
import { onMounted, ref } from 'vue'
const emit = defineEmits(['login-success'])
const error = ref('')
const brugernavn = ref('')
const adgangskode = ref('')
const rememberMe = ref(false)

onMounted(() => {
  rememberMe.value = localStorage.getItem('rememberMe') === 'true'
  if (rememberMe.value) {
    brugernavn.value = localStorage.getItem('rememberedUsername') || ''
  }
})

async function getCsrfToken() {
  const response = await fetch('http://localhost:2000/csrf', {
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Could not get CSRF token.')
  }
  return data.csrfToken
}

const login = async () => {
  try {
    const csrfToken = await getCsrfToken()
    const res = await fetch('http://localhost:2000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        username: brugernavn.value,
        password: adgangskode.value,
      }),
    })
    const data = await res.json()

    // console.log('Login response:', data)

    if (data.success) {
      const user = {
        id: data.id,
        role: data.role,
        email: data.email,
        username: data.username,
        registrationCompleted: data.registrationCompleted,
        registrationTokenHash: data.registrationTokenHash,
        registrationTokenExpiresAt: data.registrationTokenExpiresAt,
        registrationTokenUsedAt: data.registrationTokenUsedAt,
      }
      if (rememberMe.value) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('rememberedUsername', brugernavn.value)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('rememberedUsername')
      }
      emit('login-success', user)
    } else {
      error.value = data.message || 'Forkert brugernavn eller adgangskode'
      adgangskode.value = ''
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
        <label for="brugernavn">Brugernavn</label>
        <input id="brugernavn" type="text" v-model="brugernavn" required />

        <label for="adgangskode">Adgangskode</label>
        <input id="adgangskode" type="password" v-model="adgangskode" required />

        <label>
          <input type="checkbox" v-model="rememberMe" />
          Husk mig
        </label>

        <p v-if="error">{{ error }}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  </main>
</template>
