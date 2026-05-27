<!--
Dette er en komponent som håndtere upload af youtube links, både enkeltvis men også flere ad gangen. 
Dens forældre komponent er uploadManager.vue
-->
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['uploaded'])

const links = ref([{ titel: '', url: '' }])

function tilføjLink() {
  links.value.push({ titel: '', url: '' })
}

function fjernLink(index) {
  if (links.value.length > 1) {
    links.value.splice(index, 1)
  }
}

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

async function uploadVideo() {
  if (links.value.some((link) => !link.titel || !link.url)) {
    alert('Udfyld alle felter')
    return
  }

  try {
    const csrfToken = await getCsrfToken()
    const res = await fetch(`http://localhost:2000/onboarding/youtube-links`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify(links.value),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || 'Noget gik galt.')
      return
    }

    alert('Linket/linksene er uploadet')
    emit('uploaded')
    links.value = [{ titel: '', url: '' }]
  } catch (err) {
    alert('Der opstod en fejl.')
    console.error(err)
  }
}
</script>

<template>
  <form class="uploadVideo" @submit.prevent="uploadVideo">
    <div class="formGruppe" v-for="(link, idx) in links" :key="idx">
      <label>
        Titel:
        <input v-model="link.titel" type="text" required />
      </label>
      <label>
        YouTube-link:
        <input v-model="link.url" type="url" required />
      </label>
      <button class="trash" @click="fjernLink(idx)" v-if="links.length > 1">
        <img src="@/assets/icon/trash-solid-full.svg" />
      </button>
    </div>
    <div class="formGruppe">
      <button class="addMore" type="button" @click="tilføjLink">Tilføj flere</button>
    </div>
    <button class="submitLink" type="submit">Upload video links</button>
  </form>
</template>
