<!--
Dette er komponenten der styrer upload af PDF'filer, de kan uploade en eller flere.
Forældrekomponenten er uploadManager.vue
-->
<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['uploaded'])

const filInput = ref(null)
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

async function uploadPdfFiler() {
  const filer = filInput.value.files
  const formData = new FormData()

  for (let i = 0; i < filer.length; i++) {
    formData.append('files', filer[i])
  }

  try {
    const csrfToken = await getCsrfToken()
    const res = await fetch(`http://localhost:2000/onboarding/pdf-slides`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'x-csrf-token': csrfToken,
      },
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      return console.error(data)
    }

    console.log(data)
    alert('Filen/filerne er uploadet')
    emit('uploaded')
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="uploadPdfFiler" class="uploadFile">
    <label for="input">Vælg PDF-fil(er):</label>
    <input id="input" ref="filInput" type="file" accept="application/pdf" multiple required />
    <button type="submit">Upload</button>
  </form>
</template>
