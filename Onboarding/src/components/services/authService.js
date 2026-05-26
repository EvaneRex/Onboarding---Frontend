
const API_URL = 'http://localhost:2000'

// // Henter brugerens rolle ved login og tjekker loginstatus
// export async function getUser() {
//   try {
//     const response = await axios.get(`${API_URL}/auth/user`)

//     return response.data
//   } catch (error) {
//     console.error('Fejl ved login:', error)

//     return {
//       success: false,
//       message: 'Kunne ikke hente bruger',
//     }
//   }
// }

// // Logger ind
// export async function login(
//   username,
//   password
// ) {
//   try {

//     const response =
//       await axios.post(
//         `${API_URL}/auth/login`,
//         {
//           username,
//           password
//         }
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved login:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke logge ind'
//     }
//   }
// }

// // Logger ud
// export async function logout() {
//   try {

//     const response =
//       await axios.post(
//         `${API_URL}/auth/logout`
//       )

//     return response.data

//   } catch (error) {

//     console.error(
//       'Fejl ved logout:',
//       error
//     )

//     return {
//       success: false,
//       message:
//         'Kunne ikke logge ud'
//     }
//   }
// }

const csrfToken =
  await getCsrfToken()

// begge til at oprette en ny bruger - både admin og kunde

async function createNewClient() {
  try {

    const csrfToken =
      await getCsrfToken()

    const response =
      await fetch(
        'http://localhost:2000/register/create-new-client-account',
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

          body:
            JSON.stringify({
              name:
                name.value,

              email:
                email.value
            })
        }
      )

    const data =
      await response.json()

    console.log(
      'CLIENT RESPONSE:',
      data
    )

    if (
      response.ok
    ) {
      alert(
        'Client created!'
      )

      emit(
        'close'
      )
    }

    else {
      alert(
        data.message
      )
    }

  }

  catch (error) {
    console.error(
      error
    )

    alert(
      'Error creating client'
    )
  }
}

async function createNewAdmin() {
  try {

    const csrfToken =
      await getCsrfToken()

    const response =
      await fetch(
        'http://localhost:2000/register/create-new-admin-account',
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

          body:
            JSON.stringify({
              name:
                name.value,

              email:
                email.value
            })
        }
      )

    const data =
      await response.json()

    console.log(
      'ADMIN RESPONSE:',
      data
    )

    if (
      response.ok
    ) {
      alert(
        'Admin created!'
      )

      emit(
        'close'
      )
    }

    else {
      alert(
        data.message
      )
    }

  }

  catch (error) {
    console.error(
      error
    )

    alert(
      'Error creating admin'
    )
  }
}