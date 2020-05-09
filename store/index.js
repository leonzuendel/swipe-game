// Import Directus Client
import client from "@/client";

export const state = () => ({
  loading: true,
  user: null,
  cards: [],
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
  logOutUser({ commit }, user) {
    commit("SET_USER", null);
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
  }
};

export const getters = {
  userId: (state) => {
    if (state.user != null) {
      return state.user.uid;
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
