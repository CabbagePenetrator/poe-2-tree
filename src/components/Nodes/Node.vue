<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  node: Object,
  parent: Object,
})

const sprite = ref(null)

const spriteRegion = computed(() => {
  if (props.node.isSelected) {
    return { x: 20, y: 315 }
  }

  if (props.parent && props.parent.isSelected) {
    return { x: 345, y: 252 }
  }

  return { x: 59, y: 315 }
})

onMounted(() => {
  const imageFile = new Image()

  imageFile.src = '/frames.webp'

  imageFile.onload = () => {
    sprite.value = imageFile
  }
})
</script>

<template>
  <v-circle
    :config="{
      x: node.x,
      y: node.y,
      radius: 20,
      fillPatternImage: sprite,
      fillPatternOffsetX: spriteRegion.x,
      fillPatternOffsetY: spriteRegion.y,
      fillPatternRepeat: 'no-repeat',
    }"
    @click="$emit('selected', node)"
  ></v-circle>
</template>
