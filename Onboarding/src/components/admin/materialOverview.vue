<script setup>
import { ref, onMounted } from 'vue'
import UploadManager from './uploadManager.vue'

const emit = defineEmits(['goBack'])
const showUploadManager = ref(false)

function tilføjMat() {
  showUploadManager.value = true
}
function lukUploadManager() {
  showUploadManager.value = false
}

const pdfSlides = ref([])
const youtubeLinks = ref([])

onMounted(async () => {
  try {
    const pdfRes = await fetch('/onboarding/pdf-slides')
    if (pdfRes.ok) {
      const data = await pdfRes.json()
      pdfSlides.value = Array.isArray(data) ? data : data.hvis_res_ok || []
    }
  } catch (e) {
    console.error('Fejl ved hentning af PDF:', e)
  }
  try {
    const ytRes = await fetch('/onboarding/youtube-links')
    if (ytRes.ok) {
      const data = await ytRes.json()
      youtubeLinks.value = Array.isArray(data) ? data : data.hvis_res_ok || []
    }
  } catch (e) {
    console.error('Fejl ved hentning af YouTube:', e)
  }
})
</script>

<template>
  <section class="matOverview">
    <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>
    <h1>Materialer</h1>
    <p>Her kan du tilgå materialerne, samt uploade nyt indhold og ændre navn på filerne.</p>
    <button class="btn" @click="tilføjMat">Tilføj materialer</button>
    <UploadManager v-if="showUploadManager" @close="lukUploadManager" />

    <div class="matTable">
      <table>
        <thead>
          <tr>
            <th>Materiale</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pdfSlides.length === 0 && youtubeLinks.length === 0">
            <td colspan="2">Ingen materialer fundet.</td>
          </tr>
          <tr v-for="pdf in pdfSlides" :key="pdf.filnavn">
            <td>
              {{ pdf.filnavn }}
              <img
                src="@/assets/icon/pen-solid-full.svg"
                alt="Rediger"
                class="icon"
                style="cursor: pointer; margin-left: 8px"
                @click="
                  () => {
                    /* rediger funktion */
                  }
                "
              />
              <img
                src="@/assets/icon/trash-solid-full.svg"
                alt="Slet"
                class="icon"
                style="cursor: pointer; margin-left: 4px"
                @click="
                  () => {
                    /* slet funktion */
                  }
                "
              />
            </td>
            <td>PDF</td>
          </tr>
          <tr v-for="yt in youtubeLinks" :key="yt.id">
            <td>
              {{ yt.titel }}
              <img
                src="@/assets/icon/pen-solid-full.svg"
                alt="Rediger"
                class="icon"
                style="cursor: pointer; margin-left: 8px"
                @click="
                  () => {
                    /* rediger funktion */
                  }
                "
              />
              <img
                src="@/assets/icon/trash-solid-full.svg"
                alt="Slet"
                class="icon"
                style="cursor: pointer; margin-left: 4px"
                @click="
                  () => {
                    /* slet funktion */
                  }
                "
              />
            </td>
            <td>YouTube</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
