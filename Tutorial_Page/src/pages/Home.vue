<template>
  <div class="max-w-3xl py-12 mx-auto">
    <h2 class="font-bold text-lg text-gray-600 mb-4">
      Welcome {{ session.user }}!
    </h2>
     
    <h1>Hello world</h1>
    <FeatherIcon name="user" class="w-5 h-5" />
    <Button icon-right="airplay" /> 

    <a href="/user/list-user">List User</a> <br>
    <a href="/flowbite/component">Flowbite</a>
    <div class="flex flex-row space-x-2 mt-4">
      <Button @click="showDialog = true">Open Dialog</Button>
      <Button @click="session.logout.submit()">Logout</Button>
    </div>

    <!-- Dialog -->
    <Dialog title="Title" v-model="showDialog"> Dialog content </Dialog>
  </div>
</template> 
<script setup>
import { ref } from 'vue'
import { Dialog } from 'frappe-ui'
import { createResource,createListResource  } from 'frappe-ui'
import { session } from '../data/session'

const listUser = createListResource({
  doctype: 'User',
  fields: ['*'],
  orderBy: 'creation desc',
  start: 0,
  pageLength: 5,
})

listUser.fetch()

const showDialog = ref(false)
</script>
