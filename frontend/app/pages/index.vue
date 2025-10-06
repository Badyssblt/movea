<template>
  <div v-if="user">
    <h2 class="font-medium text-2xl">Bonjour, {{ user.name }} !</h2>

    <div>
      <div class="flex justify-between items-end">
        <h2 class="font-bold text-xl">Données</h2>
        <SelectButton size="small" v-model="statSelection" :options="STAT_VIEW" option-label="name" option-value="value"/> 
      </div>
      <div v-if="stats" class="flex flex-col gap-4 mt-2">
        <StatsCard title="Toutes vos séances" :value="stats.totalActivities" />
        <StatsCard title="Total de calories brulées" :value="stats.totalCalories" />
      </div>
    </div>

    <div class="mt-6">
      <div class="flex justify-between items-end">
        <h2 class="font-bold text-xl">Les dernières activités</h2>
        <NuxtLink to="/activity" class="text-primary-500 hover:underline">Voir tout</NuxtLink>
      </div>

      <div class="flex flex-col gap-2 mt-2">
        <ActivityCard
          v-for="(activity, index) in lastActivities"
          :key="index"
          :activity="activity"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ActivityCard from '~/components/features/activity/activityCard.vue'
import StatsCard from '~/components/features/dashboard/StatsCard.vue'

definePageMeta({
  middleware: 'is-log'
})

const user = useCookie('user')
const { activities, fetchActivities } = useActivity()
const { statsSelected, STAT_VIEW, statSelection } = useStatistics()

 
await useAsyncData('activities', fetchActivities, { server: true })

const stats = statsSelected

const lastActivities = computed(() =>
  [...activities.value] // clone pour ne pas muter le tableau
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // tri décroissant
    .slice(0, 6) // ne garder que les 6 premières
)
</script>
