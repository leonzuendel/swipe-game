<template>
  <div id="card-container">
    <template v-if="allCardsGone === false">
      <Vue2InteractDraggable
        v-for="(card, index) in currentCards"
        v-show="!loading"
        :key="card.title"
        :interact-max-rotation="20"
        :interact-out-of-sight-x-coordinate="600"
        :interact-x-threshold="130"
        :class="{ next: index === 0 && currentCards.length != 1 }"
        class="card"
        :style="categoryColor(card.category)"
        @draggedRight="draggedRight()"
        @draggedLeft="draggedLeft()"
        @draggedUp="draggedUp()"
        @draggedDown="draggedDown()"
      >
        <div class="card-content">
          <div class="card-symbols">
            <h1><i class="las la-coins"></i> {{ card.cost_gold }}</h1>
            <div
              v-for="entry in resourcesCosts(card.cost_resources)"
              :key="entry.res"
              class="resource-costs"
            >
              <template v-if="resource(entry.res) != null">
                <i :class="resource(entry.res).icon"></i> {{ entry.cost }}
              </template>
            </div>
          </div>
          <div class="card-title">
            <h1>{{ card.title }}</h1>
            <span v-if="category(card.category) != null">
              <i :class="category(card.category).icon"></i>
              {{ category(card.category).title }}
            </span>
          </div>
        </div>
      </Vue2InteractDraggable>
    </template>
    <div v-show="loading" class="card-loading">
      <div>Lädt...</div>
    </div>
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
    categories: {
      type: Array,
      required: true
    },
    resources: {
      type: Array,
      required: true
    },
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
    return {
      loading: true
    };
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
  mounted() {},
  methods: {
    category(id) {
      const cat = this.categories.filter((cat) => cat.id === id)[0];
      if (cat != null) {
        this.loading = false;
        return cat;
      }
    },
    resourcesCosts(res) {
      const output = Object.entries(res).map(([res, cost]) => ({
        res,
        cost
      }));
      return output;
    },
    resource(id) {
      const res = this.resources.filter((res) => res.id === parseInt(id))[0];
      if (res != null) {
        this.loading = false;
        return res;
      }
    },
    categoryColor(id) {
      const cat = this.categories.filter((cat) => cat.id === id)[0];
      if (cat != null) {
        this.loading = false;
        return { "background-color": cat.color };
      }
    },
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
      const next = document.getElementsByClassName("card")[0];
      next.classList.add("scale");
      this.currentCards.splice(1);
      setTimeout(() => {
        this.$parent.loadNextCards();
        if (this.oneCardLeft !== true) {
          this.currentCards.push(this.nextCard);
        }
      }, 200);
    }
  }
};
</script>

<style></style>
