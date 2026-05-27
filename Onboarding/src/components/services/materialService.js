import { getCsrfToken } from '@/components/services/csrfService'

const API_URL = 'http://localhost:2000'

// Hent alle PDF'er
export async function getPdfSlides() {
  try {
    const response = await fetch(`${API_URL}/onboarding/pdf-slides`, {
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return []
  }
}

// Hent youtube links
export async function getYoutubeLinks() {
  try {
    const response = await fetch(`${API_URL}/onboarding/youtube-links`, {
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return []
  }
}

// Gem onboarding til klient
export async function assignOnboarding(clientId, slides) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/${clientId}/onboarding`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        'x-csrf-token': csrfToken,
      },

      credentials: 'include',

      body: JSON.stringify(slides),
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Kunne ikke gemme onboarding',
    }
  }
}

export async function createNewClientAccount(surveyId, username, email) {
  try {
    const csrfToken = await getCsrfToken()
    const response = await fetch(`${API_URL}/register/create-new-client-account/${surveyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ username, email }),
    })
    return await response.json()
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Kunne ikke oprette klientbruger',
    }
  }
}
