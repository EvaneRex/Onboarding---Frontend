<script setup>
import { getCsrfToken } from '@/components/services/csrfService'

const props = defineProps({
  logout: Function,
  user: Object,
})

async function handleLogout() {
  try {
    const csrfToken = await getCsrfToken()

    await fetch('http://localhost:2000/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'x-csrf-token': csrfToken,
      },
    })
  } finally {
    props.logout?.()
  }
}
</script>

<template>
  <header class="header">
    <img src="@/assets/icon/logo.svg" alt="Modulex logo" class="logo" />

    <p v-if="user" class="logout" @click="handleLogout">Log ud</p>
  </header>
</template>
