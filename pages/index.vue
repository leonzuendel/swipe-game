<template>
  <Vue2InteractDraggable
    :interact-max-rotation="15"
    :interact-out-of-sight-x-coordinate="500"
    :interact-x-threshold="200"
    class="card"
    @draggedRight="draggedRight"
  >
    <div>
      <h3>Drag me!</h3>
    </div>
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
