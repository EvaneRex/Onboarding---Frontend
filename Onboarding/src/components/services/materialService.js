const API_URL =
  'http://localhost:2000'

// CSRF
async function getCsrfToken() {
  const response =
    await fetch(
      `${API_URL}/csrf`,
      {
        credentials:
          'include'
      }
    )

  const data =
    await response.json()

  return data.csrfToken
}

// Hent alle PDF'er
export async function
getPdfSlides() {
  try {

    const response =
      await fetch(
        `${API_URL}/onboarding/pdf-slides`,
        {
          credentials:
            'include'
        }
      )

    return await response.json()

  } catch (error) {

    console.error(error)

    return []
  }
}

// Hent youtube links
export async function
getYoutubeLinks() {
  try {

    const response =
      await fetch(
        `${API_URL}/onboarding/youtube-links`,
        {
          credentials:
            'include'
        }
      )

    return await response.json()

  } catch (error) {

    console.error(error)

    return []
  }
}

// Gem onboarding til klient
export async function
assignOnboarding(
  clientId,
  slides
) {
  try {

    const csrfToken =
      await getCsrfToken()

    const response =
      await fetch(
        `${API_URL}/onboarding/${clientId}/onboarding`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            'x-csrf-token':
              csrfToken
          },

          credentials:
            'include',

          body: JSON.stringify(
            slides
          )
        }
      )

    return await response.json()

  } catch (error) {

    console.error(error)

    return {
      success: false,
      message:
        'Kunne ikke gemme onboarding'
    }
  }
}