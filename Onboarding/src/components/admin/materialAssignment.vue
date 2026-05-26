<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getOnboarding } from '@/components/services/materialService'

const emit = defineEmits([
  'close',
  'save'
])

const props = defineProps({
  client: Object
})

const dialogRef = ref(null)

const allMaterials = ref([])
const selectedMaterials = ref([])

onMounted(async () => {
  dialogRef.value?.showModal()

  const onboarding =
    await getOnboarding()

  allMaterials.value =
    onboarding?.onboardingSlides ||
    onboarding ||
    []

  // allerede tildelte materialer
  selectedMaterials.value =
    props.client?.onboardingSlides?.map(
      material => material.id
    ) || []
})

function saveMaterials() {
  const selected =
    allMaterials.value.filter(
      material =>
        selectedMaterials.value.includes(
          material.id
        )
    )

  dialogRef.value.close()

  emit('save', selected)
  emit('close')
}

function closeModal() {
  dialogRef.value.close()

  emit('close')
}

onBeforeUnmount(() => {
  dialogRef.value?.close()
})

</script>

<template>
  <dialog
    ref="dialogRef"
    class="materialDialog"
  >

    <button
      class="closeBtn"
      @click="closeModal"
    >
      ✕
    </button>

    <section class="modalTop">

      <div>
        <h1>
          {{ props.client?.clientName }}
        </h1>

        <p>
          Tildel materiale til
          {{ props.client?.clientName }}
        </p>
      </div>

    </section>

    <section class="tableBox">

      <table>

        <thead>
          <tr>
            <th>
              Materialer
            </th>

            <th>
            </th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="material in allMaterials"
            :key="material.id"
          >
            <td>
              {{ material.title }}
            </td>

            <td>

              <label>
                <input
                  type="checkbox"
                  :value="material.id"
                  v-model="selectedMaterials"
                />

                Tildel
              </label>

            </td>
          </tr>

        </tbody>

      </table>

    </section>

    <div class="saveSection">

      <button
        class="createBtn"
        @click="saveMaterials"
      >
        Gem valg
      </button>

    </div>

  </dialog>
</template>