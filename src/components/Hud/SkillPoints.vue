<script setup>
const props = defineProps({
  stageSize: Object,
})

const skillPointsImage = new Image()

skillPointsImage.src = '/poe2-skill-points.webp'
</script>

<template>
  <v-image
    :config="{
      x: stageSize.width - skillPointsImage.width/3,
      y: 0,
      width: skillPointsImage.width/3,
      height: skillPointsImage.height/3,
      image: skillPointsImage,
    }"
  />

  <!-- Skill Points Number -->
  <v-text
    :config="{
      x: stageSize.width - 90,
      y: (skillPointsImage.height/3)/2.5,
      width: 30,
      height: (skillPointsImage.height/3)/2.5,
      text: '123',
      fill: '#F9E6CA',
      fontSize: 22,
      fontFamily: 'Fontin',
    }"
  />

</template>
