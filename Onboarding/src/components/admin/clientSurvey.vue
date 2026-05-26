<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAnsweredSurveys, sendSurveyWithCompany } from '@/components/services/surveyService'

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
</script>

<template>
  <dialog ref="dialogRef" class="surveyDialog">
    <button class="closeBtn" @click="closeModal">✕</button>
    <h1>Udfyld spørgeskema</h1>

    <p v-if="currentState === 'loading'">Indlæser spørgsmål...</p>
    <p v-if="currentState === 'error'">Der skete en fejl</p>
    <p v-if="currentState === 'success' && surveyAnswers.length === 0">Ingen spørgsmål fundet</p>

    <section v-if="currentState === 'success'" class="surveyAnswers">
      <div v-for="(answer, index) in surveyAnswers" :key="index" class="answerCard">
        <h3>{{ answer.question }}</h3>
        <input v-model="answer.answer" type="text" placeholder="Skriv dit svar her" />
      </div>
    </section>

    <section v-if="currentState === 'success' && allSurveyAnswered">
      <label>
        Virksomhedsnavn:
        <input v-model="companyName" type="text" />
      </label>
      <label>
        Email:
        <input v-model="companyEmail" type="email" />
      </label>
      <button :disabled="!canSubmit" @click="submitAll">Indsend</button>
    </section>
  </dialog>
</template>
