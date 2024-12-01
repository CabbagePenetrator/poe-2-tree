<script setup>
import { useNormalTooltip } from '@/composables/useNormalTooltip'
import { useMouse } from '@vueuse/core'

defineProps({
  node: Object,
})

const { left, middle, right } = useNormalTooltip()

const { x, y } = useMouse()
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
      height: 54,
      fill: 'black',
      opacity: 0.5,
    }"
  />
  <v-text
    :config="{
      x: x + 20,
      y: y + 54,
      width: 263,
      height: 54,
      text: '12% increased Spell Damage',
      fill: '#7676DE',
      align: 'left',
      verticalAlign: 'middle',
      fontSize: 16,
      fontFamily: 'Fontin',
    }"
  />
</template>
