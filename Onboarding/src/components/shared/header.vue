<script setup>
defineProps({
  logout: Function
})
</script>

<template>
  <header class="header">

    <img
      src="@/assets/icon/logo.svg"
      alt="Modulex logo"
      class="logo"
    />

    <p
      class="logout"
      @click="logout"
    >
      Log ud
    </p>

  </header>
</template>