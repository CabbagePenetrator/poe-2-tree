<script setup>
const props = defineProps({
  node: Object,
  parent: Object,
})
</script>

<template>
  <v-line
    :config="{
      points: [node.x, node.y, parent.x, parent.y],
      stroke: node.isSelected ? 'white' : 'gray',
      strokeWidth: 4,
      lineCap: 'round',
    }"
  />
</template>
