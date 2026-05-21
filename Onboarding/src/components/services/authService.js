import axios from 'axios'

const API_URL = 'http://localhost:3000'

// Henter brugerens rolle ved login og tjekker loginstatus
export async function getUser() {
  try {
    const response = await axios.get(`${API_URL}/auth/user`)

    return response.data
  } catch (error) {
    console.error('Fejl ved login:', error)

    return {
      success: false,
      message: 'Kunne ikke hente bruger',
    }
  }
}

// Logger ind
export async function login(
  username,
  password
) {
  try {

    const response =
      await axios.post(
        `${API_URL}/auth/login`,
        {
          username,
          password
        }
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved login:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke logge ind'
    }
  }
}

// Logger ud
export async function logout() {
  try {

    const response =
      await axios.post(
        `${API_URL}/auth/logout`
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved logout:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke logge ud'
    }
  }
}

// begge til at oprette en ny bruger - både admin og kunde

export async function
createNewClientAccount(
  surveyId,
  clientData
) {
  try {

    const response =
      await axios.post(
        `${API_URL}/register/create-new-client-account/${surveyId}`,
        clientData
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved oprettelse af klient:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke oprette klient'
    }
  }
}

export async function
createNewAdminAccount(
  adminData
) {
  try {

    const response =
      await axios.post(
        `${API_URL}/register/create-new-admin-account`,
        adminData
      )

    return response.data

  } catch (error) {

    console.error(
      'Fejl ved oprettelse af admin:',
      error
    )

    return {
      success: false,
      message:
        'Kunne ikke oprette admin'
    }
  }
}