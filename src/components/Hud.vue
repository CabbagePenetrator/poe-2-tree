<script setup>
import SkillPoints from '@/components/Hud/SkillPoints.vue'

const props = defineProps({
  stageSize: Object,
  nodes: Object,
})
</script>

<template>
  <SkillPoints :nodes='props.nodes' :stageSize="props.stageSize" />
</template>
