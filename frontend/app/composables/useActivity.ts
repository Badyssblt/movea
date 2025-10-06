// composables/useActivity.ts
import { activityService } from '~/services/activity'
import { type Activity } from '~/types/activity'

export const useActivity = () => {
  const activities = useState<Activity[]>('activities', () => [])
  const loading = useState<boolean>('activitiesLoading', () => false)
  const service = activityService()
  

  const fetchActivities = async () => {
    loading.value = true
    const data = await service.getMyActivities()
    if (data) activities.value = data
    loading.value = false
  }

  const fetchActivity = async (id: number) => {
    loading.value = true
    const data = await service.getById(id)
    loading.value = false
    return data
  }

  const addActivity = async (payload: any) => {
    await service.create(payload)
    await fetchActivities()
  }

  const updateActivity = async (id: string | number, payload: any) => {
    await service.update(id, payload)
    await fetchActivities()
  }

  const removeActivity = async (id: string | number) => {
    await service.remove(id)
    await fetchActivities()
  }

  return {
    activities,
    loading,
    fetchActivities,
    addActivity,
    updateActivity,
    removeActivity,
    fetchActivity
  }
}
