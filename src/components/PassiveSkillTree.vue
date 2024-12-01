<script setup>
import nodesJson from '@/assets/nodes.json'
import Node from '@/components/Nodes/Node.vue'
import Line from '@/components/Lines/Line.vue'
import { computed, ref } from 'vue'

const nodes = ref(nodesJson)
const points = ref(123)

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const selectNode = (selectedNode) => {
  if (selectedNode.isSelected) {
    const selectedChild = nodes.value
      .filter((node) => node.parent_id === selectedNode.id)
      .find((node) => node.isSelected)

    if (selectedChild) {
      return false
    }

    nodes.value.find((node) => node.id === selectedNode.id).isSelected = false

    points.value += 1

    return
  }

  if (points.value === 0) {
    return false
  }

  const parent = nodes.value.find((node) => node.id === selectedNode.parent_id)

  if (parent && !parent.isSelected) {
    return false
  }

  nodes.value.find((node) => node.id === selectedNode.id).isSelected = true

  points.value -= 1
}

const childNodes = computed(() => {
  return nodes.value.filter((node) => node.parent_id !== null)
})
</script>

<template>
  <v-stage :config="config">
    <v-layer>
      <Line
        v-for="node in childNodes"
        :key="node.id"
        :node="node"
        :parent="nodes.find((parent) => parent.id === node.parent_id)"
      />
    </v-layer>
    <v-layer>
      <Node
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        :parent="nodes.find((parent) => parent.id === node.parent_id)"
        @selected="selectNode"
      />
    </v-layer>
    <v-layer>
      <v-text
        :config="{
          x: 830,
          y: 40,
          text: `${points} Points Left`,
          fill: 'white',
          fontStyle: 'bold',
          fontSize: 14,
        }"
      />
    </v-layer>
  </v-stage>
</template>
