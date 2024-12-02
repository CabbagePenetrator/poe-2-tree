<script setup>
import SkillPoints from '@/components/Hud/SkillPoints.vue'

const props = defineProps({
  stageSize: Object,
  nodes: Object,
  points: Number,
})
</script>

<template>
  <SkillPoints :nodes='props.nodes' :points='props.points' :stageSize="props.stageSize" />
</template>
