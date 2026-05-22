<script setup>
import { ref, onMounted } from 'vue'
import { getOnboarding } from '@/components/services/materialService'

import MaterialAssignment from '@/components/admin/materialAssignment.vue'

const showAssignment = ref(false)

function openAssignment() {
  dialogRef.value?.close()
  showAssignment.value = true
}

function closeAssignment() {
  showAssignment.value = false

  // åbn company modal igen
  dialogRef.value?.showModal()
}
function saveAssignedMaterials(selectedMaterials) {
  // Gem tildelte materialer til backend
  props.client.onboardingSlides = selectedMaterials
  materials.value = selectedMaterials
  showAssignment.value = false
}

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

function closeModal() {
  dialogRef.value.close()
  emit('goBack')
}

function getMaterialStatus(material) {
  if (material.complete === true) {
    return '100% gennemført'
  }

  if (material.started === true) {
    return 'Igangværende'
  }

  return 'Ikke startet'
}

onMounted(() => {
  dialogRef.value?.showModal()

  materials.value = props.client?.onboardingSlides || []

  currentState.value = 'success'
})
</script>

<template>
  <dialog ref="dialogRef" class="companyDialog">
    <div>
      <button class="closeBtn" @click="closeModal">x</button>
    </div>
    <!-- Top -->
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

        <button class="createBtn">Se spørgeskema</button>
      </div>
    </section>

    <!-- Table -->
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

  <MaterialAssignment
    v-if="showAssignment"
    :client="props.client"
    @close="closeAssignment"
    @save="saveAssignedMaterials"
  />
</template>
