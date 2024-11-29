<script setup>
import nodesJson from '@/assets/nodes.json'
import Node from '@/components/Node.vue'
import Line from '@/components/Line.vue'
import { ref } from 'vue'

const nodes = ref(nodesJson)

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const selectNode = (selectedNode) => {
  const parent = nodes.value.find((node) => node.id === selectedNode.parent_id)

  if (parent && !parent.isSelected) {
    return false
  }

  nodes.value.find((node) => node.id === selectedNode.id).isSelected = true
}
</script>

<template>
  <v-stage :config="config">
    <v-layer>
      <template v-for="node in nodes">
        <Node :node="node" @selected="selectNode" />
        <Line
          v-if="node.parent_id"
          :node="node"
          :parent="nodes.find((parent) => parent.id === node.parent_id)"
        />
      </template>
    </v-layer>
  </v-stage>
</template>
