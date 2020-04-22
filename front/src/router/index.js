  
import Vue from 'vue'
import VueRouter from 'vue-router'
import Lobby from '../views/lobby.vue'
import Room from '../views/room.vue'
//import store from '../store/index'

Vue.use(VueRouter)
function beforeEnter (_to, _from, next) {
    /*
    if (!store.getters['user/isAuthenticated']) {
      await store.dispatch('user/fetchUser')
    }
    */
    //verify player accepted in room TODO
    next()
    return
    /*
    if (true) {
      next()
      return
    }
    */
    //next('/lobby')
  }
const routes = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/room/:id',
    name: 'Module',
    component: Room,
    beforeEnter
  }
]

export default new VueRouter({ routes })