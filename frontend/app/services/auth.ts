import { useCookie, useNuxtApp, navigateTo } from '#app'

export default function useAuthService() {
    const api = useApi()

    const login = async (email: string, password: string) => {
        try {
            const res = await api.apiRequest('/auth/login', {
                method: 'POST',
                body: { email, password }
            }, 'axios'
            )
            console.log(res);
            
            const token = useCookie('token')
            const user = useCookie('user')
            token.value = res.access_token
            user.value = res.user
            navigateTo('/')
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    };
    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await nuxtApp.$api.post('/auth/register', { name, email, password });

            useCookie('token', res.data.access_token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
                secure: process.env.NODE_ENV === 'production',
            });

            return res.data;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    };

    const logout = () => {
        const token = useCookie("token")
        const user = useCookie("user")
        token.value = null
        user.value = null

    };

    const getToken = () => cookies('token');

    return { login, register, logout, getToken };
}
