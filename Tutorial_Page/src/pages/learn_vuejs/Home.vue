<template>
    <div v-bind:class="[vueClass, { 'active': isActive, 'disabled': isDisabled }]">
      Hello world
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  
  const vueClass = ref('container')
  const isActive = ref(true)
  const isDisabled = ref(false)
  </script>
  