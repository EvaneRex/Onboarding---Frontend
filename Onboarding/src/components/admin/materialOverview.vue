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

async function sletYoutubeLink(linkId) {
  try {
    const res = await fetch(`/onboarding/youtube-link/${linkId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      youtubeLinks.value = data.hvis_res_ok.allLinks
    } else {
      alert(data.message || 'Kunne ikke slette link')
    }
  } catch (e) {
    alert('Der opstod en fejl')
  }
}
async function sletPdfFil(filename) {
  try {
    const res = await fetch(`/onboarding/pdf-file/${filename}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      // Fjern filen fra listen
      pdfSlides.value = pdfSlides.value.filter((pdf) => pdf.filnavn !== filename)
    } else {
      alert(data.message || 'Kunne ikke slette fil')
    }
  } catch (e) {
    alert('Der opstod en fejl')
  }
}

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
                src="@/assets/icon/trash-solid-full.svg"
                alt="Slet"
                class="icon"
                style="cursor: pointer; margin-left: 4px"
                @click="() => sletPdfFil(pdf.filnavn)"
              />
            </td>
            <td>PDF</td>
          </tr>
          <tr v-for="yt in youtubeLinks" :key="yt.id">
            <td>
              {{ yt.titel }}
              <img
                src="@/assets/icon/trash-solid-full.svg"
                alt="Slet"
                class="icon"
                style="cursor: pointer; margin-left: 4px"
                @click="() => sletYoutubeLink(yt.id)"
              />
            </td>
            <td>YouTube</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
