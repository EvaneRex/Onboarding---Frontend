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

const activeTab = ref('pdf')
function closeModal() {
  dialogRef.value.close()
  emit('goBack')
}

const dialogRef = ref(null)

onMounted(() => {
  if (dialogRef.value) {
    dialogRef.value.showModal()
  }
})
</script>
<template>
  <dialog ref="dialogRef" class="upManager">
    <button class="closeBtn" @click="closeModal">✕</button>
    <div class="modal">
      <h1>Upload materialer</h1>
      <p>
        Her kan du uploade PDF’er og links til youtube videoer, som gemmes i databasen samt uploade
        et nyt spørgeskema.
        <em>OBS Når der uploades et nyt spørgeskema erstatter det det gamle.</em>
      </p>
      <div class="uploadbox">
        <div class="tabButtons">
          <button :class="{ active: activeTab === 'pdf' }" @click="activeTab = 'pdf'">
            PDF upload
          </button>
          <button :class="{ active: activeTab === 'video' }" @click="activeTab = 'video'">
            Youtube link
          </button>
          <button :class="{ active: activeTab === 'survey' }" @click="activeTab = 'survey'">
            Upload spørgeskema
          </button>
        </div>
        <div class="tabContent">
          <UploadFile v-if="activeTab === 'pdf'" @uploaded="$emit('uploaded')" />
          <UploadVideo v-else-if="activeTab === 'video'" @uploaded="$emit('uploaded')" />
          <UploadSurvey v-else-if="activeTab === 'survey'" @uploaded="$emit('uploaded')" />
        </div>
      </div>
    </div>
  </dialog>
</template>
