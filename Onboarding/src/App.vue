<script setup>
import { onMounted, ref } from 'vue'

import Login from './components/login.vue'
import AdminDashboard from './Private/adminDashboard.vue'
import ClientDashboard from './Private/clientDashboard.vue'
import Survey from './components/survey.vue'

const currentPage = ref(null)
const currentUser = ref(null)
const isReady = ref(false)

onMounted(async () => {
  const path = window.location.pathname

  if (path === '/survey') {
    currentPage.value = 'survey'
    isReady.value = true
    return
  }

  try {
    const response = await fetch('http://localhost:2000/auth/user', {
      credentials: 'include',
    })

    const data = await response.json()

    if (data.success && data.role) {
      currentUser.value = {
        id: data.id,
        username: data.username,
        role: data.role,
        onboardingCourse: data.onboardingCourse,
      }

      currentPage.value = data.role === 'admin' ? 'adminDashboard' : 'clientDashboard'
    } else {
      currentPage.value = 'login'
    }
  } catch (error) {
    console.error(error)
    currentPage.value = 'login'
  } finally {
    isReady.value = true
  }
})

function handleLogin(user) {
  if (!user || !user.role) {
    alert('Brugerdata mangler eller er ugyldig!')
    currentUser.value = null
    currentPage.value = 'login'
    return
  }

  currentUser.value = user
  currentPage.value = user.role === 'admin' ? 'adminDashboard' : 'clientDashboard'
}

function logout() {
  currentUser.value = null
  currentPage.value = 'login'
}

function closeSurvey() {
  window.history.pushState({}, '', '/')
  currentPage.value = 'login'
}
</script>

<template>
  <template v-if="isReady">
    <Login v-if="currentPage === 'login'" @login-success="handleLogin" />

    <AdminDashboard v-if="currentPage === 'adminDashboard'" :user="currentUser" :logout="logout" />

    <ClientDashboard
      v-if="currentPage === 'clientDashboard'"
      :user="currentUser"
      :logout="logout"
    />

    <Survey v-if="currentPage === 'survey'" @close="closeSurvey" />
  </template>
</template>
