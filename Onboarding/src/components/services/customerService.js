import axios from 'axios'

const API_URL = 'http://localhost:3000'

// Henter alle virksomheder
export async function getAllClients() {
  try {

    const response = await axios.get(
      `${API_URL}/all-clients`
    )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved hentning af virksomheder:',
      error
    )

    return []
  }
}

// Henter info om valgt virksomhed
export async function getClientInfo(
  clientId
) {
  try {

    const response = await axios.get(
      `${API_URL}/client-info/${clientId}`
    )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved hentning af virksomhed:',
      error
    )

    return null
  }
}

// Sletter virksomhed
export async function deleteClient(
  clientId
) {
  try {

    const response =
      await axios.delete(
        `${API_URL}/${clientId}`
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved sletning:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke slette virksomhed'
    }
  }
}

// Tildeler onboarding-materialer
export async function assignOnboarding(
  clientId,
  slides
) {
  try {

    const response =
      await axios.post(
        `${API_URL}/${clientId}/onboarding`,
        slides
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved onboarding:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke tildele onboarding'
    }
  }
}

// Opdaterer onboarding-materialer
export async function updateOnboarding(
  clientId,
  slides
) {
  try {

    const response =
      await axios.put(
        `${API_URL}/${clientId}/onboarding`,
        slides
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved opdatering:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke opdatere onboarding'
    }
  }
}

// Sletter onboarding for en virksomhed
export async function deleteOnboarding(
  clientId
) {
  try {

    const response =
      await axios.delete(
        `${API_URL}/${clientId}/onboarding`
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved sletning af onboarding:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke slette onboarding'
    }
  }
}

//Gemmer hvor langt kunden er nået i onboarding

export async function saveOnboardingProgress(
  progress
) {
  try {

    const response =
      await axios.post(
        `${API_URL}/onboarding-progress`,
        progress
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved gem af progress:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke gemme progress'
    }
  }
}