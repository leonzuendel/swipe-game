<template>
  <div class="card-container">
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
      <div class="card-content">
        <div class="card-symbols"></div>
        <div class="card-title">
          <h1>{{ card.title }}</h1>
          <span>{{ card.category }}</span>
        </div>
      </div>
    </Vue2InteractDraggable>
  </div>
</template>

<script>
import { Vue2InteractDraggable } from "vue2-interact";

export default {
  components: {
    Vue2InteractDraggable
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    draggedUp() {
      console.log("Up!");
    },
    draggedDown() {
      console.log("Down!");
    },
    draggedLeft() {
      console.log("Left!");
    },
    draggedRight() {
      console.log("Right!");
    }
  }
};
</script>

<style></style>
