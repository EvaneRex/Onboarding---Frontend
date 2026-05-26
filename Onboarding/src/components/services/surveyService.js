// import axios from 'axios'

// const API_URL = 'http://localhost:3000'

// // Henter spørgsmål til survey
// export async function getSurveyQuestions() {
//   try {

//     const response = await axios.get(
//       `${API_URL}/survey/survey-questions`
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved hentning af survey:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke hente survey'
//     }
//   }
// }

// // Sender kundens survey-besvarelser
// export async function submitSurvey(
//   answers
// ) {
//   try {

//     const response = await axios.post(
//       `${API_URL}/survey/survey-answers`,
//       answers
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved upload af survey:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke sende survey'
//     }
//   }
// }

// // Admin opretter survey-spørgsmål
// export async function createSurvey(
//   surveyQuestions
// ) {
//   try {

//     const response = await axios.post(
//       `${API_URL}/survey/new-survey`,
//       surveyQuestions
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved oprettelse af survey:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke oprette survey'
//     }
//   }
// }

// // Henter alle besvarede surveys til admin
// export async function getAnsweredSurveys() {
//   try {

//     const response = await axios.get(
//       `${API_URL}/survey/answered-surveys`
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved hentning af besvarede surveys:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke hente surveys'
//     }
//   }
// }

import { mockSurveyQuestions, mockAnsweredSurveys } from '@/api/mockApi'

// Henter survey
export async function getSurveyQuestions() {
  return mockSurveyQuestions
}

// Sender survey
async function getCsrfToken() {
  const response = await fetch('http://localhost:2000/csrf', {
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Could not get CSRF token.')
  }

  return data.csrfToken
}

// Sender survey
export async function submitSurvey(data) {
  const csrfToken = await getCsrfToken()
  return fetch('http://localhost:2000/survey/survey-answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then((res) => res.json())
}
// Opret survey
export async function createSurvey(surveyQuestions) {
  return {
    success: true,
    surveyQuestions,
  }
}

// Henter besvarede surveys
export async function getAnsweredSurveys() {
  return mockAnsweredSurveys
}
