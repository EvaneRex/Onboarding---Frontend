<script setup>
import { ref, onMounted } from 'vue'
import clientMatView from '@/components/client/clientMatView.vue'
import { getOnboarding } from '@/components/services/materialService.js'

import Header from '@/components/shared/header.vue'

defineProps({
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

    // onboardingSlides fra backend
    materials.value = clientData.onboardingSlides || []

    currentState.value = 'success'
  } catch (error) {
    console.error(error)
    currentState.value = 'error'
  }
})

const getStatus = (material, index) => {
  if (material.complete) return 'Gennemført'
  if (startedSlides.value.includes(index)) return 'Igangværende'

  return 'Ikke startet'
}

const openMaterial = (material, index) => {
  // sæt igangværende hvis ikke gennemført
  if (!material.complete && !startedSlides.value.includes(index)) {
    startedSlides.value.push(index)
  }

  selectedMaterial.value = {
    ...material,
    index,
  }

  currentView.value = 'material'
}

const completeMaterial = (index) => {
  materials.value[index].complete = true // obssss skal skiftes til API kald når backend er done

  currentView.value = 'dashboard'
  selectedMaterial.value = null
}

const goBack = () => {
  currentView.value = 'dashboard'
}
</script>

<template>
  <Header :logout="logout" />

  <!-- DASHBOARD -->
  <section v-if="currentView === 'dashboard'" class="dashboard clientDashboard">
    <div class="welcome">
      <h1>Velkommen!</h1>

      <p>
        Her finder i et overblik over de forskellige onboarding materialer, her kan i også se
        status.
      </p>
      <p>Når materialerne er gennemført, hører i fra os igen.</p>
    </div>

    <div class="materialTable">
      <table v-if="currentState === 'success'" class="tableClient">
        <thead>
          <tr>
            <th>Materialer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(material, index) in materials"
            :key="index"
            class="clickableRow"
            @click="openMaterial(material, index)"
          >
            <td>Materiale {{ index + 1 }}</td>

            <td>
              {{ getStatus(material, index) }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="currentState === 'loading'">Indlæser materialer...</p>

      <p v-if="currentState === 'error'">Der skete en fejl.</p>
    </div>
  </section>

  <!-- MATERIAL VIEW -->
  <clientMatView
    v-if="currentView === 'material'"
    :material="selectedMaterial"
    @goBack="goBack"
    @complete="completeMaterial"
  />
</template>
