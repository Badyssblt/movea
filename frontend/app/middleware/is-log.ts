// middleware/is-log.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
    // Récupération du cookie côté serveur ou client
    const token = useCookie('token').value

    if (!token) {
        // Redirection immédiate avant que la page se charge
        return navigateTo('/login')
    }
})
