<script setup>
const emit = defineEmits(['goBack'])


</script>
<template>
  <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>
</template>
