// import axios from 'axios'

// const API_URL = 'http://localhost:3000'

// // Henter alle uploadede PDF-materialer
// export async function getPdfSlides() {
//   try {

//     const response = await axios.get(
//       `${API_URL}/onboarding/pdf-slides`
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved hentning af PDF:',
//       error
//     )

//     return []
//   }
// }

// // Uploader PDF-materiale
// export async function uploadPdf(
//   formData
// ) {
//   try {

//     const response = await axios.post(
//       `${API_URL}/onboarding/pdf-slides`,
//       formData
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved upload af PDF:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke uploade PDF'
//     }
//   }
// }

// // Henter alle YouTube-links
// export async function getYoutubeLinks() {
//   try {

//     const response = await axios.get(
//       `${API_URL}/onboarding/youtube-links`
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved hentning af videoer:',
//       error
//     )

//     return []
//   }
// }

// // Uploader YouTube-materialer
// export async function uploadYoutubeLinks(
//   links
// ) {
//   try {

//     const response = await axios.post(
//       `${API_URL}/onboarding/youtube-links`,
//       links
//     )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved upload af video:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke uploade video'
//     }
//   }
// }

// // Henter kundens onboarding-materialer
// export async function getOnboarding() {
//   try {

//     const response =
//       await axios.get(
//         `${API_URL}/onboarding`
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved hentning af onboarding:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Ingen onboarding endnu'
//     }
//   }
// }

import {
  mockPdfSlides,
  mockYoutubeLinks,
  mockOnboarding
}
from '@/api/mockApi'

// Henter PDF'er
export async function
getPdfSlides() {

  return mockPdfSlides
}

// Upload PDF
export async function
uploadPdf(
  formData
) {

  return {
    success: true,
    formData
  }
}

// Henter videoer
export async function
getYoutubeLinks() {

  return mockYoutubeLinks
}

// Upload video
export async function
uploadYoutubeLinks(
  links
) {

  return {
    success: true,
    links
  }
}

// Henter onboarding
export async function
getOnboarding() {

  return mockOnboarding
}

