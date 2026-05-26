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
const surveyFileName = ref('')

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

async function sletYoutubeLink(linkId) {
  try {
    const csrfToken = await getCsrfToken()
    const res = await fetch(`http://localhost:2000/onboarding/youtube-link/${linkId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'x-csrf-token': csrfToken,
      },
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
    const csrfToken = await getCsrfToken()
    const res = await fetch(`http://localhost:2000/onboarding/pdf-file/${filename}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'x-csrf-token': csrfToken,
      },
    })
    const data = await res.json()
    if (res.ok) {
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
    const pdfRes = await fetch('http://localhost:2000/onboarding/pdf-slides', {
      credentials: 'include',
    })
    if (pdfRes.ok) {
      const data = await pdfRes.json()
      pdfSlides.value = Array.isArray(data) ? data : data.hvis_res_ok || []
    }
  } catch (e) {
    console.error('Fejl ved hentning af PDF:', e)
  }
  try {
    const ytRes = await fetch('http://localhost:2000/onboarding/youtube-links', {
      credentials: 'include',
    })
    if (ytRes.ok) {
      const data = await ytRes.json()
      youtubeLinks.value = Array.isArray(data) ? data : data.hvis_res_ok || []
    }
  } catch (e) {
    console.error('Fejl ved hentning af YouTube:', e)
    console.log('YouTube data fra backend:', data)
  }
  try {
    const surveyRes = await fetch('http://localhost:2000/survey/survey-questions', {
      credentials: 'include',
    })
    if (surveyRes.ok) {
      const data = await surveyRes.json()
      const questions = Array.isArray(data) ? data : data.questions
      if (Array.isArray(questions) && questions.length > 0) {
        surveyFileName.value = 'Survey.json'
      } else {
        surveyFileName.value = ''
      }
    }
  } catch (e) {
    surveyFileName.value = ''
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="surveyFileName">
            <td>{{ surveyFileName }}</td>
            <td>Survey</td>
            <td></td>
          </tr>
          <tr v-if="pdfSlides.length === 0 && youtubeLinks.length === 0 && !surveyFileName">
            <td colspan="3">Ingen materialer fundet.</td>
          </tr>
          <tr v-for="pdf in pdfSlides" :key="pdf.filnavn">
            <td>{{ pdf.filnavn }}</td>
            <td>PDF</td>
            <td>
              <img
                src="@/assets/icon/trash-solid-full.svg"
                alt="Slet"
                class="icon"
                @click="() => sletPdfFil(pdf.filnavn)"
              />
            </td>
          </tr>
          <tr v-for="yt in youtubeLinks" :key="yt.id">
            <td>{{ yt.titel }}</td>
            <td>YouTube</td>
            <td>
              <img
                src="@/assets/icon/trash-solid-full.svg"
                alt="Slet"
                class="icon"
                @click="() => sletYoutubeLink(yt.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
