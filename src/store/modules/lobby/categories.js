const state = {
  selected_category: null,
  category_list: []
}

const getters = {
  getSelectedCategory: state => state.selected_category,
  getCategories: state => state.category_list
}

const mutations = {
  updateSelectedCategory (state, category) {
    state.selected_category = category
  },
  updateCategories (state, data) {
    state.category_list = data
  }
}

const actions = {
  async SOCKET_categories (state, data) {
    state.commit('updateCategories', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
