<script setup>
import nodesJson from '@/assets/nodes.json'
import Node from '@/components/Nodes/Node.vue'
import Line from '@/components/Lines/Line.vue'
import { onMounted, onUnmounted, useTemplateRef, computed, ref } from 'vue'

const nodes = ref(nodesJson)
const points = ref(123)
const dragBg = useTemplateRef('dragBg')

const config = ref({
  width: window.innerWidth,
  height: window.innerHeight,
})

const resizeHandler = () => {
  config.value.width = window.innerWidth
  config.value.height = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})

const handleDragEnd = () => {
  if (dragBg.value) {
    dragBg.value.getNode().absolutePosition({ x: 0, y: 0 })
  }
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
      @dragend="handleDragEnd"
      :config="{
        draggable: true,
      }"
    >
      <v-rect
        ref="dragBg"
        :config="{
          width: config.width,
          height: config.height,
        }"
      />
      <Line
        v-for="node in childNodes"
        :key="node.id"
        :node="node"
        :parent="nodes.find((parent) => parent.id === node.parent_id)"
      />
      <Node
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        :parent="nodes.find((parent) => parent.id === node.parent_id)"
        @selected="selectNode"
      />
    </v-layer>
  </v-stage>
</template>
