import { getCsrfToken } from '@/components/services/csrfService'

const API_URL = 'http://localhost:2000'

// Hent onboarding til klient
export async function getOnboarding() {
  try {
    const response = await fetch(`${API_URL}/onboarding`, {
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return null
  }
}

// Opret onboarding course til bruger
export async function createOnboardingCourse(userId, onboardingSlides) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/${userId}/onboarding`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        'x-csrf-token': csrfToken,
      },

      credentials: 'include',

      body: JSON.stringify(onboardingSlides),
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
    }
  }
}

// Send registreringsmail
export async function sendRegisterInvitation(userId) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/send-register-invitation/${userId}`, {
      method: 'POST',

      headers: {
        'x-csrf-token': csrfToken,
      },

      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
    }
  }
}

// Gem onboarding progress
export async function updateOnboardingProgress(onboardingSlides) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/onboarding-progress`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        'x-csrf-token': csrfToken,
      },

      credentials: 'include',

      body: JSON.stringify(onboardingSlides),
    })

    // forsøg at parse body uanset status for bedre fejlsøgning
    const data = await response.json().catch(() => null)

    if (!response.ok) {
      console.error('updateOnboardingProgress - bad response', response.status, data)
      return { success: false, status: response.status, error: data }
    }

    return data
  } catch (error) {
    console.error('updateOnboardingProgress error', error)
    return { success: false, error: error.message }
  }
}

// Slet onboarding course
export async function deleteOnboardingCourse(clientId) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/${clientId}/onboarding`, {
      method: 'DELETE',

      headers: {
        'x-csrf-token': csrfToken,
      },

      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
    }
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

// Upload youtube link
export async function uploadYoutubeLink(data) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/youtube-links`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        'x-csrf-token': csrfToken,
      },

      credentials: 'include',

      body: JSON.stringify(data),
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
    }
  }
}

// Slet youtube link
export async function deleteYoutubeLink(linkId) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/youtube-link/${linkId}`, {
      method: 'DELETE',

      headers: {
        'x-csrf-token': csrfToken,
      },

      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
    }
  }
}

// Upload PDF
export async function uploadPdfFiles(files) {
  try {
    const csrfToken = await getCsrfToken()

    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    const response = await fetch(`${API_URL}/onboarding/pdf-slides`, {
      method: 'POST',

      headers: {
        'x-csrf-token': csrfToken,
      },

      credentials: 'include',

      body: formData,
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
    }
  }
}

// Hent PDF filer
export async function getPdfFiles() {
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

// Slet PDF fil
export async function deletePdfFile(filename) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/onboarding/pdf-file/${filename}`, {
      method: 'DELETE',

      headers: {
        'x-csrf-token': csrfToken,
      },

      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,
    }
  }
}
