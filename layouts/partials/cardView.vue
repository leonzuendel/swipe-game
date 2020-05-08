<template>
  <div id="card-container">
    <template v-if="allCardsGone === false">
      <Vue2InteractDraggable
        v-for="(card, index) in currentCards"
        :key="card.title"
        :interact-max-rotation="20"
        :interact-out-of-sight-x-coordinate="600"
        :interact-x-threshold="130"
        :class="{ next: index === 0 && currentCards.length != 1 }"
        class="card"
        @draggedRight="draggedRight()"
        @draggedLeft="draggedLeft()"
        @draggedUp="draggedUp()"
        @draggedDown="draggedDown()"
      >
        <div v-show="!loading" class="card-content">
          <div class="card-symbols"></div>
          <div class="card-title">
            <h1>{{ card.title }}</h1>
            <span>{{ category(card.category) }}</span>
          </div>
        </div>
        <div v-show="loading" class="card-loading">
          <div>Lädt...</div>
        </div>
      </Vue2InteractDraggable>
    </template>
    <template v-if="noCardLeft">
      <div class="all-cards-gone">Es gibt keine Karten mehr...</div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    return {
      loading: true
    };
  },

  computed: {
    ...mapState(["cards", "categories"]),
    currentCards() {
      if (this.noCardLeft !== true) {
        return [this.nextCard, this.currentCard];
      } else {
        return [this.currentCard];
      }
    }
  },
  mounted() {
    this.$store.dispatch("getCategories");
  },
  methods: {
    category(id) {
      const cat = this.categories.filter((cat) => cat.id === id)[0];
      if (cat != null) {
        this.loading = false;
        return cat.title;
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
