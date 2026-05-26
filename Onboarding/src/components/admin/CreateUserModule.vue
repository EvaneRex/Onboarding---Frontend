<!--
Denne er ansvarligt for at oprette nye brugere, alt efter hvilken knap man trykker på, bliver de enten oprettet som admin eller klient. 
-->

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const emit = defineEmits(['close'])

const dialogRef = ref(null)
const email = ref('')
const name = ref('')
const surveyId = ref('')

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

onMounted(async () => {
  const res = await fetch('http://localhost:2000/survey/survey-questions', {
    credentials: 'include',
  })
  const data = await res.json()
  surveyId.value = data.id
})

onMounted(() => {
  dialogRef.value?.showModal()
})
onBeforeUnmount(() => {
  dialogRef.value?.close()
})
// fjern surveyid
async function opretKlient() {
  const token = await getCsrfToken()
  await fetch('http://localhost:2000/register/create-new-client-account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-csrf-token': token },
    credentials: 'include',
    body: JSON.stringify({ name: name.value, email: email.value }),
  })
}

async function opretAdmin() {
  const token = await getCsrfToken()
  await fetch('http://localhost:2000/register/create-new-admin-account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-csrf-token': token },
    credentials: 'include',
    body: JSON.stringify({ name: name.value, email: email.value }),
  })
}
</script>

<template>
  <dialog ref="dialogRef" class="createUser">
    <button class="closeBtn" @click="emit('close')">x</button>
    <section>
      <h1>Opret en ny bruger</h1>
      <form class="createUserBox">
        <label for="name">Brugernavn</label>
        <input id="name" v-model="name" type="text" />

        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" />
        <div class="createBtn">
          <button @click="opretKlient" type="button">Opret klient</button>
          <button @click="opretAdmin" type="button">Opret admin</button>
        </div>
      </form>
    </section>
  </dialog>
</template>
