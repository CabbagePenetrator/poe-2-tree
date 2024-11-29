<script setup>
import Node from '@/components/Node.vue'

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const nodes = [
  {
    id: 1,
    parent: null,
    x: 1100,
    y: 550,
  },
  {
    id: 2,
    parent: 1,
    x: 1180,
    y: 450,
  },
]
</script>

<template>
  <v-stage :config="config">
    <v-layer>
      <Node v-for="node in nodes" :x="node.x" :y="node.y" />
    </v-layer>
  </v-stage>
</template>
