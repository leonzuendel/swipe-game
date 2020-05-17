// Import Directus Client
import client from "@/client";

export const state = () => ({
  loading: true,
  user: null,
  gold: 100,
  currentCardCount: 0,
  deckLength: 0,
  cards: [],
  deck: [],
  categories: [],
  resources: []
});

export const actions = {
  async getCards({ commit }) {
    state.loading = true;
    const request = await client.getItems("cards");
    commit("SET_CARDS", request.data);
  },

  async getCategories({ commit }) {
    const request = await client.getItems("categories");
    commit("SET_CATEGORIES", request.data);
  },

  async getResources({ commit }) {
    const request = await client.getItems("resources");
    commit("SET_RESOURCES", request.data);
  },

  logInUser({ commit }, user) {
    commit("SET_USER", user);
  },

  async logOutUser({ commit, dispatch, state, getters }) {
    const userId = getters.userId;
    const gold = state.gold;
    const currentCardCount = state.currentCardCount;
    const deck = state.deck;
    const deckLength = state.deckLength;
    await dispatch("saveDeck", {
      userId,
      currentCardCount,
      deck,
      deckLength,
      gold
    });

    await this.$fireAuth.signOut().then(
      function() {},
      function(err) {
        alert(err.message);
      }
    );

    commit("SET_USER", null);

    console.log("logged out");
  },

  async quickSave({ commit, dispatch, state, getters }) {
    const userId = getters.userId;
    const gold = state.gold;
    const currentCardCount = state.currentCardCount;
    const deck = state.deck;
    const deckLength = state.deckLength;
    await dispatch("saveDeck", {
      userId,
      currentCardCount,
      deck,
      deckLength,
      gold
    });
  },

  async saveDeck({ commit }, data) {
    console.log(data.gold);
    const userId = await data.userId;
    const deck = await Object.assign({}, data.deck);
    const count = await data.currentCardCount.toString();
    const length = await data.deckLength.toString();
    const userGold = await data.gold.toString();
    if (userId !== undefined && userId !== null) {
      await this.$fireDb.ref("users/" + userId).set({
        gold: userGold,
        deck: {
          currentCardCount: count,
          currentDeck: deck,
          currentDeckLength: length
        }
      });
    }
  },

  loadData({ commit, dispatch }) {
    dispatch("loadDeck");
  },

  async loadDeck({ commit, getters }) {
    const userId = await getters.userId;
    let deck = null;
    let gold = null;
    await this.$fireDb
      .ref("/users/" + userId)
      .once("value")
      .then(function(snapshot) {
        if (snapshot.val() !== null && snapshot.val() !== undefined) {
          deck = snapshot.val().deck;
          gold = snapshot.val().gold;

          if (deck.currentDeck !== null && deck.currentDeck !== undefined) {
            const currentDeckArray = Object.values(deck.currentDeck);
            commit("SET_CURRENT_DECK", currentDeckArray);

            commit("SET_CURRENT_DECK_LENGTH", parseInt(deck.currentDeckLength));

            commit("SET_CURRENT_CARD_COUNT", parseInt(deck.currentCardCount));

            console.log("loaded deck");
          }

          if (deck.gold !== null && deck.gold !== undefined) {
            commit("SET_GOLD", parseInt(gold));

            console.log("loaded gold");
          }
        }
      });
  },

  nuxtServerInit({ commit }, { req }) {
    if (req.userData) {
      // We have all the needed user details. Lets push it to Vuex
      commit("SET_USER", req.userData);
      // and so on.....
    }
  },

  saveGold({ commit }, gold) {
    commit("SET_GOLD", gold);
  },

  saveCurrentCardCount({ commit }, count) {
    commit("SET_CURRENT_CARD_COUNT", count);
  },

  saveCurrentDeckLength({ commit }, length) {
    commit("SET_CURRENT_DECK_LENGTH", length);
  },

  async saveCurrentDeck({ commit }, deck) {
    const array = [];
    deck.forEach((card) => {
      array.push(card.id);
    });
    await commit("SET_CURRENT_DECK", array);
  }
};

export const mutations = {
  SET_CARDS(state, payload) {
    state.cards = payload;
    state.loading = false;
  },

  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },

  SET_RESOURCES(state, payload) {
    state.resources = payload;
  },

  SET_USER(state, payload) {
    state.user = payload;
  },

  SET_GOLD(state, payload) {
    state.gold = payload;
  },

  SET_CURRENT_CARD_COUNT(state, payload) {
    state.currentCardCount = payload;
  },
  SET_CURRENT_DECK(state, payload) {
    state.deck = payload;
  },
  SET_CURRENT_DECK_LENGTH(state, payload) {
    state.deckLength = payload;
  }
};

export const getters = {
  userId: (state) => {
    if (state.user != null) {
      return state.user.uid;
    }
  },

  userName: (state) => {
    if (state.user != null) {
      return state.user.displayName;
    }
  },

  userEmail: (state) => {
    if (state.user != null) {
      return state.user.email;
    }
  },

  loggedIn: (state) => {
    if (state.user != null) {
      return true;
    } else {
      return false;
    }
  }
};

export const strict = false;
