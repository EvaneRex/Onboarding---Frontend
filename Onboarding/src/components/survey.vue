<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  getSurveyQuestions,
  submitSurvey
} from './services/surveyService'
import Header from '@/components/shared/header.vue'

const surveyQuestions = ref([])

const currentQuestionIndex = ref(0)

const answers = ref({})

const companyName = ref('')
const companyEmail = ref('')

const loading = ref(true)
const error = ref('')
const submitMessage = ref('')
const submitError = ref('')

const surveySubmitted = ref(false)

const currentQuestion = computed(() => {
  return surveyQuestions.value[
    currentQuestionIndex.value
  ]
})

const isLastQuestion = computed(() => {
  return (
    currentQuestionIndex.value ===
    surveyQuestions.value.length - 1
  )
})

const showCompanyForm = computed(() => {
  return (
    surveyQuestions.value.length > 0 &&
    currentQuestionIndex.value >=
    surveyQuestions.value.length
  )
})

async function loadSurvey() {
  try {

    loading.value = true

    const response =
      await getSurveyQuestions()

    surveyQuestions.value =
      response || []

  }

  catch (err) {

    console.error(err)

    error.value =
      'Kunne ikke hente spørgsmål'
  }

  finally {
    loading.value = false
  }
}

function nextQuestion() {

  const currentAnswer =
    answers.value[
      currentQuestion.value
    ]

  if (
    !currentAnswer ||
    !currentAnswer.trim()
  ) {
    alert(
      'Du skal besvare spørgsmålet'
    )

    return
  }

  currentQuestionIndex.value++
}

function previousQuestion() {

  if (
    currentQuestionIndex.value > 0
  ) {
    currentQuestionIndex.value--
  }
}

async function sendSurvey() {

  submitError.value = ''
  submitMessage.value = ''

  if (
    !companyName.value.trim() ||
    !companyEmail.value.trim()
  ) {
    alert(
      'Udfyld virksomhedsnavn og email'
    )

    return
  }

  try {

    const formattedAnswers =
      surveyQuestions.value.map(
        question => ({
          question,
          answer:
            answers.value[
              question
            ] || ''
        })
      )

    const response =
      await submitSurvey(
        formattedAnswers
      )

    if (
        response.success
      ) {

        surveySubmitted.value =
          true
      }

    else {

      submitError.value =
        response.message ||
        'Kunne ikke sende survey'
    }

  }

  catch (error) {

    console.error(error)

    submitError.value =
      'Noget gik galt'
  }
}

onMounted(loadSurvey)
</script>

<template>
  <Header :logout="logout" />
  <main class="surveyPage">

    <section class="surveyCard">

      <!-- SUCCESS SCREEN -->
      <template
        v-if="surveySubmitted"
      >

        <h1>
          Tak for din besvarelse
        </h1>

        <p class="successText">
          Tak for at udfylde spørgeskemaet.
        </p>

        <p class="successText">
          Vi gennemgår nu jeres besvarelse og uddeler relevante materialer.
        </p>

        <p class="successText">
          Derefter modtager I registrering på mail.
        </p>

      </template>

      <!-- LOADING -->
      <p
        v-else-if="loading"
      >
        Indlæser spørgsmål...
      </p>

      <!-- ERROR -->
      <p
        v-else-if="error"
      >
        {{ error }}
      </p>

      <!-- SPØRGSMÅL -->
      <template
        v-else-if="
          !showCompanyForm &&
          !surveySubmitted
        "
      >

        <h1>
          Spørgeskema
        </h1>

        <h2>
          Spørgsmål
          {{ currentQuestionIndex + 1 }}
        </h2>

        <p class="question">
          {{ currentQuestion }}
        </p>

        <input
          v-model="
            answers[currentQuestion]
          "
          type="text"
          placeholder="Skriv dit svar..."
        />

        <div class="buttons">

          <button
            @click="
              previousQuestion
            "
            :disabled="
              currentQuestionIndex === 0
            "
          >
            Tilbage
          </button>

          <button
            @click="
              nextQuestion
            "
          >
            {{
              isLastQuestion
                ? 'Fortsæt'
                : 'Næste'
            }}
          </button>

        </div>

      </template>

      <!-- FIRMA INFO -->
      <template
        v-else-if="
          !surveySubmitted
        "
      >

        <h1>
          Virksomhedsoplysninger
        </h1>

        <input
          v-model="
            companyName
          "
          type="text"
          placeholder="Virksomhedsnavn"
        />

        <input
          v-model="
            companyEmail
          "
          type="email"
          placeholder="Virksomheds-email"
        />

        <div class="buttons">

          <button
            @click="
              previousQuestion
            "
          >
            Tilbage
          </button>

          <button
            @click="
              sendSurvey
            "
          >
            Send spørgeskema
          </button>

        </div>

        <p
          v-if="
            submitError
          "
        >
          {{ submitError }}
        </p>

      </template>

    </section>

  </main>
</template>