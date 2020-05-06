<template>
  <Vue2InteractDraggable
    :interact-max-rotation="15"
    :interact-out-of-sight-x-coordinate="800"
    :interact-x-threshold="150"
    class="card"
    @draggedRight="draggedRight"
  >
    <div></div>
  </Vue2InteractDraggable>
</template>

<script>
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  components: {
    Vue2InteractDraggable
  }
}
</script>

<style></style>
