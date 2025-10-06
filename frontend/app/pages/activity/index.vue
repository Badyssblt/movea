<script setup lang="ts">
import { ref, computed } from 'vue'
import ActivityCard from '~/components/features/activity/activityCard.vue'
import { useActivity } from '~/composables/useActivity'
import { useDate } from '~/composables/useDate'

const { activities, fetchActivities } = useActivity()
await useAsyncData('activities', fetchActivities, { server: true })

const search = ref('')

// Computed pour filtrer par type name, field label et date
const filteredActivities = computed(() => {
  if (!activities.value) return []

  const query = search.value.toLowerCase().trim()
  if (!query) return activities.value

  return activities.value.filter((activity) => {
    // 1️⃣ Nom du type
    const typeName = activity.type?.name?.toLowerCase() || ''
    if (typeName.includes(query)) return true

    // 2️⃣ Labels des champs
    const fieldsMatch = activity.type?.fields?.some((field) =>
        field.label.toLowerCase().includes(query)
    )
    if (fieldsMatch) return true

    // 3️⃣ Date de l'activité via useDate
    const { formattedDate } = useDate(activity.date, 'DD/MM/YYYY')
    if (formattedDate.value.toLowerCase().includes(query)) return true

    return false
  })
})
</script>


<template>
  <div>
    <div class="flex flex-col">
      <h2 class="font-bold text-xl">Toutes vos activités</h2>
      <div class="flex flex-col gap-2 my-1">
        <InputText v-model="search" placeholder="Activité, date" id="search" autocomplete="off"/>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-2">
      <ActivityCard
          v-for="(activity, index) in filteredActivities"
          :key="index"
          :activity="activity"
      />
    </div>
  </div>
</template>
