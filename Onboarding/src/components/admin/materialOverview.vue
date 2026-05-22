<script setup>
import { ref } from 'vue'
import UploadManager from './uploadManager.vue'

const emit = defineEmits(['goBack'])
const showUploadManager = ref(false)

function tilføjMat() {
  showUploadManager.value = true
}
function lukUploadManager() {
  showUploadManager.value = false
}
</script>

<template>
  <section class="matOverview">
    <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>
    <h1>Materialer</h1>
    <p>Her kan du tilgå materialerne, samt uploade nyt indhold og ændre navn på filerne.</p>
    <button @click="tilføjMat">Tilføj materialer</button>
  </section>
  <UploadManager v-if="showUploadManager" @close="lukUploadManager" />
</template>
