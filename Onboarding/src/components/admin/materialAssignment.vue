<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  getPdfSlides,
  getYoutubeLinks,
  assignOnboarding,
} from '@/components/services/materialService'
import { sendRegisterInvitation } from '../services/onboardingService'

const emit = defineEmits(['close', 'save'])

const props = defineProps({
  client: Object,
})

const dialogRef = ref(null)

const allMaterials = ref([])
const selectedMaterials = ref([])

onMounted(async () => {
  dialogRef.value?.showModal()

  //hent pdfer
  const pdfs = await getPdfSlides()

  const formattedPdfs = pdfs.map((pdf) => ({
    id: pdf.src,
    type: 'pdf',
    src: pdf.src,
    title: pdf.filename || pdf.filnavn || pdf.name || 'PDF dokument',
  }))

  //hent youtube
  const videos = await getYoutubeLinks()

  const formattedVideos = videos.map((video) => ({
    id: video.id,
    type: 'youtube',
    src: video.url,
    title: video.titel,
  }))

  allMaterials.value = [...formattedPdfs, ...formattedVideos]

  // allerede tildelte materialer
  selectedMaterials.value = props.client?.onboardingSlides?.map((material) => material.src) || []
})

async function saveMaterials() {
  const selected = allMaterials.value.filter((material) =>
    selectedMaterials.value.includes(material.src),
  )

  const response = await assignOnboarding(props.client.clientId, selected)

  if (response.success) {
    await sendRegisterInvitation(props.client.clientId)

    emit('save', selected)

    closeModal()
  }
}

function closeModal() {
  dialogRef.value.close()

  emit('close')
}

onBeforeUnmount(() => {
  dialogRef.value?.close()
})
</script>

<template>
  <dialog ref="dialogRef" class="materialDialog">
    <button class="closeBtn" @click="closeModal">✕</button>

    <section class="modalTop">
      <div>
        <h1>
          {{ props.client?.clientName }}
        </h1>

        <p>
          Tildel materiale til
          {{ props.client?.clientName }}
        </p>
      </div>
    </section>

    <section class="tableBox">
      <table>
        <thead>
          <tr>
            <th>Materialer</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="material in allMaterials" :key="material.src">
            <td>
              {{ material.title }}
            </td>

            <td>
              <label>
                <input type="checkbox" :value="material.src" v-model="selectedMaterials" />

                Tildel
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="saveSection">
      <button class="createBtn" @click="saveMaterials">Tildel og send invitation</button>
    </div>
  </dialog>
</template>
