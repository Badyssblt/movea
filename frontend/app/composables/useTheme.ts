import {useCookie} from "#app";

export const useTheme = () => {
    const theme = useCookie('theme')
    const AVAILABLE_THEME = [
        {
            name: "Sombre",
            value: "dark"
        },
        {
            name: "Clair",
            value: "light"
        }
    ]

    const toggleTheme = () => {
        if(!theme.value) theme.value = "dark"

        if(theme.value === "light"){
            theme.value = "dark"
            initTheme()
            return
        }
        if(theme.value === "dark"){
            theme.value = "light"
            initTheme()
            return
        }
    }

    const initTheme = () => {
        if(theme.value === "dark") document.documentElement.classList.add('dark');
        if(theme.value === "light") document.documentElement.classList.remove('dark');
    }

    const changeTheme = (newTheme: string) => {
        theme.value = newTheme
        toggleTheme()
    }


    return {
        toggleTheme,
        changeTheme,
        initTheme,
        AVAILABLE_THEME
    }
}