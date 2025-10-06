import useApi from '~/composables/useApi'

export const activityService = () => {
  const api = useApi()

  const getMyActivities = async () => {
    return await api.apiRequest('/activity/me', {}, 'fetch')
  }

  const getById = async (id: string | number) => {
    return await api.apiRequest(`/activity/${id}`, {}, 'fetch')
  }

  const create = async (payload: any) => {
    return await api.apiRequest('/activity/create', {
      method: 'POST',
      body: payload,
    }, 'fetch')
  }

  const update = async (id: string | number, payload: any) => {
    return await api.apiRequest(`/activity/${id}`, {
      method: 'PATCH',
      body: payload,
    }, 'fetch')
  }

  // 🔹 Supprimer une activité
  const remove = async (id: string | number) => {
    return await api.apiRequest(`/activity/${id}`, {
      method: 'DELETE'
    }, 'axios')
  }

  return {
    getMyActivities,
    getById,
    create,
    update,
    remove,
  }
}
