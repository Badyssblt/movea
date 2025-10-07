<template>
<div class="fixed flex justify-between px-6 py-2 bottom-0 left-0 w-full backdrop-blur-md">
   <CreateTab/>
   <TabBarIcon icon="material-symbols:home-outline-rounded" routeName="index" to="/"/>
    <TabBarIcon icon="material-symbols:settings-outline-rounded" routeName="settings" to="/settings"/>

</div>
</template>

<script setup>
import TabBarIcon from './TabBarIcon.vue';
import CreateTab from './CreateTab.vue';
const route = useRoute();

const toggleDarkMode = () => {

  document.documentElement.classList.toggle('dark');
}
</script>