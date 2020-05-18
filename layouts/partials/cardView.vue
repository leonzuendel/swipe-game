<template>
  <div id="card-container">
    <template v-if="allCardsGone === false && cardsAreReady === true">
      <Vue2InteractDraggable
        v-for="(card, index) in currentCards"
        v-show="!loading"
        :key="card.title + index"
        :interact-max-rotation="20"
        :interact-out-of-sight-x-coordinate="600"
        :interact-x-threshold="130"
        :interact-lock-x-axis="lockCard(index)"
        :interact-lock-y-axis="lockCard(index)"
        :interact-lock-swipe-down="lockCard(index)"
        :interact-lock-swipe-left="lockCard(index)"
        :interact-lock-swipe-right="lockCard(index)"
        :interact-lock-swipe-up="lockCard(index)"
        :class="{ next: index === 0 && currentCards.length != 1 }"
        class="card"
        :interact-event-bus-events="eventBus(index)"
        :style="categoryColor(card.category)"
        @draggedRight="draggedRight(index)"
        @draggedLeft="draggedLeft(index)"
        @draggedUp="draggedUp(index)"
        @draggedDown="draggedDown(index)"
      >
        <div class="card-content">
          <div class="card-symbols">
            <h1>
              <i class="las la-coins"></i>
              {{ card.cost_gold }}
            </h1>
            <template v-if="card.cost_resources !== null">
              <div
                v-for="entry in resourcesCosts(card.cost_resources)"
                :key="entry.res"
                class="resource-costs"
              >
                <template
                  v-if="resource(entry.res) != null && cardsAreReady === true"
                >
                  <i :class="resource(entry.res).icon"></i>
                  {{ entry.cost }}
                </template>
              </div>
            </template>
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
import { Vue2InteractDraggable, InteractEventBus } from "vue2-interact";

const INTERACT_DRAGGED_DOWN = "INTERACT_DRAGGED_DOWN";
const INTERACT_DRAGGED_LEFT = "INTERACT_DRAGGED_LEFT";
const INTERACT_DRAGGED_RIGHT = "INTERACT_DRAGGED_RIGHT";
const INTERACT_DRAGGED_UP = "INTERACT_DRAGGED_UP";

export default {
  components: {
    Vue2InteractDraggable
  },
  props: {
    cardsAreReady: {
      type: Boolean,
      required: true
    },
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
      loading: true,
      currentCards: [],
      lock1: false,
      lock0: true,
      interactEventBusEvents: {
        draggedDown: INTERACT_DRAGGED_DOWN,
        draggedLeft: INTERACT_DRAGGED_LEFT,
        draggedRight: INTERACT_DRAGGED_RIGHT,
        draggedUp: INTERACT_DRAGGED_UP
      }
    };
  },

  computed: {},
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener("keyup", this.keyEvent);
  },
  destroyed() {
    window.removeEventListener("keyup", this.keyEvent);
  },

  async mounted() {
    await setTimeout(() => {
      this.currentCards.push(this.nextCard);
    }, 100);
    await setTimeout(() => {
      this.currentCards.push(this.currentCard);
    }, 101);
    this.loading = false;
  },
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
    async draggedRight(index) {
      console.log("Right!");
      await this.buyCard();
    },
    async removeCard(index) {
      this.changeResource(2, 1);
      await setTimeout(() => {
        this.currentCards.pop();
      }, 80);

      const next = await document.getElementsByClassName("card")[0];
      next.classList.add("scale");
      await setTimeout(() => {
        this.$parent.loadNextCards();
      }, 81);

      await setTimeout(() => {
        this.currentCards.unshift(this.nextCard);
      }, 83);

      await setTimeout(() => {
        this.$store.dispatch("quickSave");
        console.log("quick save");
      }, 85);
    },
    lockCard(index) {
      if (this.$store.state.userResources[2] > 0) {
        if (index === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    eventBus(index) {
      if (index === 0) {
        return {};
      } else {
        return this.interactEventBusEvents;
      }
    },
    dragDown() {
      if (this.$store.state.userResources[2] > 0) {
        InteractEventBus.$emit(INTERACT_DRAGGED_DOWN);
      }
    },

    dragLeft() {
      if (this.$store.state.userResources[2] > 0) {
        InteractEventBus.$emit(INTERACT_DRAGGED_LEFT);
      }
    },

    dragRight() {
      if (this.$store.state.userResources[2] > 0) {
        InteractEventBus.$emit(INTERACT_DRAGGED_RIGHT);
      }
    },

    dragUp() {
      if (this.$store.state.userResources[2] > 0) {
        InteractEventBus.$emit(INTERACT_DRAGGED_UP);
      }
    },
    async keyEvent(e) {
      const key = e.keyCode;

      if (key === 65) {
        await this.dragLeft();
      }
      if (key === 68) {
        await this.dragRight();
      }
      if (key === 87) {
        await this.dragUp();
      }
      if (key === 83) {
        await this.dragDown();
      }
    },
    buyCard(index) {
      const cardGoldCost = this.currentCard.cost_gold;
      const cardId = this.currentCard.id;

      if (cardGoldCost <= this.$store.state.gold) {
        const newGold = this.$store.state.gold - cardGoldCost;
        this.$store.dispatch("saveGold", newGold);
        this.removeCard(index);
        this.$store.dispatch("addUserCard", cardId);
        console.log(this.currentCard.title + " gekauft!");
      } else {
        alert("Karte ist zu teuer.");
        this.removeCard(index);
      }
    },
    changeResource(resInt, minus) {
      const res = resInt.toString();
      const current = this.$store.state.userResources[res];
      const newResInt = current - minus;
      const newRes = newResInt.toString();
      const resource = res.toString();
      this.$store.dispatch("changeUserResources", {
        res: resource,
        amount: newRes
      }); // res, amount
    }
  }
};
</script>

<style></style>
