import Vue from 'vue'
import VueRouter from 'vue-router'
import Lobby from '../views/Lobby.vue'
import Room from '../views/Room.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: Room
  },
  {
    path: '/*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
