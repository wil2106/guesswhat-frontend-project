const state = {
    roomList: []
}

const getters = {
    getRoomList: state => state.roomList
}

const mutations = {}

const actions = {
    SOCKET_ROOMSBYCATEGORY(state, data) {
        state.roomList = data.rooms
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}