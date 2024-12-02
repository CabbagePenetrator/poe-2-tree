<script setup>
import nodesJson from '@/assets/nodes.json'
import Node from '@/components/Nodes/Node.vue'
import Line from '@/components/Lines/Line.vue'
import Tooltip from '@/components/Tooltip.vue'
import Hud from '@/components/Hud.vue'
import { onMounted, onUnmounted, useTemplateRef, computed, ref } from 'vue'

const nodes = ref(nodesJson)
const points = ref(3)
const dragBg = useTemplateRef('dragBg')
const scaleGroup = useTemplateRef('scaleGroup')
const scale = ref(1)

const tooltipNode = ref(null)
const config = ref({
  width: window.innerWidth,
  height: window.innerHeight,
})

const resizeHandler = () => {
  config.value.width = window.innerWidth
  config.value.height = window.innerHeight
}

const scrollHandler = (e) => {
  scale.value -= e.deltaY * 0.001
  scaleGroup.value.getNode().scale({ x: scale.value, y: scale.value })
}

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
  window.addEventListener('wheel', scrollHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
  window.removeEventListener('wheel', scrollHandler)
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
const showTooltip = (node) => {
  tooltipNode.value = node
}

const hideTooltip = (node) => {
  tooltipNode.value = null
}
</script>

<template>
  <v-stage :config="config">
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
      <v-group ref="scaleGroup">
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
          @showTooltip="showTooltip(node)"
          @hideTooltip="hideTooltip(node)"
        />
      </v-group>
    </v-layer>
    <v-layer>
      <Tooltip v-if="tooltipNode" :node="tooltipNode" />
    </v-layer>
    <v-layer>
      <Hud :nodes='nodes' :points='points' :stageSize="config" />
    </v-layer>
  </v-stage>
</template>
