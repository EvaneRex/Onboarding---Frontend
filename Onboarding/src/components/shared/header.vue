<script setup>
defineProps({
  logout: Function,
  user: Object,
})
</script>

<template>
  <header class="header">
    <img src="@/assets/icon/logo.svg" alt="Modulex logo" class="logo" />

    <p v-if="user" class="logout" @click="logout">Log ud</p>
  </header>
</template>
