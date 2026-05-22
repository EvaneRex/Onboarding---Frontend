<script setup>
import { ref } from 'vue'

const titel = ref('')
const url = ref('')

async function uploadVideo() {
  if (!titel.value || !url.value) {
    alert('Udfyld alle felter')
    return
  }

  try {
    const API_URL = 'http://localhost:2000'
    const res = await fetch(`${API_URL}/onboarding/youtube-links`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ titel: titel.value, url: url.value }]),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || 'Noget gik galt.')
      return
    }

    alert('YouTube-link uploadet!')
    titel.value = ''
    url.value = ''
  } catch (err) {
    alert('Der opstod en fejl.')
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="uploadVideo">
    <label>
      Titel:
      <input v-model="titel" type="text" required />
    </label>
    <label>
      YouTube-link:
      <input v-model="url" type="url" required />
    </label>
    <button type="submit">Upload video link</button>
  </form>
</template>
