<script setup>
import nodes from '@/assets/nodes.json'
import Node from '@/components/Node.vue'
import Line from '@/components/Line.vue'

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
}
</script>

<template>
  <v-stage :config="config">
    <v-layer>
      <template v-for="node in nodes">
        <Node :x="node.x" :y="node.y" />
        <Line
          v-if="node.parent_id"
          :node="node"
          :parent="nodes.find((parent) => parent.id === node.parent_id)"
        />
      </template>
    </v-layer>
  </v-stage>
</template>
