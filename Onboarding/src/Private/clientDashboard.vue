<script setup>
import { ref, onMounted } from 'vue'
import clientMatView from '@/components/client/clientMatView.vue'
import { getOnboarding, updateOnboardingProgress } from '@/components/services/onboardingService'
import Header from '@/components/shared/header.vue'

const props = defineProps({
  user: Object,
  logout: Function,
})

const currentView = ref('dashboard')
const selectedMaterial = ref(null)

const materials = ref([])
const currentState = ref('loading')

// Holder styr på om noget er åbnet
const startedSlides = ref([])

onMounted(async () => {
  try {
    const clientData = await getOnboarding()

    materials.value = Array.isArray(clientData) ? clientData : []

    currentState.value = 'success'
  } catch (error) {
    console.error(error)

    currentState.value = 'error'
  }
})

function getStatus(material, index) {
  if (material.complete) return 'Gennemført'
  if (startedSlides.value.includes(index)) return 'Igangværende'

  return 'Ikke startet'
}

async function persistProgress() {
  try {
    const slides = materials.value.map((m) => ({
      type: m.type || (m.filename ? 'pdf' : 'youtube'),
      src:
        m.src ||
        m.url ||
        m.filename ||
        m.link ||
        (m.youtubeId ? `https://www.youtube.com/watch?v=${m.youtubeId}` : ''),
      complete: !!m.complete,
    }))

    const invalid = slides.find((s) => !s.type || !s.src || typeof s.complete !== 'boolean')
    if (invalid) {
      console.error('Kunne ikke gemme progress: ugyldigt slideformat', invalid)
      return
    }

    // Send array direkte (backend validerer en array)
    await updateOnboardingProgress(slides)
  } catch (err) {
    console.error('Kunne ikke gemme progress:', err)
  }
}

function openMaterial(material, index) {
  // sæt igangværende hvis ikke gennemført
  if (!material.complete && !startedSlides.value.includes(index)) {
    startedSlides.value.push(index)
    persistProgress()
  }

  selectedMaterial.value = {
    ...material,
    index,
  }

  currentView.value = 'material'
}

function completeMaterial(index) {
  materials.value[index].complete = true // obssss skal skiftes til API kald når backend er done
  persistProgress()
  currentView.value = 'dashboard'
  selectedMaterial.value = null
}

function goBack() {
  currentView.value = 'dashboard'
}
</script>

<template>
  <Header :logout="logout" :user="user" />

  <!-- DASHBOARD -->
  <section v-if="currentView === 'dashboard'" class="companyList clientDashboard">
    <!-- Top -->
    <section class="topSection">
      <div>
        <h1>Velkommen!</h1>

        <p>Her finder i et overblik over de onboarding materialer, som er blevet tildelt.</p>

        <p>Når materialerne er gennemført, hører i fra os igen.</p>
      </div>
    </section>

    <!-- Table -->
    <section class="tableBox">
      <!-- Loading -->
      <div v-if="currentState === 'loading'">Indlæser materialer...</div>

      <!-- Error -->
      <div v-else-if="currentState === 'error'">Der skete en fejl.</div>

      <!-- Table -->
      <table v-else>
        <thead>
          <tr>
            <th>Materialer</th>

            <th>Status</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(material, index) in materials" :key="index">
            <td>
              {{ material.title || `Materiale ${index + 1}` }}
            </td>

            <td>
              {{ getStatus(material, index) }}
            </td>

            <td class="actions">
              <button @click="openMaterial(material, index)">
                <img
                  src="@/assets/icon/arrow-up-right-from-square-solid-full.svg"
                  alt="Åben materiale"
                  class="iconCompanyList"
                />

                Åben
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>

  <!-- MATERIAL VIEW -->
  <clientMatView
    v-if="currentView === 'material'"
    :material="selectedMaterial"
    @goBack="goBack"
    @complete="completeMaterial"
  />
</template>
