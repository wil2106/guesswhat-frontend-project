import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('localhost:8080'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
