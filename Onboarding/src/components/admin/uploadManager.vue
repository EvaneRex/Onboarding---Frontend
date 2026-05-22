<script setup>
import UploadFile from './uploadFile.vue'
import UploadVideo from './uploadVideo.vue'
import UploadSurvey from './uploadSurvey.vue'
import { ref } from 'vue'
import x from '@/assets/icon/x-solid-full.svg'

const activeTab = ref('pdf')
const emit = defineEmits(['close'])
</script>
<template>
  <dialog>
    <button class="close-btn" @click="emit('close')" aria-label="Luk">
      <img :src="x" alt="Luk" />
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
