<script setup>

</script>

<template>
  <NuxtLayout>
    <transition name="slide" mode="out-in">
      <NuxtPage/>
    </transition>
  </NuxtLayout>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.1s ease;
  position: absolute;
  width: 100%;
}

.slide-enter-from {
  transform: translateX(100%); /* arrive de la droite */
}
.slide-leave-to {
  transform: translateX(-100%); /* sort vers la gauche */
}

</style>