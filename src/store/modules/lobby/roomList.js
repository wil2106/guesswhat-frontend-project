const state = {
  roomList: [],
  roomId: null
}

const getters = {
  getRoomList: state => state.roomList,
  getRoomId: state => state.roomId
}

const mutations = {
  updateRoomList (state, data) {
    state.roomList = data.rooms
  },
  updateRoomId (state, { data }) {
    state.roomId = data
  }
}

const actions = {
  async SOCKET_roomsByCategory (state, data) {
    state.commit('updateRoomList', data)
  },
  async SOCKET_privateRoomId (state, data) {
    state.commit('updateRoomId', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
