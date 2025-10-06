import { computed, watch } from 'vue'
import { useState } from '#app'
import { useActivity } from '~/composables/useActivity'

export const useStatistics = () => {
  const { activities } = useActivity()

  const STAT_VIEW = [
    { name: "Semaine", value: "week" },
    { name: "Mois", value: "month" },
    { name: "Tous", value: "all" },
  ] as const

  type StatValue = (typeof STAT_VIEW)[number]['value']

  const statSelection = useState<StatValue>('statSelection', () => 'week')

  const statsSelected = computed(() => {
    const filtered = filterByPeriod(statSelection.value)
    return calculateStats(filtered)
  })

  // 🔹 Helper pour filtrer les activités par période
// 🔹 Helper pour filtrer les activités par période
const filterByPeriod = (period: StatValue) => {
    const now = new Date()
  
    if (period === 'all') return activities.value
  
    if (period === 'week') {
      // 🔹 7 derniers jours
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(now.getDate() - 7)
      sevenDaysAgo.setHours(0, 0, 0, 0)
      
      return activities.value.filter((activity) => {
        const activityDate = new Date(activity.date)
        return activityDate >= sevenDaysAgo
      })
    }
  
    if (period === 'month') {
      // 🔹 Mois en cours
      return activities.value.filter((activity) => {
        const activityDate = new Date(activity.date)
        return activityDate.getMonth() === now.getMonth() &&
               activityDate.getFullYear() === now.getFullYear()
      })
    }
  
    return activities.value
  }
  

  // 🔹 Calcul des stats
  const calculateStats = (filteredActivities: typeof activities.value) => {
    const totalActivities = filteredActivities.length
    const totalCalories = filteredActivities.reduce((acc, a) => acc + (a.calories || 0), 0)
    const totalDistance = filteredActivities.reduce((acc, a) => acc + parseFloat(a.distance || '0'), 0)
    const totalDuration = filteredActivities.reduce((acc, a) => acc + (a.duration || 0), 0)

    const statsByType: Record<string, { count: number; calories: number; duration: number }> = {}
    filteredActivities.forEach((activity) => {
      const typeName = activity.type?.name || 'Autres'
      if (!statsByType[typeName]) statsByType[typeName] = { count: 0, calories: 0, duration: 0 }
      statsByType[typeName].count += 1
      statsByType[typeName].calories += activity.calories || 0
      statsByType[typeName].duration += activity.duration || 0
    })

    return { totalActivities, totalCalories, totalDistance, totalDuration, statsByType }
  }


  return {
    STAT_VIEW,
    statSelection,
    statsSelected,
  }
}
