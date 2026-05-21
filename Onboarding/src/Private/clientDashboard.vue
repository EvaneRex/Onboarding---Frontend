<script setup>
import { ref, onMounted } from 'vue'
//import clientMatView from '@/components/client/clientMatView.vue'
//import { getOnboarding } from '@/components/services/clientService.js'

// const currentView = ref('dashboard')

//const selectedMaterial = ref(null)

//const materials = ref([])

//const currentState = ref('loading')
</script>

<template>
  <section v-if="currentView === dashboard" class="dashboard">
    <div class="welcome">
      <h1>Velkommen</h1>
      <p>
        Her finder i et overblik over de forskellige onboarding materialer, her kan i også se
        status. <br />
        Når materialerne er gennemført, hører i fra os igen.
      </p>
    </div>
    <div class="materialBox">
      <li>
        <a
          href="C:\Users\Bruger\OneDrive\Desktop\OneDrive_1_19.5.2026\Billund Academy content examples\363_Pacific_interior.pdf"
        ></a>
      </li>
    </div>
  </section>
</template>
