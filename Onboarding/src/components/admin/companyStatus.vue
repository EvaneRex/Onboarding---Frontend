<script setup>
import { onMounted, ref } from 'vue'
import { getOnboarding } from '@/components/services/materialService'

const emit = defineEmits(['goBack'])
const props = defineProps({
  showBack: {
    type: Boolean,
    default: true,
  },
  companyName: {
    type: String,
    default: 'Virksomhed',
  },
})

const materials = ref([])
const currentState = ref('loading')

const getMaterialStatus = (material) => {
  if (material.complete === true) {
    return 'Gennemfort'
  }

  if (material.complete === false) {
    return 'Ikke startet'
  }

  return 'Tildelt'
}

onMounted(async () => {
  currentState.value = 'loading'

  try {
    const onboarding = await getOnboarding()
    materials.value = Array.isArray(onboarding)
      ? onboarding
      : (onboarding?.onboardingSlides || [])

    currentState.value = 'success'
  } catch (error) {
    currentState.value = 'error'
  }
})
</script>
<template>
  <section class="companyStatus companyList">
    <button v-if="props.showBack" class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>

    <section class="topSection">
      <h1>{{ props.companyName }}</h1>
    </section>

    <div class="tableBox">

      <table v-if="currentState === 'success'">

        <thead>
          <tr>
            <th>Materiale</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(material, index) in materials"
            :key="material.id || index"
          >
            <td>
              {{ material.title || `Materiale ${index + 1}` }}
            </td>

            <td>
              {{ material.type || '-' }}
            </td>

            <td>
              {{ getMaterialStatus(material) }}
            </td>
          </tr>
        </tbody>

      </table>

      <p
        v-if="currentState === 'success' && materials.length === 0"
      >
        Ingen onboarding-filer fundet.
      </p>

      <p v-if="currentState === 'loading'">
        Indlæser materialer...
      </p>

      <p v-if="currentState === 'error'">
        Der skete en fejl.
      </p>
    </div>
  </section>
</template>
