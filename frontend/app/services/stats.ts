import { useCookie, useNuxtApp, navigateTo } from '#app'


export default function useStatsService() {
    const api = useApi()

    const getUserStats = async () => {
        try {
            const res = await api.apiRequest('/statistics', {}, 'fetch');
            console.log(res);
            
            return res.data;
        } catch (err: any) {
            console.error('Error fetching user statistics:', err);
            throw err;
        }
    };

    return { getUserStats };
}