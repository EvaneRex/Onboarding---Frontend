// import axios from 'axios'

// const API_URL = 'http://localhost:3000'

// // Henter alle virksomheder
// export async function getAllClients() {
//   try {

//     const response = await axios.get(
//       `${API_URL}/clients/all-clients`
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved hentning af virksomheder:',
//       error
//     )

//     return []
//   }
// }

// // Henter info om valgt virksomhed
// export async function getClientInfo(
//   clientId
// ) {
//   try {

//     const response = await axios.get(
//       `${API_URL}/clients/client-info/${clientId}`
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved hentning af virksomhed:',
//       error
//     )

//     return null
//   }
// }

// // Sletter virksomhed
// export async function deleteClient(
//   clientId
// ) {
//   try {

//     const response =
//       await axios.delete(
//         `${API_URL}/clients/${clientId}`
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved sletning:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke slette virksomhed'
//     }
//   }
// }

// // Tildeler onboarding-materialer
// export async function assignOnboarding(
//   clientId,
//   slides
// ) {
//   try {

//     const response =
//       await axios.post(
//         `${API_URL}/onboarding/${clientId}/onboarding`,
//         slides
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved onboarding:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke tildele onboarding'
//     }
//   }
// }

// // Opdaterer onboarding-materialer
// export async function updateOnboarding(
//   clientId,
//   slides
// ) {
//   try {

//     const response =
//       await axios.put(
//         `${API_URL}/onboarding/${clientId}/onboarding`,
//         slides
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved opdatering:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke opdatere onboarding'
//     }
//   }
// }

// // Sletter onboarding for en virksomhed
// export async function deleteOnboarding(
//   clientId
// ) {
//   try {

//     const response =
//       await axios.delete(
//         `${API_URL}/onboarding/${clientId}/onboarding`
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved sletning af onboarding:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke slette onboarding'
//     }
//   }
// }

// //Gemmer hvor langt kunden er nået i onboarding

// export async function saveOnboardingProgress(
//   progress
// ) {
//   try {

//     const response =
//       await axios.post(
//         `${API_URL}/onboarding/onboarding-progress`,
//         progress
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved gem af progress:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke gemme progress'
//     }
//   }
// }

import {
  mockClients,
  mockClientInfo
}
from '@/api/mockApi'

// Henter alle virksomheder
export async function getAllClients() {

  return mockClients
}

// Henter info om valgt virksomhed
export async function
getClientInfo(
  clientId
) {

  return {
    ...mockClientInfo,
    clientId
  }
}

// Sletter virksomhed
export async function
deleteClient(
  clientId
) {

  return {
    success: true,
    message:
      `Klient ${clientId} slettet`
  }
}

// Tildeler onboarding
export async function
assignOnboarding(
  clientId,
  slides
) {

  return {
    success: true,
    clientId,
    slides
  }
}

// Opdater onboarding
export async function
updateOnboarding(
  clientId,
  slides
) {

  return {
    success: true,
    clientId,
    slides
  }
}

// Sletter onboarding
export async function
deleteOnboarding(
  clientId
) {

  return {
    success: true,
    message:
      'Onboarding slettet'
  }
}

// Gemmer progress
export async function
saveOnboardingProgress(
  progress
) {

  return {
    success: true,
    progress
  }
}