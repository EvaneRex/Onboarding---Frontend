<script setup>
import { onMounted, ref, computed } from 'vue'
import { getSurveyQuestions, submitSurvey, getAnsweredSurveys } from './services/surveyService'

const surveyQuestions = ref([])
const answeredSurveys = ref([])
const surveyError = ref('')
const submitError = ref('')
const submitMessage = ref('')
const answers = ref({})

const companyName = ref('')
const companyEmail = ref('')

const normalizeList = (value, keys = []) => {
  if (Array.isArray(value)) {
    return value
  }
  for (const key of keys) {
    if (Array.isArray(value?.[key])) {
      return value[key]
    }
  }
  return []
}

const allQuestionsAnswered = computed(
  () =>
    surveyQuestions.value.length > 0 &&
    surveyQuestions.value.every(
      (q) =>
        answers.value[q.id || q._id || q.question] &&
        answers.value[q.id || q._id || q.question].trim(),
    ),
)

const canSubmit = computed(
  () => allQuestionsAnswered.value && companyName.value.trim() && companyEmail.value.trim(),
)

const loadSurveyData = async () => {
  surveyError.value = ''
  const questionsResponse = await getSurveyQuestions()
  if (questionsResponse?.success === false) {
    surveyError.value = questionsResponse.message || 'Kunne ikke hente survey'
    surveyQuestions.value = []
  } else {
    surveyQuestions.value = normalizeList(questionsResponse, ['questions', 'data'])
  }
  const answeredResponse = await getAnsweredSurveys()
  if (answeredResponse?.success === false) {
    answeredSurveys.value = []
  } else {
    answeredSurveys.value = normalizeList(answeredResponse, ['answeredSurveys', 'surveys', 'data'])
  }
}

const onSubmit = async () => {
  submitError.value = ''
  submitMessage.value = ''
  const response = await submitSurvey({
    companyName: companyName.value,
    companyEmail: companyEmail.value,
    answers: answers.value,
  })
  if (response?.success === false) {
    submitError.value = response.message || 'Kunne ikke sende survey'
    return
  }
  submitMessage.value = response?.message || 'Survey sendt'
}

onMounted(loadSurveyData)
</script>

<template>
  <section>
    <h1>Survey</h1>
    <p v-if="surveyError">{{ surveyError }}</p>
    <form v-else @submit.prevent="onSubmit">
      <div
        v-for="question in surveyQuestions"
        :key="question.id || question._id || question.question"
      >
        <label :for="`q-${question.id || question._id || question.question}`">
          {{ question.question || question.label || 'Spørgsmål' }}
        </label>
        <input
          :id="`q-${question.id || question._id || question.question}`"
          v-model="answers[question.id || question._id || question.question]"
          type="text"
          required
        />
      </div>
      <div>
        <label for="companyName">Virksomhedsnavn</label>
        <input id="companyName" v-model="companyName" type="text" required />
      </div>
      <div>
        <label for="companyEmail">Virksomheds-email</label>
        <input id="companyEmail" v-model="companyEmail" type="email" required />
      </div>
      <p v-if="submitError">{{ submitError }}</p>
      <p v-if="submitMessage">{{ submitMessage }}</p>
      <button type="submit" :disabled="!canSubmit">Send Survey</button>
    </form>
    <p>Besvarede surveys: {{ answeredSurveys.length }}</p>
  </section>
</template>
