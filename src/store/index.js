import Vue from 'vue'
import Vuex from 'vuex'
import roomList from './modules/lobby/roomList'
import categories from './modules/lobby/categories'
import rankings from './modules/room/rankings'
import roomJoin from './modules/room/roomJoin'
import vote from './modules/room/vote'
import image from './modules/room/image'
import chat from './modules/room/chat'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: ''
  },
  action: {},
  mutations: {
    SOCKET_CONNECT (state) {
      state.isConnected = true
    },
    SOCKET_DISCONNECT (state) {
      state.isConnected = false
    },
    SOCKET_MESSAGECHANNEL (state, message) {
      state.socketMessage = message
    }
  },
  getters: {},
  modules: {
    roomList: roomList,
    categories: categories,
    rankings: rankings,
    roomJoin: roomJoin,
    vote: vote,
    image: image,
    chat: chat
  }
})
