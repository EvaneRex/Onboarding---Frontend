<script setup>
import Header from '@/components/shared/header.vue'
const emit = defineEmits(['goBack'])

defineProps({
  logout: Function,
})
</script>
<template>
  <Header :logout="logout" />
  <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>
</template>
