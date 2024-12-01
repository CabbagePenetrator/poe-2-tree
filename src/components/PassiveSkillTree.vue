<script setup>
import nodesJson from '@/assets/nodes.json'
import Node from '@/components/Node.vue'
import Line from '@/components/Line.vue'
import ToolTip from '@/components/ToolTip.vue'
import { ref } from 'vue'

const nodes = ref(nodesJson)
const points = ref(123)

const toolTipNode = ref(null)

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

const showToolTip = (node) => {
  toolTipNode.value = node
}

const hideToolTip = (node) => {
  toolTipNode.value = null
}
</script>

<template>
  <v-stage :config="config">
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
      <template v-for="node in nodes" :key="node.id">
        <Node
          :node="node"
          :parent="nodes.find((parent) => parent.id === node.parent_id)"
          @selected="selectNode"
          @showToolTip="showToolTip(node)"
          @hideToolTip="hideToolTip(node)"
        />
        <Line
          v-if="node.parent_id"
          :node="node"
          :parent="nodes.find((parent) => parent.id === node.parent_id)"
        />
      </template>
    </v-layer>
    <v-layer>
      <ToolTip v-if="toolTipNode" :node="toolTipNode" />
    </v-layer>
  </v-stage>
</template>
