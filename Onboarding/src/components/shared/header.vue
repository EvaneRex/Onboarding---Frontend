<script setup>
import { ref } from 'vue'
import { logout } from '../services/authService'

const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

async function logUd() {
  try {
    const res = await logout()
    alert('Du er nu logget ud')
    window.location.href = '/login'
  } catch (err) {
    alert('Kunne ikke logge ud')
  }
}

function skiftAdgangskode() {
  alert('Skift adgangskode')
}
</script>

<template>
  <header>
    <img src="" alt="" />
    <nav class="profil-menu">
      <button @click="toggleDropdown">Min profil ▼</button>
      <ul v-if="dropdownOpen" class="dropdown">
        <li @click="skiftAdgangskode">Skift adgangskode</li>
        <li @click="logUd">Log ud</li>
      </ul>
    </nav>
  </header>
</template>
