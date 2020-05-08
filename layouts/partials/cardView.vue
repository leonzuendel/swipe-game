<template>
  <div id="card-container">
    <template v-if="allCardsGone === false">
      <Vue2InteractDraggable
        v-for="(card, index) in currentCards"
        :key="card.title"
        :interact-max-rotation="20"
        :interact-out-of-sight-x-coordinate="600"
        :interact-x-threshold="130"
        :class="{ next: index === 0 }"
        class="card"
        @draggedRight="draggedRight()"
        @draggedLeft="draggedLeft()"
        @draggedUp="draggedUp()"
        @draggedDown="draggedDown()"
      >
        <div class="card-content">
          <div class="card-symbols"></div>
          <div class="card-title">
            <h1>{{ card.title }}</h1>
            <span>{{ card.category }}</span>
          </div>
        </div>
      </Vue2InteractDraggable>
    </template>
    <template v-if="noCardLeft">
      <div class="all-cards-gone">Es gibt keine Karten mehr...</div>
    </template>
  </div>
</template>

<script>
import { Vue2InteractDraggable } from "vue2-interact";

export default {
  components: {
    Vue2InteractDraggable
  },
  props: {
    currentCard: {
      type: Object,
      required: true
    },
    nextCard: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    allCardsGone: {
      type: Boolean,
      required: true
    },
    oneCardLeft: {
      type: Boolean,
      required: true
    },
    noCardLeft: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    currentCards() {
      if (this.noCardLeft !== true) {
        return [this.nextCard, this.currentCard];
      } else {
        return [this.currentCard];
      }
    }
  },
  methods: {
    draggedUp(index) {
      console.log(index);
      this.removeCard(index);
    },
    draggedDown(index) {
      console.log("Down!");
      this.removeCard(index);
    },
    draggedLeft(index) {
      console.log("Left!");
      this.removeCard(index);
    },
    draggedRight(index) {
      console.log("Right!");
      this.removeCard(index);
    },
    removeCard(index) {
      this.currentCards.splice(1, 1);
      this.$parent.loadNextCards();
      if (this.oneCardLeft !== true) {
        this.currentCards.push(this.nextCard);
      }
    }
  }
};
</script>

<style></style>
