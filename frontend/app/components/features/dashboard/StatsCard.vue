<template>
    <div class="flex flex-col gap-2 border border-primary-300 rounded p-4 items-center justify-center">
        <p class="text-6xl font-medium">{{  value  }}</p>
        <p class="font-medium">{{  title  }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    value: number | string,
}>()
</script>