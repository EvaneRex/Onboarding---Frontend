<script setup>
import companyStatus from '@/components/admin/companyStatus.vue'

const emit = defineEmits(['goBack'])

const props = defineProps({
  client: {
    type: Object,
    default: null,
  },
})
</script>
<template>
  <section class="companyInfo">
    <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>

    <companyStatus
      :showBack="false"
      :companyName="props.client?.clientName || props.client?.companyName || props.client?.name || 'Virksomhed'"
    />
  </section>
</template>
