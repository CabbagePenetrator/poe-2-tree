<script setup>
import { useNormalTooltip } from '@/composables/useNormalTooltip'
import { useMouse } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  node: Object,
})

const { left, middle, right } = useNormalTooltip()

const { x, y } = useMouse()

const tooltipHeight = computed(() => {
  let height = 20

  props.node.stats.forEach((stat, index) => {
    height += 20
  })

  return height
})
</script>

<template>
  <v-image
    :config="{
      x: x + 10,
      y: y,
      width: 44,
      height: 54,
      image: left,
    }"
  />
  <v-image
    :config="{
      x: x + 44,
      y: y,
      width: 175,
      height: 54,
      fillPatternImage: middle,
    }"
  />
  <v-image
    :config="{
      x: x + 219,
      y: y,
      width: 44,
      height: 54,
      image: right,
    }"
  />
  <v-text
    :config="{
      x: x + 10,
      y: y,
      width: 263,
      height: 54,
      text: 'Spell Damage',
      fill: '#F9E6CA',
      align: 'center',
      verticalAlign: 'middle',
      fontSize: 22,
      fontFamily: 'Fontin',
    }"
  />
  <v-rect
    :config="{
      x: x + 10,
      y: y + 54,
      width: 253,
      height: tooltipHeight,
      fill: 'black',
      opacity: 0.5,
    }"
  />
  <v-text
    v-for="(stat, index) in node.stats"
    :key="index"
    :config="{
      x: x + 20,
      y: y + 66 + index * 20,
      width: 263,
      text: stat,
      fill: '#7676DE',
      align: 'left',
      verticalAlign: 'middle',
      fontSize: 16,
      fontFamily: 'Fontin',
    }"
  />
</template>
