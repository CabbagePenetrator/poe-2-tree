<script setup>
import { useMouse } from '@vueuse/core'

defineProps({
  node: Object,
})

const { x, y } = useMouse()
</script>

<template>
  <v-text
    :config="{
      x: x,
      y: y,
      text: `node id: ${node.id}`,
      fill: 'white',
      fontStyle: 'bold',
      fontSize: 14,
    }"
  />
</template>
