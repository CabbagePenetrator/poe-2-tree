<script setup>
const props = defineProps({
  node: Object,
})
</script>

<template>
  <v-circle
    :config="{
      x: node.x,
      y: node.y,
      radius: 15,
      fill: '#27254e',
      stroke: node.selected ? 'white' : '#5d4c2a',
      strokeWidth: 4,
    }"
    @click="$emit('selected', node)"
  />
</template>
