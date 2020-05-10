<template>
  <div id="content">
    <template v-if="loading !== true">
      <cardView
        :cards-are-ready="cardsAreReady"
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
      deckLength: 0,
      cardsAreReady: false
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
    await this.$store.dispatch("loadDeck");
    if (Object.keys(this.$store.state.deck).length !== 0) {
      const deckArray = await this.$store.state.deck;
      const deck = [];
      await deckArray.forEach((id) => {
        const card = this.cards.filter((card) => card.id === id)[0];
        deck.push(card);
      });
      this.deck = await deck;
      this.deckLength = await this.deck.length;
      this.loading = false;
      await setTimeout(() => {
        this.cardsAreReady = true;
      }, 100);
    } else {
      await this.loadNewDeck();
      await setTimeout(() => {
        this.cardsAreReady = true;
      }, 100);
    }
    this.currentCardCount = this.$store.state.currentCardCount;
    window.setInterval(() => {
      this.$store.dispatch("quickSave");
      console.log("quick save");
    }, 10000);
  },
  async beforeDestroy() {
    this.$store.dispatch("saveCurrentCardCount", this.currentCardCount);
    this.$store.dispatch("saveCurrentDeckLength", this.deckLength);
    await this.$store.dispatch("logOutUser");
    this.$router.push("/login");
  },
  methods: {
    async loadNextCards() {
      await this.deckLength--;
      await this.currentCardCount++;
      this.$store.dispatch("saveCurrentCardCount", this.currentCardCount);
      this.$store.dispatch("saveCurrentDeckLength", this.deckLength);
      if (this.deckLength < 9) {
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

      this.$store.dispatch("saveCurrentDeck", this.deck);
    }
  }
};
</script>

<style></style>
