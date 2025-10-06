<template>
    <div class="absolute right-6 bottom-16">
        <button v-show="!visible" @click="visible = true" class="bg-primary h-12 w-12 flex justify-center items-center rounded-full"><Icon name="material-symbols:add-2-rounded" class="text-primary-contrast" size="36px"/></button>
    </div>
    <Drawer v-model:visible="visible"position="bottom" class="!bg-transparent !border-none" :show-close-icon="false">
        <div class="flex flex-col gap-2 absolute bottom-16 right-6">
            <NuxtLink to="/activity/create" @click="visible = false" class="flex gap-2 items-center">
                <p class="text-primary bg-primary-contrast h-fit p-2 rounded">Ajouter une séance</p>
                <button class="border border-primary-300 flex gap-2 h-12 w-12 backdrop-blur-sm flex justify-center items-center rounded-full bg-primary/10">
                    <Icon name="material-symbols:exercise" size="36px" class="text-primary-contrast"/>
                </button>
            </NuxtLink>
        </div>
    </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';

const visible = ref(false);
</script>