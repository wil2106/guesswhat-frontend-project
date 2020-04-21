const state = {
    rankedPlayers: []
}

const getters = {
    getRankedPlayers: state => state.rankedPlayers,
    getRankedPlayersByUser: state => username =>
    {
        return state.rankedPlayers.find(_ => _.username === username)
    }
}

const mutations = {
    update(state, { data })
    {
        state.rankedPlayers = [].concat(data)
    }
}

const actions = {
    async SOCKET_rankedPlayersByRoom(state, data) {
        state.commit('update',
        {
            data: data.players
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
