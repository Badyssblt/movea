<script setup lang="ts">
import type {Ref} from "vue";
import Divider from 'primevue/divider';
import Message from "primevue/message";

import useAuthService from "~/services/auth";
import {definePageMeta} from "#imports";

definePageMeta({
  layout: "empty"
})

const email: Ref = ref<string>(null)
const password: Ref = ref<string>()
const loading: Ref = ref<boolean>()
const error: Ref = ref<string>()
const auth = useAuthService()

const login = async () => {
  error.value = ""
  loading.value = true
  try {
    await auth.login(email.value, password.value)
  }catch (e) {
    error.value = "Mot de passe ou email invalide !"
  }finally {
    loading.value = false
  }
}

</script>

<template>
<div>
  <h2 class="text-xl font-medium">Connexion</h2>

  <form @submit.prevent="login" class="flex flex-col gap-6 mt-6">
    <div class="flex flex-col">
      <FloatLabel>
        <InputText type="email" id="email" class="w-full" v-model="email" :invalid="email"/>
        <label for="email">Email</label>
      </FloatLabel>
      <Message v-if="!email && error" severity="error" variant="simple" size="small">Veuillez renseignez une email</Message>
    </div>
    <div class="flex flex-col">
      <FloatLabel>
        <InputText type="password" id="password" class="w-full" v-model="password" :invalid="password"/>
        <label for="password">Mot de passe</label>
      </FloatLabel>
      <Message v-if="!password && error" severity="error" variant="simple" size="small">Veuillez renseignez un mot de passe</Message>
    </div>
    <Button type="submit" label="Se connecter" icon="pi pi-search" :loading="loading" />

    <Message v-if="error" severity="error" icon="pi pi-times-circle" class="mb-2">{{ error }}</Message>

    <Divider>
      <p>Ou</p>
    </Divider>
  </form>
</div>
</template>

<style scoped>

</style>