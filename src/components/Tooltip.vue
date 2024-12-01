<script setup>
import { useNormalTooltip } from '@/composables/useNormalTooltip'
import { useMouse } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  node: Object,
})

const {
  leftImage,
  leftImageWidth,
  middleImage,
  rightImage,
  rightImageWidth,
  headerHeight,
  getTooltipWidth,
  getTooltipHeight,
} = useNormalTooltip()

const { x, y } = useMouse()

const tooltipWidth = getTooltipWidth(props.node.stats)
const tooltipHeight = getTooltipHeight(props.node.stats)

const middleImageWidth = computed(() => {
  let availableWidth = tooltipWidth - leftImageWidth - rightImageWidth
  return availableWidth > 0 ? availableWidth : 0
})
</script>

<template>
  <!-- Header -->
  <v-image
    :config="{
      x: x,
      y: y,
      width: leftImageWidth,
      height: headerHeight,
      image: leftImage,
    }"
  />
  <v-image
    :config="{
      x: x + leftImageWidth,
      y: y,
      width: middleImageWidth,
      height: headerHeight,
      fillPatternImage: middleImage,
    }"
  />
  <v-image
    :config="{
      x: x + rightImageWidth + middleImageWidth,
      y: y,
      width: rightImageWidth,
      height: headerHeight,
      image: rightImage,
    }"
  />

  <!-- Node name -->
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

  <!-- Node stats -->
  <v-rect
    :config="{
      x: x,
      y: y + 54,
      width: tooltipWidth,
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
      width: tooltipWidth,
      text: stat,
      fill: '#7676DE',
      align: 'left',
      verticalAlign: 'middle',
      fontSize: 16,
      fontFamily: 'Fontin',
    }"
  />
</template>
