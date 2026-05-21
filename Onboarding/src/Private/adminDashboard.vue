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

// Sender logout til App.vue
const emit =
  defineEmits([
    'logout'
  ])

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

  <!-- DASHBOARD -->
  <section
    v-if="
      currentView ===
      'dashboard'
    "
    class="dashboard"
  >

   <Header :logout="logout" />

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

      </div>

      <!-- SURVEY -->
      <div
        class="card"
        @click="
          navigateTo(
            'survey'
          )
        "
      >

        <h2>
          Spørgeskema
        </h2>

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

  <!-- SURVEY -->
  <surveyOverview
    v-if="
      currentView ===
      'survey'
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