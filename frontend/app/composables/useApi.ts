// composables/useApi.ts
import axios from 'axios'
import {navigateTo} from "#app";

export default function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const apiRequest = async (
    url: string,
    options: any = {},
    method: 'fetch' | 'axios' = 'fetch'
  ) => {
    const headers = {
      Authorization: token.value ? `Bearer ${token.value}` : '',
      ...options.headers
    }

    // 👇 Choix automatique de la base URL selon le contexte
    const baseURL = process.server
      ? config.public.apiBaseContainer   // entre conteneurs Docker
      : config.public.apiBase             // visible côté navigateur

    try {
      if (method === 'axios') {
        const response = await axios({
          url: `${baseURL}${url}`,
          method: options.method || 'GET',
          data: options.body,
          headers
        })
        return response.data
      } else {
        // useFetch fonctionne aussi bien SSR que client
        const { data, error } = await useFetch(`${baseURL}${url}`, {
          method: options.method || 'GET',
          body: options.body,
          headers,
          ...options
        })

        if (error.value) {
          throw error
        }

        return data.value
      }
    } catch (err) {
      if(err.value.data.statusCode === 401){
        navigateTo('/login')
      }

      return null
    }
  }

  return { apiRequest }
}
