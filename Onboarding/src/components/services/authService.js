import { getCsrfToken } from '@/components/services/csrfService'

const API_URL = 'http://localhost:2000'

// Opret klient
export async function createNewClientAccount(clientData) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/register/create-new-client-account`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        'x-csrf-token': csrfToken,
      },

      credentials: 'include',

      body: JSON.stringify(clientData),
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,

      message: 'Could not create client',
    }
  }
}

// Opret admin
export async function createNewAdminAccount(adminData) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${API_URL}/register/create-new-admin-account`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        'x-csrf-token': csrfToken,
      },

      credentials: 'include',

      body: JSON.stringify(adminData),
    })

    return await response.json()
  } catch (error) {
    console.error(error)

    return {
      success: false,

      message: 'Could not create admin',
    }
  }
}
