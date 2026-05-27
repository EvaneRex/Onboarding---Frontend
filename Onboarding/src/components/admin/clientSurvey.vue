<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getSurveyByClientId } from '@/components/services/surveyService'

const emit = defineEmits(['close'])

const props = defineProps({
  client: {
    type: Object,
    default: null,
  },
})

const dialogRef = ref(null)

const surveyAnswers = ref([])

const currentState = ref('loading')

function closeModal() {
  dialogRef.value?.close()

  emit('close')
}

onMounted(async () => {
  dialogRef.value?.showModal()

  try {
    surveyAnswers.value = props.client?.surveyAnswers || []

    console.log(
  'CLIENT DATA:',
  props.client
)

    currentState.value = 'success'
  } catch (error) {
    console.error(error)

    currentState.value = 'error'
  }
})

onBeforeUnmount(() => {
  dialogRef.value?.close()

  emit('close')
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="surveyDialog"
  >

    <button
      class="closeBtn"
      @click="closeModal"
    >
      ✕
    </button>

    <h1>
      Se
      {{ props.client?.clientName }}
      spørgeskema
    </h1>

    <!-- loading -->
    <p
      v-if="
        currentState ===
        'loading'
      "
    >
      Indlæser spørgsmål...
    </p>

    <!-- error -->
    <p
      v-if="
        currentState ===
        'error'
      "
    >
      Der skete en fejl
    </p>

    <!-- ingen survey -->
    <p
      v-if="
        currentState ===
        'success' &&
        surveyAnswers.length === 0
      "
    >
      Ingen besvarelser fundet
    </p>

    <!-- survey -->
    <section
      v-if="
        currentState ===
        'success'
      "
      class="surveyAnswers"
    >

      <div
        v-for="(
          answer,
          index
        ) in surveyAnswers"
        :key="index"
        class="answerCard"
      >

        <h3>
          {{ answer.question }}
        </h3>

        <p>
          {{ answer.answer }}
        </p>

      </div>

    </section>

  </dialog>
</template>
