<script setup>
const props = defineProps({
  node: Object,
  parent: Object,
})

const lineColor = () => {
  if (props.node.isSelected) {
    return '#eeebdd'
  }

  if (props.parent && props.parent.isSelected) {
    return '#292517'
  }

  return '#2e2d22'
}
</script>

<template>
  <v-line
    :config="{
      points: [node.x, node.y, parent.x, parent.y],
      stroke: lineColor(),
      strokeWidth: 4,
      lineCap: 'round',
    }"
  />
</template>
