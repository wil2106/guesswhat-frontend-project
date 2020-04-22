const state = {
  message: null
}

const getters = {
  getMessage: state => state.message
}

const mutations = {
  updateMessage (state, data) {
    state.message = data
  }
}

const actions = {
  async SOCKET_message (state, data) {
    state.commit('updateMessage', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
