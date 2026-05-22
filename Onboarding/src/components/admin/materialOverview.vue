<script setup>
import { h } from 'vue'
const emit = defineEmits(['goBack'])

defineProps({
  logout: Function,
})
</script>
<template>
  <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>
</template>
