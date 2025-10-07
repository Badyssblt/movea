<template>
    <NuxtLink :to="'/activity/' + activity.id" class="border border-primary-300 rounded p-2" v-if="activity">
        <div class="flex items-center gap-2">
            <UserBadge :user="activity.user" size="large"/>
            <p v-if="activity.type && formattedDate">{{  activity.type.name  }} du {{  formattedDate  }}</p>
        </div>

        <div class="flex justify-between mt-1">
            <div class="flex flex-col items-center" v-for="field in topFields" :key="field.key">
                <p class="text-sm">{{ field.label }}</p>
                <p class="text-xl font-medium">{{  field.value  }}</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import UserBadge from '~/components/common/User/UserBadge.vue';
import { type Activity } from '~/types/activity';

const props = defineProps<{
    activity: Activity
}>();

const { formattedDate } = useDate(props.activity.date);


// 🔹 Computed pour les 3 champs les plus “importants”
const topFields = computed(() => {
  if (!props.activity.type?.fields || !props.activity.metadata) return []

  // On enrichit chaque field avec sa valeur réelle
  const fieldsWithValues = props.activity.type.fields
      .map((field) => ({
        ...field,
        value: props.activity.metadata[field.key]
      }))
      .filter((f) => f.value != null)

  // On trie par valeur décroissante (si numérique)
  const sorted = [...fieldsWithValues].sort((a, b) => {
    const valA = Number(a.value) || 0
    const valB = Number(b.value) || 0
    return valB - valA
  })

  return sorted.slice(0, 3)
})

</script>
