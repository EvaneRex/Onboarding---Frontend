<script setup>
async function uploadNewSurvey() {
  const input = document.getElementById('surveyInput')
  const surveyFile = input.files[0]

  if (!surveyFile) return

  // Læs indholdet af JSON-filen som tekst i browseren
  const fileText = await surveyFile.text()

  // Lav teksten om til et rigtigt JavaScript-objekt
  const jsonParsed = JSON.parse(fileText)

  const res = await fetch('http://localhost:2000/survey/new-survey', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json', // Fortæl serveren, at der kommer JSON
    },
    body: JSON.stringify(jsonParsed), // Send det som en JSON-streng
  })

  const data = await res.json()
  console.log(data)
}
</script>
<template></template>
