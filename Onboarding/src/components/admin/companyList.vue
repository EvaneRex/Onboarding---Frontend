<!--
Denne er komponent, er hvor listen af alle oprettede brugere og ikke oprettede brugere ligger. (klient)
-->
<script setup>
import { ref, onMounted, computed } from 'vue'

import companyInfo from '@/components/admin/companyInfo.vue'
import createUser from '@/components/admin/CreateUserModule.vue'
import {
  getAllClients,
  deleteClient,
  getClientInfo,
  deleteAnsweredSurvey,
} from '@/components/services/customerService'
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

function isAllCompleted(client) {
  const slides = client?.onboardingSlides || []
  if (!Array.isArray(slides) || slides.length === 0) return false
  return slides.every((m) => m.complete === true)
}

// Henter alle kunder
async function loadClients(showLoading = true) {
  try {
    if (showLoading) loading.value = true

    const response = await getAllClients()

    if (!response) {
      throw new Error('Ingen svar')
    }

    if (response.success === false) {
      errorMessage.value = response.message
      clients.value = []
      return
    }

    const data = response.data ?? response

    if (!Array.isArray(data)) {
      throw new Error('Client er ikke et array')
    }

    clients.value = data
    errorMessage.value = ''
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Fejl ved hentning af kunder'
    clients.value = []
  } finally {
    loading.value = false
  }
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

// Så dem der er registreret og færdige med onboarding bliver rykket op i listen
const sortedClients = computed(() => {
  return [...clients.value].sort((a, b) => {
    const aCompleted = isAllCompleted(a)
    const bCompleted = isAllCompleted(b)

    if (aCompleted && !bCompleted) return -1
    if (!aCompleted && bCompleted) return 1

    return 0
  })
})

const surveyCompaniesWithoutUser = computed(() =>
  surveyCompanies.value.filter((s) => !clientNames.value.includes(s.name.trim().toLowerCase())),
)

async function openCompany(client) {
  // Hvis det er survey virksomhed uden client
  if (!client.clientId) {
    selectedCompany.value = {
      clientName: client.name,
      surveyAnswers: client.surveyData || [],
      onboardingSlides: [],
    }

    showCompanyInfo.value = true
    return
  }

  const clientInfo = await getClientInfo(client.clientId)

  if (!clientInfo) {
    alert('Kunne ikke hente information om virksomheden.')
    return
  }

  const matchingSurvey = surveyCompanies.value.find(
    (survey) => survey.name?.trim().toLowerCase() === client.clientName?.trim().toLowerCase(),
  )

  selectedCompany.value = {
    ...clientInfo,
    surveyAnswers: matchingSurvey?.surveyData || [],
  }

  showCompanyInfo.value = true
}

// Slet virksomhed / survey
async function removeClient(id, isSurvey = false) {
  const confirmed = confirm('Er du sikker på at du vil slette?')
  if (!confirmed) return

  const response = isSurvey ? await deleteAnsweredSurvey(id) : await deleteClient(id)

  if (response.success) {
    await loadClients(false)
    await loadSurveys()
  } else {
    alert(response.message || 'Sletning fejlede')
  }
}

// Tilbage til liste
function goBackToList() {
  showCompanyInfo.value = false
}

// Refresh listen
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
              <button @click="removeClient(company.surveyId, true)">
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
          <tr v-for="client in sortedClients" :key="client.clientId">
            <td>
              {{ client.clientName }}
              <span v-if="isAllCompleted(client)" title="Alle materialer gennemført">
                <img
                  src="@/assets/icon/checkmark.svg"
                  alt="Fuldført"
                  style="width: 18px; vertical-align: middle; margin-left: 6px"
                />
              </span>
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
