<script setup>
import { useFramesSprite } from '@/composables/useFramesSprite'
import { useSkillsSprite } from '@/composables/useSkillsSprite'
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

const { sprite: skillSprite, getCoordsForSkill } = useSkillsSprite()

const spriteCoords = computed(() => {
  if (props.node.isSelected) {
    return getSelectedFrameCoords()
  }

  if (props.parent && props.parent.isSelected) {
    return getSelectableFrameCoords()
  }

  return getNormalFrameCoords()
})

const skillCoords = getCoordsForSkill(props.node.skill)
</script>

<template>
  <v-circle
    :config="{
      x: node.x,
      y: node.y,
      radius: 13,
      fillPatternImage: skillSprite,
      fillPatternOffset: skillCoords,
    }"
  />

  <v-circle
    :config="{
      x: node.x,
      y: node.y,
      radius: 20,
      fillPatternImage: sprite,
      fillPatternOffset: spriteCoords,
    }"
    @click="$emit('selected', node)"
    @mouseenter="$emit('showTooltip', node)"
    @mouseleave="$emit('hideTooltip', node)"
  />
</template>
