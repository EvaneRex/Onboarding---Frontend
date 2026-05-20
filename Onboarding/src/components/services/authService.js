import axios from 'axios'

const API_URL = 'http://localhost:3000'

// Henter brugerens rolle ved login
export async function getUser() {
  try {

    const response = await axios.get(
      `${API_URL}/user`
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
        'Kunne ikke hente bruger'
    }
  }
}