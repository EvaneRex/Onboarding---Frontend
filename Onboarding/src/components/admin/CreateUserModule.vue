<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close'])

const email = ref('')
const username = ref('')
const surveyId = 'indsæt_surveyId_her' // Hent dette dynamisk hvis nødvendigt

async function opretKlient() {
  await fetch(`http://localhost:2000/register/create-new-client-account/${surveyId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username: username.value, email: email.value }),
  })
}

async function opretAdmin() {
  await fetch('http://localhost:2000/register/create-new-admin-account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username: username.value, email: email.value }),
  })
}
</script>

<template>
  <dialog ref="dialogRef">
    <button class="close-btn" @click="emit('close')" aria-label="Luk">
      <img :src="closeIcon" alt="luk modal" />
    </button>
    <section>
      <h1>Opret en ny bruger</h1>
      <div class="createUserBox">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" />

        <label for="username">Brugernavn</label>
        <input id="username" v-model="username" type="text" />

        <button @click="opretKlient" type="button">Opret klient</button>
        <button @click="opretAdmin" type="button">Opret admin</button>
      </div>
    </section>
  </dialog>
</template>
