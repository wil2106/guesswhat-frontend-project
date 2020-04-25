const state = {
  playerScoresList: []
}

const getters = {
  getPlayerScoresList: state => state.playerScoresList.sort((a, b) => (a.points <= b.points && a.username > b.username) ? 1 : -1)
}

const mutations = {
  addJoinedPlayer (state, data) {
    state.playerScoresList.push({ username: data.playerUsername, points: 0 })
    state.playerScoresList.sort((a, b) => (a.points <= b.points && a.username > b.username) ? 1 : -1)
  },
  removeLeftPlayer (state, data) {
    state.playerScoresList.splice(state.playerScoresList.findIndex(
      function (player, index) {
        if (player.username === data.playerUsername) {
          return index
        }
      }), 1)
  },
  clearPlayerScoresList (state) {
    state.playerScoresList = []
  },
  updatePlayerScoresList (state, data) {
    state.playerScoresList = data.players
    state.playerScoresList.sort((a, b) => (a.points <= b.points && a.username > b.username) ? 1 : -1)
  },
  updatePlayerScoresList2 (state, data) {
    for (let i = 0; i < state.playerScoresList.length; i++) {
      if (state.playerScoresList[i].username === data.pointUpdate.playerUsername) {
        state.playerScoresList[i].points = data.pointUpdate.points
      }
    }
  }
}

const actions = {
  async SOCKET_addJoinedPlayer (state, data) {
    state.commit('addJoinedPlayer', data)
  },
  async SOCKET_removeLeftPlayer (state, data) {
    state.commit('removeLeftPlayer', data)
  },
  async SOCKET_updatePlayerScoresList (state, data) {
    state.commit('updatePlayerScoresList', data)
  },
  async SOCKET_updatePlayerScoresList2 (state, data) {
    state.commit('updatePlayerScoresList2', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
