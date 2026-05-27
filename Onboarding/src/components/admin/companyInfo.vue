<!--
Dette er modalen hvor vi kan se status, hvilke materialer der er tildelt, og knap til at tildele materialer
Den er tilknyttet companyList
-->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import MaterialAssignment from '@/components/admin/materialAssignment.vue'

import ClientSurvey from '@/components/admin/clientSurvey.vue'

const emit = defineEmits(['goBack'])

const props = defineProps({
  client: {
    type: Object,
    default: null,
  },
})

const dialogRef = ref(null)

const materials = ref([])

const currentState = ref('loading')

const showAssignment = ref(false)

const showSurvey = ref(false)

// Åbn modaler ovenpå
function openAssignment() {
  dialogRef.value?.close()
  showAssignment.value = true
}

function openSurvey() {
  dialogRef.value?.close()
  showSurvey.value = true
}

// Luk assignment
function closeAssignment() {
  showAssignment.value = false

  dialogRef.value?.showModal()
}

// Luk survey
function closeSurvey() {
  showSurvey.value = false
  dialogRef.value?.showModal()
}

// Gem materialer
function saveAssignedMaterials(selectedMaterials) {
  props.client.onboardingSlides = selectedMaterials

  materials.value = selectedMaterials

  showAssignment.value = false

  dialogRef.value?.showModal()
}

// Luk company modal
function closeModal() {
  dialogRef.value?.close()
  emit('goBack')
}

// Status
function getMaterialStatus(material) {
  if (material.complete === true) {
    return '100% gennemført'
  }

  if (material.started === true) {
    return 'Igangværende'
  }

  return 'Ikke startet'
}

// Åbn modal
onMounted(() => {
  dialogRef.value?.showModal()

  materials.value = props.client?.onboardingSlides || []

  currentState.value = 'success'
})

// Luk dialog korrekt
onBeforeUnmount(() => {
  dialogRef.value?.close()
})
</script>

<template>
  <dialog ref="dialogRef" class="companyDialog">
    <button class="closeBtn" @click="closeModal">✕</button>

    <!-- TOP -->
    <section class="modalTop">
      <div>
        <h1>
          {{ props.client?.clientName }}
        </h1>

        <p>
          Her er de materialer, som er tildelt denne virksomhed samt status på hvor langt de er med
          disse.
        </p>
      </div>

      <div class="topButtons">
        <button class="createBtn" @click="openAssignment">Tildel materialer</button>

        <button class="createBtn" @click="openSurvey">Se spørgeskema</button>
      </div>
    </section>

    <!-- TABLE -->
    <section class="tableBox">
      <table v-if="currentState === 'success'">
        <thead>
          <tr>
            <th>Materialer</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(material, index) in materials" :key="index">
            <td>
              {{ material.title || `Materiale ${index + 1}` }}
            </td>

            <td>
              {{ getMaterialStatus(material) }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="currentState === 'loading'">Indlæser materialer...</p>

      <p v-if="currentState === 'error'">Der skete en fejl.</p>
    </section>
  </dialog>

  <!-- Material modal -->
  <MaterialAssignment
    v-if="showAssignment"
    :client="props.client"
    @close="closeAssignment"
    @save="saveAssignedMaterials"
  />

  <!-- Survey modal -->
  <ClientSurvey v-if="showSurvey" :client="props.client" @close="closeSurvey" />
</template>
