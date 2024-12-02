<script setup>
import SkillPoints from '@/components/Hud/SkillPoints.vue'

const props = defineProps({
  stageSize: Object,
})
</script>

<template>
  <SkillPoints :stageSize="stageSize" />
</template>
