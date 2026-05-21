<script setup>
import Header from '@/components/shared/header.vue'
import { h } from 'vue';

defineProps({
  logout: Function
})
</script>
<template>
  <header :logout="logout" />
  <div>
    <span class="icon">➜</span>
    <p>Tilbage til dashboard</p>
  </div>
  <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>
</template>
