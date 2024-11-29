<script setup>
const props = defineProps({
  node: Object,
  parent: Object,
})

const nodeColor = () => {
  if (props.node.isSelected) {
    return 'white'
  }

  if (props.parent && props.parent.isSelected) {
    return '#655841'
  }

  return '#5d4c2a'
}
</script>

<template>
  <v-circle
    :config="{
      x: node.x,
      y: node.y,
      radius: 15,
      fill: '#27254e',
      stroke: nodeColor(),
      strokeWidth: 4,
    }"
    @click="$emit('selected', node)"
  />
</template>
