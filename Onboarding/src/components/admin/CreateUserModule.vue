<!--
Denne er ansvarligt for at oprette nye brugere, alt efter hvilken knap man trykker på, bliver de enten oprettet som admin eller klient. 
-->

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createNewClientAccount, createNewAdminAccount } from '@/components/services/authService'

const emit = defineEmits(['close'])

const props = defineProps({
  surveyData: {
    type: Object,
    default: null,
  },
})

const dialogRef = ref(null)
const email = ref('')
const name = ref('')

onMounted(() => {
  dialogRef.value?.showModal()

  if (props.surveyData) {
    name.value = props.surveyData.name || ''

    email.value = props.surveyData.email || ''
  }
})

onBeforeUnmount(() => {
  dialogRef.value?.close()
})

function closeModal() {
  dialogRef.value?.close()

  emit('close')
}

async function createNewClient() {
  try {
    const response = await createNewClientAccount({
      name: name.value,

      email: email.value,
    })

    console.log('CLIENT RESPONSE:', response)

    if (response.success) {
      alert('Client created!')

      closeModal()
    } else {
      alert(response.message || 'Could not create client')
    }
  } catch (error) {
    console.error(error)

    alert('Error creating client')
  }
}

// Opret admin
async function createNewAdmin() {
  try {
    const response = await createNewAdminAccount({
      name: name.value,

      email: email.value,
    })

    console.log('ADMIN RESPONSE:', response)

    if (response.success) {
      alert('Admin created!')

      closeModal()
    } else {
      alert(response.message || 'Could not create admin')
    }
  } catch (error) {
    console.error(error)

    alert('Error creating admin')
  }
}
</script>

<template>
  <dialog ref="dialogRef" class="createUser">
    <button class="closeBtn" @click="closeModal">✕</button>
    <section>
      <h1>Opret en ny bruger</h1>
      <form class="createUserBox">
        <label for="name">Brugernavn</label>
        <input id="name" v-model="name" type="text" />

        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" />
        <div class="createBtn">
          <button @click="createNewClient" type="button">Opret klient</button>
          <button @click="createNewAdmin" type="button">Opret admin</button>
        </div>
      </form>
    </section>
  </dialog>
</template>
