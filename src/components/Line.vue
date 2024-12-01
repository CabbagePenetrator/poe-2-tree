<script setup>
import { useLinesSprite } from '@/composables/useLinesSprite'
import { computed, ref } from 'vue'

const props = defineProps({
  node: Object,
  parent: Object,
})

const {
  sprite,
  getNormalLineCoords,
  getSelectableLineCoords,
  getSelectedLineCoords,
} = useLinesSprite()

const lineThickness = ref(5)

const spriteCoords = computed(() => {
  if (props.node.isSelected) {
    return getSelectedLineCoords()
  }

  if (props.parent && props.parent.isSelected) {
    return getSelectableLineCoords()
  }

  return getNormalLineCoords()
})

const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
const calculateRotation = (x1, y1, x2, y2) => {
  const radians = Math.atan2(y2 - y1, x2 - x1)
  return radians * (180 / Math.PI)
}
</script>

<template>
  <v-rect
    :config="{
      x: node.x,
      y: node.y,
      width: calculateDistance(node.x, node.y, parent.x, parent.y),
      height: lineThickness,
      offsetY: lineThickness / 2,
      rotation: calculateRotation(node.x, node.y, parent.x, parent.y),
      fillPatternImage: sprite,
      fillPatternOffset: spriteCoords,
    }"
  />
</template>
