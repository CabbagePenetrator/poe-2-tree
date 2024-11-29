<script setup>
const props = defineProps({
  node: Object,
  parent: Object,
})

const config = {
  points: [props.node.x, props.node.y, props.parent.x, props.parent.y],
  stroke: 'gray',
  strokeWidth: 4,
  lineCap: 'round',
}
</script>

<template>
  <v-line :config="config"></v-line>
</template>
