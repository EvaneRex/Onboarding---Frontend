<script setup>
import { ref, onMounted } from 'vue'

import companyInfo from '@/components/admin/companyInfo.vue'

import { getAllClients, deleteClient } from '@/components/services/customerService'

// Event til parent
const emit = defineEmits(['goBack'])

// Hvilken side der vises
const currentView = ref('list')

// Valgt virksomhed
const selectedCompany = ref(null)

// Liste med virksomheder
const clients = ref([])

const loading = ref(true)

const errorMessage = ref('')

// Henter alle kunder
async function loadClients() {
  loading.value = true

  const response = await getAllClients()

  // Fejl fra backend
  if (response.success === false) {
    errorMessage.value = response.message

    loading.value = false

    return
  }

  // Gem kunder
  clients.value = response

  loading.value = false
}

// Åbn virksomhed
function openCompany(client) {
  selectedCompany.value = client

  currentView.value = 'companyInfo'
}

// Tilbage til liste
function goBackToList() {
  currentView.value = 'list'
}

// Slet virksomhed
async function removeClient(clientId) {
  const confirmed = confirm('Er du sikker på at du vil slette virksomheden?')

  if (!confirmed) return

  const response = await deleteClient(clientId)

  if (response.success) {
    loadClients()
  }
}

// Hent kunder når siden loader
onMounted(() => {
  loadClients()
})
</script>

<template>

  <!-- COMPANY LIST -->
  <section v-if="currentView === 'list'" class="companyList">

    <!-- Tilbage -->
    <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>

    <!-- Top section -->
    <section class="topSection">
      <h1>Oversigt over kunder</h1>

      <div class="topButtons">
        <button class="createBtn">
          Opret bruger
        </button>

        <button class="createBtn">
          Opret virksomhed
        </button>
      </div>
    </section>

    <!-- Table -->
    <section class="tableBox">
      <!-- Loading -->
      <div v-if="loading">Henter kunder...</div>

      <!-- Error -->
      <div v-else-if="errorMessage">
        {{ errorMessage }}
      </div>

      <!-- Table -->
      <table v-else>
        <thead>
          <tr>
            <th>Virksomhed</th>

            <th>Handlinger</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="client in clients" :key="client.clientId">
            <td>
              {{ client.clientName }}
            </td>

            <td class="actions">
              <!-- Åbn -->
              <button @click="openCompany(client)">
                <img
                  src="@/assets/icon/arrow-up-right-from-square-solid-full.svg"
                  alt="Åben kunde"
                  class="iconCompanyList"
                />

                Åben
              </button>

              <!-- Slet -->
              <button @click="removeClient(client.clientId)">
                <img
                  src="@/assets/icon/trash-solid-full.svg"
                  alt="Slet kunde"
                  class="iconCompanyList"
                />

                Slet
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>

  <!-- COMPANY INFO -->
  <companyInfo
    v-if="currentView === 'companyInfo'"
    :client="selectedCompany"
    @goBack="goBackToList"
  />
</template>
