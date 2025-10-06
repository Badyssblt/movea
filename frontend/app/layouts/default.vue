<script setup lang="ts">
import TabBar from '~/components/common/TabBar/TabBar.vue';
import {definePageMeta} from "#imports";


definePageMeta({
  middleware: "is-log"
})
</script>

<template>
    <div>
        <div class="p-6">
            <slot/>
        </div>
        <TabBar/>
    </div>
</template>