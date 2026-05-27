<script setup>
import { ref, computed, onMounted } from 'vue'
import { getSurveyQuestions, submitSurvey } from './services/surveyService'
import Header from '@/components/shared/header.vue'

const surveyQuestions = ref([])

const currentQuestionIndex = ref(0)

const answers = ref({})

const loading = ref(true)
const error = ref('')
const submitError = ref('')

const surveySubmitted = ref(false)

// nuværende spørgsmål
const currentQuestion = computed(() => {
  return surveyQuestions.value[currentQuestionIndex.value]
})

//sidste spørgsmål
const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === surveyQuestions.value.length - 1
})

//hent spørgsmål
async function loadSurvey() {
  try {
    loading.value = true

    const response = await getSurveyQuestions()

    surveyQuestions.value = response || []
  } catch (err) {
    console.error(err)

    error.value = 'Kunne ikke hente spørgsmål'
  } finally {
    loading.value = false
  }
}

//næste spørgmål
function nextQuestion() {
  const currentAnswer = answers.value[currentQuestion.value]

  if (!currentAnswer || !currentAnswer.trim()) {
    alert('Du skal besvare spørgsmålet')

    return
  }
  // sidste spørgsmål
  if (isLastQuestion.value) {
    sendSurvey()
    return
  }

  currentQuestionIndex.value++
}

// forrige spørgsmål
function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

async function sendSurvey() {
  submitError.value = ''

  try {
    const formattedAnswers = surveyQuestions.value.map((question) => ({
      question,
      answer: answers.value[question] || '',
    }))

    const response = await submitSurvey(formattedAnswers)

    if (response.success) {
      surveySubmitted.value = true
    } else {
      submitError.value = response.message || 'Kunne ikke sende survey'
    }
  } catch (error) {
    console.error(error)

    submitError.value = 'Noget gik galt'
  }
}

onMounted(loadSurvey)
</script>

<template>
  <Header :logout="logout" :user="user" />

  <main class="surveyPage">
    <section class="surveyCard">
      <!-- SUCCESS SCREEN -->
      <template v-if="surveySubmitted">
        <h1>Tak for din besvarelse</h1>

        <p class="successText">Tak for at udfylde spørgeskemaet.</p>

        <p class="successText">Vi gennemgår nu jeres besvarelse og uddeler relevante materialer.</p>

        <p class="successText">Derefter modtager I registrering på mail.</p>
      </template>

      <!-- LOADING -->
      <p v-else-if="loading">Indlæser spørgsmål...</p>

      <!-- ERROR -->
      <p v-else-if="error">
        {{ error }}
      </p>

      <!-- SPØRGSMÅL -->
      <template v-else>
        <div class="surveyTop">
          <h1>Spørgeskema</h1>

          <div class="questionNumber">
            {{ currentQuestionIndex + 1 }}
            /
            {{ surveyQuestions.length }}
          </div>
        </div>
        <p class="question">
          {{ currentQuestion }}
        </p>

        <input v-model="answers[currentQuestion]" type="text" placeholder="Skriv dit svar..." />

        <div class="buttons">
          <button
            class="surveyBackBtn"
            @click="previousQuestion"
            :disabled="currentQuestionIndex === 0"
          >
            Tilbage
          </button>

          <button class="surveyNextBtn" @click="nextQuestion">
            {{ isLastQuestion ? 'Send' : 'Næste' }}
          </button>
        </div>

        <p v-if="submitError" class="errorText">
          {{ submitError }}
        </p>
      </template>
    </section>
  </main>
</template>
