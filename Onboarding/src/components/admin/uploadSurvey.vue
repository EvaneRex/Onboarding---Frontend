<!--
Dette er en komponent som håndtere upload spørgeskemaet, fra serverside erstatter den spørgeskemaet der allerede ligger på serveren.
Dens forældre komponent er uploadManager.vue
-->

<script setup>
import { ref } from 'vue'

const filInput = ref(null)

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
    },
    body: JSON.stringify(jsonParsed),
  })

  const data = await res.json()
  console.log(data)
}
</script>

<template>
  <form @submit.prevent="uploadNewSurvey">
    <label for="surveyInput">Vælg JSON fil:</label>
    <input id="surveyInput" ref="filInput" type="file" accept="application/json" required />
    <button type="submit">Upload spørgeskema</button>
  </form>
</template>
