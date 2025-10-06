// types/activity.ts

// 🔹 Type des champs dynamiques
export type FieldType = 'number' | 'text' | 'boolean' | 'select' | 'date'

// 🔹 Définition d’un champ pour un ActivityType
export interface ActivityField {
  key: string          // clé dans metadata, ex: "speed", "exercises"
  label: string        // label affiché dans l’UI
  type: FieldType      // type du champ
  options?: string[]   // si select
  required?: boolean,
  value?: any
}

// 🔹 Type d’un ActivityType
export interface ActivityType {
  id: string
  name: string
  fields: ActivityField[]  // liste des champs dynamiques pour ce type
}

// 🔹 Base d’une activité
export interface ActivityBase {
  id: string
  type: ActivityType
  duration: number
  calories: number
  distance: string
  date: string
  metadata: Record<string, any>
}

export type RunActivity = ActivityBase & {
  type: { id: string; name: 'Run'; fields: ActivityField[] }
  metadata: { speed: number; cadence?: number }
}

export type MusculationActivity = ActivityBase & {
  type: { id: string; name: 'Musculation'; fields: ActivityField[] }
  metadata: { exercises: number; weight?: number }
}

// 🔹 Union générique pour Activity
export type Activity = RunActivity | MusculationActivity | ActivityBase
