<script setup>
import { ref, onMounted, computed } from 'vue'

import companyInfo from '@/components/admin/companyInfo.vue'
import createUser from '@/components/admin/CreateUserModule.vue'
import { getAllClients, deleteClient, getClientInfo } from '@/components/services/customerService'
import { getAllSurveys } from '../services/surveyService'

const surveys = ref([])

// Event til parent
const emit = defineEmits(['goBack'])

// Hvilken side der vises
const showCompanyInfo = ref(false)

// Valgt virksomhed
const selectedCompany = ref(null)

// Liste med virksomheder
const clients = ref([])

const loading = ref(true)

const errorMessage = ref('')
const showCreateUser = ref(false)

const selectedSurvey = ref(null)

function openCreateUser(company = null) {
  selectedSurvey.value = company

  showCreateUser.value = true
}

function closeCreateUser() {
  showCreateUser.value = false
  loadClients(false)
  loadSurveys()
}

// Henter alle kunder
async function loadClients(showLoading = true) {
  if (showLoading) loading.value = true

  const response = await getAllClients()

  if (response.success === false) {
    errorMessage.value = response.message
    loading.value = false
    return
  }

  clients.value = response
  loading.value = false
}

async function loadSurveys() {
  const response = await getAllSurveys()
  surveys.value = Array.isArray(response) ? response : []
}

const surveyCompanies = computed(() => {
  return surveys.value
    .map((survey) => {
      const companyName = survey.survey.find((item) => item.question === 'Virksomhedsnavn')?.answer

      const companyEmail = survey.survey.find((item) => item.question === 'Email')?.answer

      return {
        name: companyName,
        email: companyEmail,
        surveyId: survey.surveyId,
        surveyData: survey.survey,
      }
    })
    .filter((company) => company.name) // Filtrer kun virksomheder med et navn
})

const clientNames = computed(() => clients.value.map((c) => c.clientName.trim().toLowerCase()))

const surveyCompaniesWithoutUser = computed(() =>
  surveyCompanies.value.filter((s) => !clientNames.value.includes(s.name.trim().toLowerCase())),
)

async function openCompany(client) {
  const clientInfo = await getClientInfo(client.clientId)
  if (!clientInfo) {
    alert('Kunne ikke hente information om virksomheden.')
    return
  }
  // find survey ud fra navn
  const matchingSurvey =
    surveyCompanies.value.find(
      survey =>
        survey.name
          ?.trim()
          .toLowerCase() ===
        client.clientName
          ?.trim()
          .toLowerCase()
    )

    selectedCompany.value = {
    ...clientInfo,  
    surveyAnswers:
      matchingSurvey
        ?.surveyData || []
  }

  showCompanyInfo.value = true

}

// Tilbage til liste
function goBackToList() {
  showCompanyInfo.value = false
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

// Refresk listen
// Kunne have været polling eller endnu bedre en websocket men det her var den nemmeste løsning med det tid vi havde tilbage.
function refreshList() {
  loadClients(false)
  loadSurveys()
}

// Hent kunder når siden loader
onMounted(() => {
  loadClients()
  loadSurveys()
})
</script>

<template>
  <!-- COMPANY LIST -->
  <section class="companyList">
    <!-- Tilbage -->
    <button class="backBtn" @click="emit('goBack')">⟵ Tilbage til dashboard</button>

    <!-- Top section -->
    <section class="topSection">
      <h1>Oversigt over kunder</h1>

      <div class="topButtons">
        <button class="createBtn" @click="openCreateUser">Opret bruger</button>
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
            <th style="text-align: right">
              <button class="refreshBtn" @click="refreshList" title="Opdater listen">
                <img src="@/assets/icon/refresh.svg" alt="Opdater" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Virksomheder fra spørgeskemaer uden bruger -->
          <tr v-for="company in surveyCompaniesWithoutUser" :key="company.surveyId">
            <td>
              {{ company.name }}
              <span title="Nyt svar fra spørgeskema">
                <img
                  src="@/assets/icon/alert.svg"
                  alt="Nyt svar"
                  style="width: 18px; vertical-align: middle; margin-left: 6px"
                />
              </span>
            </td>
            <td class="actions">
              <button @click="openCreateUser(company)">
                <img src="@/assets/icon/add.svg" class="iconCompanyList" /> Opret bruger
              </button>
              <button @click="openCompany(company)">
                <img
                  src="@/assets/icon/arrow-up-right-from-square-solid-full.svg"
                  alt="Åben kunde"
                  class="iconCompanyList"
                />
                Åben
              </button>
              <button @click="removeClient(company.surveyId)">
                <img
                  src="@/assets/icon/trash-solid-full.svg"
                  alt="Slet kunde"
                  class="iconCompanyList"
                />
                Slet
              </button>
            </td>
          </tr>
          <!-- Eksisterende kunder -->
          <tr v-for="client in clients" :key="client.clientId">
            <td>
              {{ client.clientName }}
            </td>
            <td class="actions">
              <button @click="openCompany(client)">
                <img
                  src="@/assets/icon/arrow-up-right-from-square-solid-full.svg"
                  alt="Åben kunde"
                  class="iconCompanyList"
                />
                Åben
              </button>
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
  <companyInfo v-if="showCompanyInfo" :client="selectedCompany" @goBack="goBackToList" />

  <createUser v-if="showCreateUser" :surveyData="selectedSurvey" @close="closeCreateUser" />
</template>
