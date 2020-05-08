// Import Directus Client
import client from "@/client";

export const state = () => ({
  loading: true,
  cards: [],
  categories: []
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
  }
};

export const mutations = {
  SET_CARDS(state, payload) {
    state.cards = payload;
    state.loading = false;
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  }
};
