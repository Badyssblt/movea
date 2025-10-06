<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useActivity } from '~/composables/useActivity'
import { useDate } from '~/composables/useDate'
import {UserBadge} from "~/components/common/User";

const route = useRoute()
const id = route.params.id

const { fetchActivity } = useActivity()
const { data: activity } = await useAsyncData('activity', () => fetchActivity(id), { server: true })

const { formattedDate } = useDate(activity.value.date)

// 🔹 Computed pour enrichir les fields avec leur valeur
const fieldsWithValues = computed(() => {
  console.log(activity)
  if (!activity.value.type?.fields || !activity.value.metadata) return []

  return activity.value.type.fields.map(field => ({
    ...field,
    value: activity.value.metadata[field.key]
  }))
})
</script>

<template>
  <div>
    <CommonReturn>
      <p class="font-medium text-lg" v-if="activity.type && formattedDate">
        {{ activity.type.name }} du {{ formattedDate }}
      </p>
    </CommonReturn>

    <div class="flex items-center gap-1 mt-4">
      <UserBadge size="large" :user="activity.user"/>
      <p>Par <span class="font-medium text-lg">{{ activity.user.name }}</span></p>
    </div>

    <div class="flex flex-wrap gap-4 justify-center">
      <div class="flex flex-col items-center mt-2" v-for="field in fieldsWithValues" :key="field.key">
        <p class="text-sm">{{ field.label }}</p>
        <p class="text-xl font-medium">{{ field.value }}</p>
      </div>
    </div>
  </div>
</template>
