<template>
    <div>
        <CommonReturn>
            <p class="text-xl font-medium">Créer une activité</p>
        </CommonReturn>

        <div class="mt-4 flex flex-col gap-4">

            <div class="flex flex-col">
                <Label for="type">Type d'activité</Label>
                <Select v-model="type" id="type"  :options="types" option-label="name" placeholder="Veuillez sélectionner un type de sport"/>
            </div>

            <div v-if="type" class="flex flex-col" v-for="field in type.fields" :key="field.key">
                <label>{{ field.label }}</label>
                <div class="flex flex-col gap-4">
                    <InputText
                    v-if="field.type === 'text' || field.type === 'number'"
                    v-model.number="field.value"
                    />
                    <input
                    v-else-if="field.type === 'boolean'"
                    type="checkbox"
                    v-model="field.value"
                    />
                    <select v-else-if="field.type === 'select'" v-model="field.value">
                    <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                    <input
                    v-else-if="field.type === 'date'"
                    type="date"
                    v-model="field.value"
                    />
                </div>
                </div>


            <Button type="submit" @click="handleAddActivity">Créer l'activité</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ActivityType, ActivityField } from '~/types/activity'
import { ref, watch } from 'vue'

const { types, fetchTypes } = useActivityType()
const { addActivity } = useActivity()
await useAsyncData('activity-type', fetchTypes, { server: true })

const type = ref<ActivityType>()
const duration = ref<number>(0)
const calories = ref<number>(0)
const distance = ref<number>(0)

// 🔹 Quand le type change, on initialise les champs avec value = 0 ou '' selon le type
watch(type, (newType) => {
  if (newType?.fields) {
    newType.fields.forEach((field: ActivityField & { value?: any }) => {
      switch(field.type) {
        case 'number':
          field.value = 0
          break
        case 'text':
          field.value = ''
          break
        case 'boolean':
          field.value = false
          break
        case 'select':
          field.value = field.options?.[0] || ''
          break
        case 'date':
          field.value = ''
          break
      }
    })
  }
})

const handleAddActivity = async () => {
  if (!type.value) return

  const metadata = type.value.fields?.reduce((acc, field) => {
    acc[field.key] = field.value
    return acc
  }, {} as Record<string, any>) || {}

  await addActivity({
    typeId: type.value.id,
    metadata
  })
}
</script>
