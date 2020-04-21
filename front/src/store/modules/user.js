const state = {
    user: null
}

const getters = {
    getUser: state => state.user
}

const mutations = {
    updateUserName(user) {
        state.user = user
    },
    logout() {
        state.user = null
    }
}

const actions = {
    logout(state) {
        state.commit('logout')
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}