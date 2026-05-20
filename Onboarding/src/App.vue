<script setup>
import { ref } from 'vue'

import login from './components/login.vue'

import adminDashboard from './Private/adminDashboard.vue'

import clientDashboard from './Private/clientDashboard.vue'

const currentPage = ref('login')

const currentUser = ref(null)

function handleLogin(user) {
  currentUser.value = user
  if (user.role === 'admin') {
    currentPage.value = 'adminDashboard'
  } else {
    currentPage.value = 'clientDashboard'
  }
}

function logout() {
  currentUser.value = null
  currentPage.value = 'login'
}
</script>

<template>
  <login v-if="currentPage === 'login'" @login-success="handleLogin" />
  <admindashboard v-if="currentPage === 'adminDashboard'" :user="currentUser" @logout="logout" />
  <clientDashboard v-if="currentPage === 'clientDashboard'" :user="currentUser" @logout="logout" />
</template>
