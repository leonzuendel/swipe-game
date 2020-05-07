<template>
  <Vue2InteractDraggable
    :interact-max-rotation="20"
    :interact-out-of-sight-x-coordinate="600"
    :interact-x-threshold="130"
    class="card"
    @draggedRight="draggedRight"
    @draggedLeft="draggedLeft"
    @draggedUp="draggedUp"
    @draggedDown="draggedDown"
  >
    <div></div>
  </Vue2InteractDraggable>
</template>

<script>
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  components: {
    Vue2InteractDraggable
  },
  data() {
    return {}
  },
  methods: {
    draggedUp() {
      console.log('Up!')
    },
    draggedDown() {
      console.log('Down!')
    },
    draggedLeft() {
      console.log('Left!')
    },
    draggedRight() {
      console.log('Right!')
    }
  }
}
</script>

<style></style>
