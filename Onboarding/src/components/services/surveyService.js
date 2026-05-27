import { getCsrfToken } from '@/components/services/csrfService'

// Henter survey
const API_URL = 'http://localhost:2000'

export async function getSurveyQuestions() {
  try {
    const response = await fetch(`${API_URL}/survey/survey-questions`, {
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return []
  }
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

// Få alle svarede suveys
export async function getAllSurveys() {
  try {
    const response = await fetch(`${API_URL}/survey/answered-surveys`, {
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getSurveyByClientId(clientId) {
  try {

    const response =
      await fetch(
        `http://localhost:2000/survey/client/${clientId}`,
        {
          credentials:
            'include'
        }
      )

    return await response.json()

  }

  catch (error) {

    console.error(error)

    return {
      success: false,
      message:
        'Kunne ikke hente survey'
    }
  }
}