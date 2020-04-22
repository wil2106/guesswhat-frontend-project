const state = {
  nbOfVoters: null
}

const getters = {
  getNbOfVoters: state => state.nbOfVoters
}

const mutations = {
  updateNbOfVoters (state, data) {
    state.nbOfVoters = data
  }
}

const actions = {
  async SOCKET_playerVotedToSkip (state, data) {
    state.commit('updateNbOfVoters', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
