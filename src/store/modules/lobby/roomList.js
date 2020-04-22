/* eslint-disable space-before-function-paren */
const state = {
  roomList: [],
  roomId: null
}

const getters = {
  getRoomList: state => state.roomList,
  getRoomId: state => state.roomId
}

const mutations = {
  updateRoomList(state, data) {
    state.roomList = data.rooms
  },
  updateRoomId(state, data) {
    state.roomId = data.roomId
  },
  updatePlayerList(state, data) {
    for (let i = 0; i < state.roomList.length; i++) {
      if (state.roomList[i].id === data.id) {
        state.roomList[i].nbPlayers = data.nbPlayers
      }
    }
  }
}

const actions = {
  async SOCKET_roomsByCategory(state, data) {
    state.commit('updateRoomList', data)
  },
  async SOCKET_privateRoomId(state, data) {
    state.commit('updateRoomId', data)
  },
  async SOCKET_roomPlayersUpdate(state, data) {
    state.commit('updatePlayerList', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
