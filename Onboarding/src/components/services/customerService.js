import { getCsrfToken } from '@/components/services/csrfService'

const API_URL = 'http://localhost:2000'

// Henter alle virksomheder
export async function getAllClients() {
  try {
    const response = await fetch(`${API_URL}/clients/all-clients`, {
      method: 'GET',
      credentials: 'include',
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Fejl ved hentning af virksomheder:', error)

    return {
      success: false,
      message: 'Kunne ikke hente virksomheder',
    }
  }
}

// Henter info om valgt virksomhed
export async function getClientInfo(clientId) {
  try {
    const response = await fetch(`${API_URL}/clients/client-info/${clientId}`, {
      method: 'GET',
      credentials: 'include',
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Fejl ved hentning af virksomhed:', error)

    return null
  }
}

// Sletter virksomhed
export async function deleteClient(clientId) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/clients/${clientId}`, {
      method: 'DELETE',

      headers: {
        'x-csrf-token': csrfToken,
      },

      credentials: 'include',
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Fejl ved sletning:', error)

    return {
      success: false,
      message: 'Kunne ikke slette virksomhed',
    }
  }
}

// Sletter bruger der ikke er registreret
export async function deleteAnsweredSurvey(surveyId) {
  try {
    const csrfRes = await fetch(`${API_URL}/csrf`, { credentials: 'include' })
    const csrfData = await csrfRes.json()

    const res = await fetch(`${API_URL}/survey/answered-survey/${encodeURIComponent(surveyId)}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'x-csrf-token': csrfData.csrfToken,
      },
    })

    const data = await res.json().catch(() => ({}))
    return { success: res.ok, ...data }
  } catch (error) {
    console.error('Fejl ved sletning af survey:', error)
    return { success: false, message: 'Kunne ikke slette survey' }
  }
}
