<template>
    <div>
        <Avatar :image="user?.profileImage ? profileImage : null" :label="!profileImage ? name : null" shape="circle" :size="size"/>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import type {User} from "~/types/user";

const props = defineProps<{
  size: string,
  user: User
}>()

const config = useRuntimeConfig()

const profileImage = computed(() => {
  if(props.user?.profileImage) {
    return config.public.apiBase + "/uploads/users/" + props.user.profileImage
  }else {
    return null;
  }

})


const name = computed(() => {
  console.log(props)
  return props.user?.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
})




</script>