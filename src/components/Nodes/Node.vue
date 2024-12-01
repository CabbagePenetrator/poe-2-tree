<script setup>
import { useSpriteImage } from '@/composables/useSpriteImage'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  node: Object,
  parent: Object,
})

const {
  sprite,
  getNormalFrameCoords,
  getSelectableFrameCoords,
  getSelectedFrameCoords,
} = useSpriteImage()

const spriteCoords = computed(() => {
  if (props.node.isSelected) {
    return getSelectedFrameCoords()
  }

  if (props.parent && props.parent.isSelected) {
    return getSelectableFrameCoords()
  }

  return getNormalFrameCoords()
})
</script>

<template>
  <v-circle
    :config="{
      x: node.x,
      y: node.y,
      radius: 20,
      fillPatternImage: sprite,
      fillPatternOffsetX: spriteCoords.x,
      fillPatternOffsetY: spriteCoords.y,
      fillPatternRepeat: 'no-repeat',
    }"
    @click="$emit('selected', node)"
  ></v-circle>
</template>
