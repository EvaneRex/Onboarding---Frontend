const API_URL =
  'http://localhost:2000'

export async function
getCsrfToken() {

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

  if (
    !response.ok
  ) {
    throw new Error(
      data.message ||
      'Could not get CSRF token.'
    )
  }

  return data.csrfToken
}
