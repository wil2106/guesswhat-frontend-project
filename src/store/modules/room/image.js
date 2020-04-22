const state = {
  image: null
}

const getters = {
  getImage: state => state.image
}

const mutations = {
  updateImage (state, data) {
    state.image = data
  }
}

const actions = {
  async SOCKET_imageUpdate (state, data) {
    state.commit('updateImage', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
