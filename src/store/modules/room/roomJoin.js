const state = {
  request_status: null
}

const getters = {
  getRequestStatus: state => state.request_status
}

const mutations = {
  updateRequestStatus (state, data) {
    state.request_status = data
  }
}

const actions = {
  async SOCKET_joinRoomResponse (state, data) {
    state.commit('updateRequestStatus', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
