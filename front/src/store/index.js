import Vue from 'vue'
import Vuex from 'vuex'
import roomList from './modules/roomList'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isConnected: false,
        socketMessage: ''
    },
    action: {},
    mutations: {
        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },

        SOCKET_DISCONNECT(state) {
            state.isConnected = false;
        },

        SOCKET_MESSAGECHANNEL(state, message) {
            state.socketMessage = message
        }
    },
    getters: {},
    modules: {
        roomList: roomList
    }
})