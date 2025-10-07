import { reactive, watch } from 'vue'
import { evaluate } from 'mathjs'
import type { ActivityType, Field } from '~/types/activity'

export function useActivityCalculation(type: ActivityType) {
    const fields = reactive<Field[]>(type.fields.map(f => ({ ...f, value: f.value ?? 0 })))

    // Fonction pour calculer les champs à partir des formules
    const compute = () => {
        if (!type.formulas) return

        fields.forEach(f => {
            if (type.formulas[f.key]) {
                try {
                    const context = Object.fromEntries(fields.map(f => [f.key, f.value ?? 0]))
                    f.value = Math.round(evaluate(type.formulas[f.key], context))
                } catch {
                    f.value = f.value ?? 0
                }
            }
        })
    }

    // On recalcul à chaque modification des champs
    watch(fields, compute, { deep: true, immediate: true })

    return { fields }
}
