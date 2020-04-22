const state = {
  messages: []
}

const getters = {
  getMessages: state => state.messages
}

const mutations = {
  addMessage (state, data) {
    state.messages.push(data)
  },
  clearMessages () {
    state.messages = []
  }
}

const actions = {
  async SOCKET_message (state, data) {
    state.commit('addMessage', data)
  },
  async SOCKET_playerJoined (state, data) {
    state.commit('addMessage', data)
  },
  async SOCKET_playerLeft (state, data) {
    state.commit('addMessage', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
