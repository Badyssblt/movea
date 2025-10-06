// composables/useActivityType.ts
import { activityTypeService } from '~/services/activityType'
import { type ActivityType } from '~/types/activity'

export const useActivityType = () => {
  const types = useState<ActivityType[]>('activityTypes', () => [])
  const loading = useState<boolean>('activityTypesLoading', () => false)
  const service = activityTypeService()

  // 🔹 Fetch all types
  const fetchTypes = async () => {
    loading.value = true
    const data = await service.getAll()
    if (data) types.value = data
    loading.value = false
  }

  // 🔹 CRUD
  const addType = async (payload: Partial<ActivityType>) => {
    await service.create(payload)
    await fetchTypes()
  }

  const updateType = async (id: string | number, payload: Partial<ActivityType>) => {
    await service.update(id, payload)
    await fetchTypes()
  }

  const removeType = async (id: string | number) => {
    await service.remove(id)
    await fetchTypes()
  }

  return {
    types,
    loading,
    fetchTypes,
    addType,
    updateType,
    removeType
  }
}
