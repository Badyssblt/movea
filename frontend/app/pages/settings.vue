<script setup lang="ts">
import {UserBadge} from "~/components/common/User";
import {useCookie} from "#app";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import useApi from "~/composables/useApi";
import useAuthService from "~/services/auth";
import {definePageMeta} from "#imports";


definePageMeta({
  middleware: "is-log"
})

const user = useCookie("user")
const theme = useCookie('theme')
const { AVAILABLE_THEME, toggleTheme } = useTheme()

const visibleProfileImage: Ref = ref<boolean>()


const selectedFile = ref<File | null>(null)
const isUploading = ref(false)

const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

const api = useApi()

/**
 * Envoie l'image au backend NestJS
 */
const uploadAvatar = async () => {
  if (!selectedFile.value) {
    alert('Veuillez choisir une image.')
    return
  }

  try {
    isUploading.value = true

    // Crée le form-data pour Multer
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    try {
      const request = await api.apiRequest('/user/avatar', {
        method: "POST",
        body: formData
      }, "axios")
      user.value = request.user
    }catch (e) {
      console.error(e)
    }

    visibleProfileImage.value = false
  } catch (err) {
    console.error('Erreur upload avatar:', err)
    alert('Erreur pendant l’upload de l’image.')
  } finally {
    isUploading.value = false
  }
}

const auth = useAuthService()
</script>

<template>
<div>
  <div>
    <div>
      <div class="absolute left-0 top-0 w-full h-48 bg-white overflow-hidden">
        <div class="absolute top-[-10%] left-[-10%] w-96 h-96
              bg-blue-400 rounded-full
              opacity-70 blur-3xl"></div>

        <div class="absolute top-1/4 left-1/2 w-80 h-80
              bg-blue-200 rounded-full
              opacity-50 blur-2xl"></div>

        <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96
              bg-white rounded-full
              opacity-60 blur-3xl"></div>

        <div class="absolute right-6 top-6">
          <button class="h-12 w-12 bg-primary/40 rounded-full backgrop-blur-xl border border-primary-300 flex items-center justify-center"><Icon name="material-symbols:edit-rounded"  class="text-primary-contrast" size="24px" /></button>
        </div>
      </div>
      <div class="w-full h-48">

      </div>
      <div class="relative">
        <UserBadge :user="user" size="xlarge"/>
        <div class="absolute left-12 top-0">
          <button @click="visibleProfileImage = true" class="h-8 w-8 bg-primary/40 rounded-full backgrop-blur-xl border border-primary-300 flex items-center justify-center"><Icon name="material-symbols:edit-rounded"  class="text-primary-contrast" size="24px" /></button>
        </div>
      </div>
    </div>
    <div>
      <p class="font-medium text-xl">{{ user.name }}</p>
      <p class="text-sm opacity-70">{{ user.email }}</p>
    </div>
  </div>

  <div>

      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Profile</Tab>
            <Tab value="1">Sécurité</Tab>
            <Tab value="2">Préférence</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel>
                  <InputText class="w-full"/>
                  <Label>Nom d'utilisateur</Label>
                </FloatLabel>
                <FloatLabel>
                  <InputText class="w-full"/>
                  <Label>Email</Label>
                </FloatLabel>

                <Button>Modifier mes informations</Button>

                <Button severity="danger" @click="auth.logout()">Se déconnecter</Button>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div class="flex flex-col gap-2 mt-4">
                <FloatLabel>
                  <InputText class="w-full" type="password"/>
                  <Label>Mot de passe actuel</Label>
                </FloatLabel>
                <FloatLabel>
                  <InputText class="w-full" type="password"/>
                  <Label>Nouveau mot de passe</Label>
                </FloatLabel>
                <Button>Modifier mon mot de passe</Button>
              </div>

            </TabPanel>
            <TabPanel value="2">

              <div class="flex flex-col gap-1">
                <label for="theme">Thème</label>
                <Select id="theme" v-model="theme" @change="toggleTheme" :options="AVAILABLE_THEME" option-label="name" option-value="value" :default-value="theme"/>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>


  </div>

  <Dialog :dismissable-mask="true" v-model:visible="visibleProfileImage" modal header="Modifier votre image de profile" :style="{ width: '25rem' }">
    <input type="file" accept="image/*" @change="onFileSelect" />
    <div class="flex gap-2">
      <Button type="button" label="Modifier" class="w-full mt-2" @click="uploadAvatar"></Button>
    </div>
  </Dialog>
</div>

</template>

<style scoped>

</style>