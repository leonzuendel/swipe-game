<template>
  <div id="content">
    <template v-if="this.$store.state.loading !== true">
      <cardView
        :categories="categories"
        :resources="resources"
        :current-card="currentCard"
        :next-card="nextCard"
        :all-cards-gone="allCardsGone"
        :one-card-left="oneCardLeft"
        :no-card-left="noCardLeft"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cardView from "@/layouts/partials/cardView.vue";
export default {
  components: {
    cardView
  },
  data() {
    return {
      currentCardCount: 0
    };
  },
  computed: {
    ...mapState(["cards", "categories", "resources"]),
    oneCardLeft() {
      if (this.currentCardCount + 2 === this.cards.length) {
        return true;
      } else {
        return false;
      }
    },
    noCardLeft() {
      if (this.currentCardCount + 1 >= this.cards.length) {
        return true;
      } else {
        return false;
      }
    },
    allCardsGone() {
      if (this.currentCardCount === this.cards.length) {
        return true;
      } else {
        return false;
      }
    },
    currentCard() {
      return this.cards[this.currentCardCount];
    },
    nextCard() {
      return this.cards[this.currentCardCount + 1];
    }
  },
  mounted() {
    this.$store.dispatch("getCards");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getResources");
  },
  methods: {
    loadNextCards() {
      this.currentCardCount++;
    }
  }
};
</script>

<style></style>
