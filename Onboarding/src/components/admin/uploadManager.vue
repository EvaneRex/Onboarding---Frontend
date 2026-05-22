<!--
Denne komponent har faste elementer men har en sektion som skifter mellem tre underkomponenter.
Disse er :
- uploadSurvey
- uploadVideo
- uploadFile
-->
<script setup>
import UploadFile from './uploadFile.vue'
import UploadVideo from './uploadVideo.vue'
import UploadSurvey from './uploadSurvey.vue'
import { ref, onMounted } from 'vue'
import closeIcon from '@/assets/icon/x-solid-full.svg'

const activeTab = ref('pdf')
const emit = defineEmits(['close'])

const dialogRef = ref(null)

onMounted(() => {
  if (dialogRef.value) {
    dialogRef.value.showModal()
  }
})
</script>
<template>
  <dialog ref="dialogRef">
    <button class="close-btn" @click="emit('close')" aria-label="Luk">
      <img :src="closeIcon" alt="luk modal" />
    </button>
    <div class="modal">
      <h1>Upload materialer</h1>
      <p>
        Her kan du uploade PDF’er og links til youtube videoer, som gemmes i databasen samt uploade
        et nyt spørgeskema.
        <em>OBS Når der uploades et nyt spørgeskema erstatter det det gamle.</em>
      </p>
      <div class="uploadbox">
        <button @click="activeTab = 'pdf'">PDF upload</button>
        <button @click="activeTab = 'video'">Youtube link</button>
        <button @click="activeTab = 'survey'">Upload spørgeskema</button>

        <UploadFile v-if="activeTab === 'pdf'" />
        <UploadVideo v-else-if="activeTab === 'video'" />
        <UploadSurvey v-else-if="activeTab === 'survey'" />
      </div>
    </div>
  </dialog>
</template>
