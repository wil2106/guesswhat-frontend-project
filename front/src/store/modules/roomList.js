const state = {
    roomList: []
}

const getters = {
    getRoomList: state => state.roomList
}

const mutations = {
    update(state, {
        data
    }) {
        state.roomList = [].concat(data)
    }
}

const actions = {
    async SOCKET_roomsByCategory(state, data) {
        state.commit('update', {
            data: data.rooms
        })
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}