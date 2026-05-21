<script setup>
import Header from '@/components/shared/header.vue'

defineProps({
  logout: Function
})

</script>
<template>
  <Header :logout="logout" />
  <div>
    <span class="icon">➜</span>
    <p>Tilbage til dashboard</p>
  </div>
</template>
