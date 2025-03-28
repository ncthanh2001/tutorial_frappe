<template>
  <div class="container">
    <table class="table-auto">
  <thead>
    <tr>
      <th>Name</th>
      <th>First Name</th>
      <th>Last Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="u in listUser.data" > 
        <td>{{ u.name }}</td>
        <td>{{ u.first_name }}</td>
        <td>{{ u.last_name }}</td>
    </tr> 
  </tbody>
</table>
  </div>


  <ListView
  class="h-[300px]"
  :columns="[
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Status', key: 'status' }
  ]"
  :rows="groupedRows"
  :options="{
    selectable: true,
    showTooltip: true,
    resizeColumn: true,
  }"
  row-key="id"
>
  <template #group-header="{ group }">
    <span class="text-base font-medium text-gray-800">
      {{ group.group }} ({{ group.rows.length }})
    </span>
  </template>
</ListView>

  </template> 




  <script setup>
  import { computed } from 'vue'
  import { ref } from 'vue' 
  import { createResource,createListResource,Dialog,ListView  } from 'frappe-ui'
  import { session } from '../data/session'
  
  const listUser = createListResource({
    doctype: 'User',
    fields: ['*'],
    orderBy: 'creation desc',
    start: 0,
    pageLength: 5,
  })
  
  listUser.fetch()
  
const groupedRows = computed(() => {
  if (!listUser.data) return []

  const groups = {}

  for (const user of listUser.data) {
    const role = user.role || 'Unknown'
    if (!groups[role]) {
      groups[role] = []
    }
    groups[role].push({
      id: user.name,
      name: user.full_name || user.name,
      email: user.email,
      status: user.enabled ? 'Active' : 'Inactive',
      role: role,
    })
  }

  return Object.entries(groups).map(([role, rows]) => ({
    group: role,
    collapsed: false,
    rows,
  }))
})
  const showDialog = ref(false)
  </script>
  