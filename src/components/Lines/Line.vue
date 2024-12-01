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
  getNormalClipCoords,
  getSelectedClipCoords,
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

const getClipCoords = computed(() => {
  if (props.node.isSelected) {
    return getSelectedClipCoords()
  }

  return getNormalClipCoords()
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

  <v-rect
    :config="{
      x: node.x,
      y: node.y,
      width: 10,
      height: 15,
      offsetX: -16,
      offsetY: 7,
      rotation: calculateRotation(node.x, node.y, parent.x, parent.y),
      fillPatternImage: sprite,
      fillPatternOffset: getClipCoords,
    }"
  />

  <v-rect
    :config="{
      x: parent.x,
      y: parent.y,
      width: 10,
      height: 15,
      offsetX: -16,
      offsetY: 7,
      rotation: calculateRotation(parent.x, parent.y, node.x, node.y),
      fillPatternImage: sprite,
      fillPatternOffset: getClipCoords,
    }"
  />
</template>
