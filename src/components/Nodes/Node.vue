<script setup>
import { useFramesSprite } from '@/composables/useFramesSprite'
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
} = useFramesSprite()

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
      fillPatternOffset: spriteCoords,
    }"
    @click="$emit('selected', node)"
  ></v-circle>
</template>
