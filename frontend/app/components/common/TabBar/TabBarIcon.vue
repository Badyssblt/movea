<template>
     <NuxtLink :to="to" class="flex flex-col w-12 h-12 rounded-full items-center justify-center border border-primary-300">
        <Icon :name="name" size="36px"/>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: string,
    routeName?: string,
    to: string,
    currentRoute?: string
}>()

const route = useRoute();
const routeName = ref(route.name)

watch(() => route.name, (newRouteName) => {
    routeName.value = newRouteName;
});


const name = computed(() => {
    let rawIcon = props.icon;
    
    if(routeName.value === props.routeName) {
        rawIcon = rawIcon.replace('outline-', '');
    }
    return rawIcon;
});
</script>