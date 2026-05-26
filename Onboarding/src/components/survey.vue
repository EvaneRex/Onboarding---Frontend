// vi skal hente spørgsmål ind, inputfelter, vi skal have med virksomhedsinfo inden indsend bliver
aktiv, færdig knap går videre til indsend

<script setup>
import { onMounted, ref } from 'vue'
import { getSurveyQuestions, submitSurvey, getAnsweredSurveys } from './services/surveyService'

// Reactive state used by the template
const surveyQuestions = ref([])
const answeredSurveys = ref([])
const surveyError = ref('')
const submitError = ref('')
const submitMessage = ref('')
const answers = ref({})

// Accept different API response shapes and always return an array
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

// Load questions and previous survey submissions when page opens
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

// Send current answers to backend
const onSubmit = async () => {
  submitError.value = ''
  submitMessage.value = ''

  const response = await submitSurvey({ answers: answers.value })

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
    <!-- Page title -->
    <h1>Survey</h1>

    <!-- Show fetch error if survey questions cannot be loaded -->
    <p v-if="surveyError">{{ surveyError }}</p>

    <!-- Survey form -->
    <form v-else @submit.prevent="onSubmit">
      <!-- Render one input per question -->
      <div
        v-for="question in surveyQuestions"
        :key="question.id || question._id || question.question"
      >
        <label :for="`q-${question.id || question._id || question.question}`">
          {{ question.question || question.label || 'Sporgsmal' }}
        </label>
        <input
          :id="`q-${question.id || question._id || question.question}`"
          v-model="answers[question.id || question._id || question.question]"
          type="text"
          required
        />
      </div>

      <!-- Submit feedback -->
      <p v-if="submitError">{{ submitError }}</p>
      <p v-if="submitMessage">{{ submitMessage }}</p>

      <button type="submit">Send Survey</button>
    </form>

    <!-- Simple overview count -->
    <p>Besvarede surveys: {{ answeredSurveys.length }}</p>
  </section>
</template>
