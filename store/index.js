// Import Directus Client
import client from '@/client'

export const state = () => ({
  test: {}
})

export const actions = {
  async getProjects({ commit }) {
    state.loading = true
    const request = await client.getItems('projekte')
    commit('SET_PROJECTS', request.data)
  }
}

export const mutations = {
  SET_PROJECTS(state, payload) {
    state.projects = payload
    state.loading = false
  }
}
