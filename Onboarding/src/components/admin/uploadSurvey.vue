<!--
Dette er en komponent som håndtere upload spørgeskemaet, fra serverside erstatter den spørgeskemaet der allerede ligger på serveren.
Dens forældre komponent er uploadManager.vue
-->

<script setup>
import { ref } from 'vue'

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

async function uploadNewSurvey() {
  const input = filInput.value
  const surveyFile = input.files[0]
  if (!surveyFile) return

  const fileText = await surveyFile.text()
  let jsonParsed
  try {
    jsonParsed = JSON.parse(fileText)
    if (!Array.isArray(jsonParsed) || !jsonParsed.every((q) => typeof q === 'string')) {
      alert('Filen er et ugyldigt format')
      return
    }
  } catch {
    alert('Ugyldig JSON-fil.')
    return
  }


  const res = await fetch('http://localhost:2000/survey/new-survey', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(jsonParsed),
  })

  const data = await res.json()
  console.log(data)
}
</script>

<template>
  <form class="uploadSurvey" @submit.prevent="uploadNewSurvey">
    <label for="surveyInput">Vælg JSON fil:</label>
    <input id="surveyInput" ref="filInput" type="file" accept="application/json" required />
    <button type="submit">Upload</button>
  </form>
</template>
