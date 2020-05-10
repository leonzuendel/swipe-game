<template>
  <div id="content">
    <template v-if="loading !== true">
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
      currentCardCount: 0,
      deck: [],
      loading: true,
      deckLength: 0
    };
  },
  computed: {
    ...mapState(["cards", "categories", "resources"]),

    oneCardLeft() {
      if (this.currentCardCount + 2 === this.deck.length) {
        return true;
      } else {
        return false;
      }
    },

    noCardLeft() {
      if (this.currentCardCount + 1 >= this.deck.length) {
        return true;
      } else {
        return false;
      }
    },

    allCardsGone() {
      if (this.currentCardCount === this.deck.length) {
        return true;
      } else {
        return false;
      }
    },

    currentCard() {
      return this.deck[this.currentCardCount];
    },

    nextCard() {
      return this.deck[this.currentCardCount + 1];
    }
  },
  async mounted() {
    await this.$store.dispatch("getCards");
    await this.$store.dispatch("getCategories");
    await this.$store.dispatch("getResources");
    this.loadNewDeck();
  },
  methods: {
    loadNextCards() {
      this.deckLength--;
      this.currentCardCount++;
      if (this.currentCardCount + 1 > this.deckLength) {
        this.loadNewDeck();
      }
    },

    loadNewDeck() {
      const times = (x) => (f) => {
        if (x > 0) {
          f();
          times(x - 1)(f);
        }
      };
      const cards = this.cards;
      const deck = [];
      cards.forEach((card) => {
        const rare = card.rare;
        times(rare)(() => deck.push(card));
      });

      this.shuffleDeck(deck);
    },

    shuffleDeck(array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      this.setDeck(array);
    },

    async setDeck(array) {
      const times = (x) => (f) => {
        if (x > 0) {
          f();
          times(x - 1)(f);
        }
      };
      const oldLength = await this.deck.length;
      await array.forEach((card) => {
        this.deck.push(card);
      });
      await times(oldLength - 2)(() => this.deck.pop());
      this.deckLength = array.length;
      this.currentCardCount = 0;
      this.loading = false;
    }
  }
};
</script>

<style></style>
