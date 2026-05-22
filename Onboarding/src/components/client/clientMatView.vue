<script setup>

defineProps({
  material: Object,
  logout: Function
})



const emit = defineEmits([
  'goBack',
  'complete'
])

const completeMaterial = () => {
  emit('complete', props.material.index)
}
</script>

<template>
  <section class="materialView">
    
    <button
      class="backBtn"
      @click="emit('goBack')"
    >
      ← Tilbage
    </button>

    <div class="content">

      <!-- YOUTUBE -->
      <iframe
        v-if="material.type === 'youtube'"
        :src="material.src"
        frameborder="0"
        allowfullscreen
        class="viewer"
      ></iframe>

      <!-- PDF -->
      <iframe
        v-if="material.type === 'pdf'"
        :src="material.src"
        class="viewer"
      ></iframe>

    </div>

    <button
      class="completeBtn"
      @click="completeMaterial"
    >
      Marker som gennemført
    </button>

  </section>
</template>