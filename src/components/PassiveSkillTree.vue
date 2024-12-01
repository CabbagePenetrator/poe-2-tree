<script setup>
import nodesJson from '@/assets/nodes.json'
import Node from '@/components/Node.vue'
import Line from '@/components/Line.vue'
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

const nodes = ref(nodesJson)
const points = ref(123)
const isDragging = ref(false)

const config = ref({
  width: window.innerWidth,
  height: window.innerHeight,
})

const resizeHandler = () => {
  config.value.width = window.innerWidth
  config.value.height = window.innerHeight
  console.log(config.value.width, config.value.height)
}

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})

const handleDragStart = () => {
  isDragging.value = true
}
const handleDragEnd = () => {
  isDragging.value = false
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
</script>

<template>
  <v-stage
    :config="config"
  >
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
    <v-layer
      :config="{
        draggable: true,
      }"
    >
      <template v-for="node in nodes">
        <Node
          :node="node"
          :parent="nodes.find((parent) => parent.id === node.parent_id)"
          @selected="selectNode"
        />
        <Line
          v-if="node.parent_id"
          :node="node"
          :parent="nodes.find((parent) => parent.id === node.parent_id)"
        />
      </template>
    </v-layer>
  </v-stage>
</template>
