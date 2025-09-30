<script setup lang="ts">
import TabBar from '~/components/common/TabBar.vue';

</script>

<template>
    <div>
        <div class="p-6">
            <slot/>
        </div>
        <TabBar/>
    </div>
</template>