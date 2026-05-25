<!--
Dette er komponenten der styrer upload af PDF'filer, de kan uploade en eller flere.
Forældrekomponenten er uploadManager.vue
-->
<script setup>
import { ref } from 'vue'

const filInput = ref(null)

async function uploadPdfFiler() {
  const filer = filInput.value.files
  const formData = new FormData()

  for (let i = 0; i < filer.length; i++) {
    formData.append('files', filer[i])
  }

  try {
    const API_URL = 'http://localhost:2000'
    const res = await fetch(`${API_URL}/onboarding/pdf-slides`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      return console.error(data)
    }

    console.log(data)
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
