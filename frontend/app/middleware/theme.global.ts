// middleware/theme.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const themeCookie = useCookie('theme')

    // Valeur par défaut
    const theme = themeCookie.value || 'light'
    themeCookie.value = theme  // sauvegarde si absent

    // Ajouter ou retirer la classe .my-app-dark selon le thème
    if(import.meta.client){
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
})
