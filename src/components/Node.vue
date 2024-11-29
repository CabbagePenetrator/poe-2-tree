<script setup>
const props = defineProps({
  x: Number,
  y: Number,
})

const config = {
  x: props.x,
  y: props.y,
  radius: 15,
  fill: '#27254e',
  stroke: '#5d4c2a',
  strokeWidth: 4,
}
</script>

<template>
  <v-circle :config="config"></v-circle>
</template>
