<script setup>
import { computed } from 'vue'
import { ref } from 'vue'


const props =
  defineProps({
    material: Object,
    logout: Function
  })

const emit = defineEmits([
  'goBack',
  'complete'
])

// backend sendr ikke embeded youtube links, så vi skal selv konvertere dem
const materialSrc =
  computed(() => {

    if (
      props.material?.type ===
      'youtube'
    ) {

      const videoId =
        props.material.src
          .split('v=')[1]
          ?.split('&')[0]

      return `
https://www.youtube.com/embed/${videoId}
`
    }

    return props.material?.src
  })  

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
        :src="materialSrc"
        frameborder="0"
        allowfullscreen
        class="viewer"
      ></iframe>

      <!-- PDF -->
      <iframe
        v-if="material.type === 'pdf'"
        :src="materialSrc"
        class="viewer"
      ></iframe>

    </div>

   <div class="buttonRow"> 
    <button
      class="completeBtn"
      @click="completeMaterial"
    >
      Gennemført
    </button>
  </div>
  </section>
</template>