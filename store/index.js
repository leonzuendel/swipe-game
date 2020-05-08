// Import Directus Client
import client from "@/client";

export const state = () => ({
  loading: true,
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
  }
};
