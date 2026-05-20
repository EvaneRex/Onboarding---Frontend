<script setup>
// fetch json
</script>
<template>
  <h1>Survey</h1>
</template>

<script setup>
import { ref } from 'vue'
import {
  getSurveyQuestions,
  submitSurvey,
  createSurvey,
  getAnsweredSurveys,
} from './components/services/surveyService';

<!-- Fetch survey questions and answered surveys -->
const { data: surveyQuestions, error: surveyError } = await getSurveyQuestions()
const { data: answeredSurveys, error: answeredSurveysError } = await getAnsweredSurveys()
const answers = ref({})
</script>
