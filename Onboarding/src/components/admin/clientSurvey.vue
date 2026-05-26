<script setup>
<<<<<<< HEAD
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'
=======
import { ref, onMounted, computed } from 'vue'
import { getAnsweredSurveys, sendSurveyWithCompany } from '@/components/services/surveyService'
>>>>>>> 4dfb81b470f91d27718aa9f33daf0bb025f8be36

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

const companyName = ref('')
const companyEmail = ref('')

const allSurveyAnswered = computed(
  () =>
    surveyAnswers.value.length > 0 && surveyAnswers.value.every((a) => a.answer && a.answer.trim()),
)
const canSubmit = computed(
  () => allSurveyAnswered.value && companyName.value.trim() && companyEmail.value.trim(),
)

function closeModal() {
  dialogRef.value?.close()
  emit('close')
}

async function submitAll() {
  try {
    await sendSurveyWithCompany({
      clientId: props.client?.clientId,
      companyName: companyName.value,
      companyEmail: companyEmail.value,
      survey: surveyAnswers.value,
    })
    closeModal()
  } catch (e) {
    alert('Der skete en fejl ved indsendelse')
  }
}

onMounted(async () => {
  dialogRef.value?.showModal()
  try {
    const surveys = await getAnsweredSurveys()
    const companySurvey = surveys.find((survey) => survey.clientId === props.client?.clientId)
    surveyAnswers.value = companySurvey?.survey || []
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

    <p v-if="currentState === 'loading'">Indlæser spørgsmål...</p>
    <p v-if="currentState === 'error'">Der skete en fejl</p>
    <p v-if="currentState === 'success' && surveyAnswers.length === 0">Ingen spørgsmål fundet</p>

    <section v-if="currentState === 'success'" class="surveyAnswers">
      <div v-for="(answer, index) in surveyAnswers" :key="index" class="answerCard">
        <h3>{{ answer.question }}</h3>
        <input v-model="answer.answer" type="text" placeholder="Skriv dit svar her" />
      </div>
    </section>
</dialog>
</template>
