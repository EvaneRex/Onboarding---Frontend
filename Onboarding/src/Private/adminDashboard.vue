<script setup>
import { ref } from 'vue'

import Header from '@/components/shared/header.vue'

defineProps({
  logout: Function
})

// Admin components
import materialOverview
from '@/components/admin/materialOverview.vue'

import companyList
from '@/components/admin/companyList.vue'

// Styrer hvilken side der vises
const currentView =
  ref('dashboard')

// Navigation
function navigateTo(
  view
) {

  currentView.value =
    view
}

// Tilbage til dashboard
function goBack() {

  currentView.value =
    'dashboard'
}
</script>

<template>
    <Header :logout="logout" />
  <!-- DASHBOARD -->
  <section
    v-if="
      currentView ===
      'dashboard'
    "
    class="dashboard"
  >

    <!-- Welcome -->
    <section
      class="welcome"
    >

      <h1>
        Velkommen
      </h1>

      <p>
        Her kan du tilgå
        håndtering af
        materialer såsom
        upload eller
        sletning eller få
        overblik over
        virksomheder/kunder
        og derfra tildele
        relevant materiale.
      </p>

    </section>

    <!-- Dashboard cards -->
    <section
      class="dashboardCards"
    >

      <!-- MATERIALER -->
      <div
        class="card"
        @click="
          navigateTo(
            'materials'
          )
        "
      >
        <h2>
          Materialer
        </h2>

         <img 
         src="@/assets/icon/layer-group-solid-full.svg" 
         alt="materialer" 
         class="iconCard" 
         />

      </div>

      <!-- KUNDER -->
      <div
        class="card"
        @click="
          navigateTo(
            'clients'
          )
        "
      >

        <h2>
          Kunder
        </h2>

        <img 
         src="@/assets/icon/users-line-solid-full.svg" 
         alt="kunder" 
         class="iconCard" 
         />

      </div>

    </section>

  </section>

  <!-- MATERIALER -->
  <materialOverview
    v-if="
      currentView ===
      'materials'
    "
    @goBack="
      goBack
    "
  />

  <!-- KUNDER -->
  <companyList
    v-if="
      currentView ===
      'clients'
    "
    @goBack="
      goBack
    "
  />

</template>