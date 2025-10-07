<template>
    <button @click="goBack" class="flex items-center gap-2">
      <Icon name="material-symbols:arrow-left-alt-rounded" size="28px" />
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  const router = useRouter()
  
  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/') // si pas d'historique, retourne à l'accueil par ex.
    }
  }
  </script>
  