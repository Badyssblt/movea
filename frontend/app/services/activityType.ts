// services/activityType.ts
import useApi from '~/composables/useApi'
import { type ActivityType } from '~/types/activity'

export const activityTypeService = () => {
  const api = useApi()

  // 🔹 Récupérer tous les types d'activités
  const getAll = async (): Promise<ActivityType[]> => {
    return await api.apiRequest('/activity-type', {}, 'fetch')
  }

  // 🔹 Récupérer un type d'activité par ID
  const getById = async (id: string | number): Promise<ActivityType> => {
    return await api.apiRequest(`/activity-type/${id}`, {}, 'fetch')
  }

  // 🔹 Créer un type d'activité
  const create = async (payload: Partial<ActivityType>) => {
    return await api.apiRequest('/activity-type', {
      method: 'POST',
      body: payload
    }, 'fetch')
  }

  // 🔹 Mettre à jour un type d'activité
  const update = async (id: string | number, payload: Partial<ActivityType>) => {
    return await api.apiRequest(`/activity-type/${id}`, {
      method: 'PATCH',
      body: payload
    }, 'fetch')
  }

  // 🔹 Supprimer un type d'activité
  const remove = async (id: string | number) => {
    return await api.apiRequest(`/activity-type/${id}`, {
      method: 'DELETE'
    }, 'fetch')
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  }
}
