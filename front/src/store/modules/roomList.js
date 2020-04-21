const state = {
    roomList: [],
    roomId: null,
}

const getters = {
    getRoomList: state => state.roomList,
    getRoomId: state => state.roomId
}

const mutations = {
    update(state, {
        data
    }) {
        state.roomList = [].concat(data)
    },
    updateRoomId(state, {
        data
    }) {
        state.roomId = data
    }
}

const actions = {
    async SOCKET_roomsByCategory(state, data) {
        state.commit('update', {
            data: data.rooms
        })
    },
    async SOCKET_privateRoomId(state, data) {
        state.commit('updateRoomId', {
            data: data.message
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}