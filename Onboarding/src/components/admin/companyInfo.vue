<script setup>
import header from '@/components/shared/header.vue'

defineProps({
  logout: Function,
})
</script>
<template>
  <header :logout="logout" />
  <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>
</template>
