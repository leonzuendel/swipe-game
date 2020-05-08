// Import Directus Client
import client from "@/client";

export const state = () => ({
  loading: true,
  cards: []
});

export const actions = {
  async getCards({ commit }) {
    const request = await client.getItems("cards");
    commit("SET_CARDS", request.data);
  }
};

export const mutations = {
  SET_CARDS(state, payload) {
    state.cards = payload;
    state.loading = false;
  }
};
