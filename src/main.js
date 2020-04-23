import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

// Handle environment changes
// var port = process.env.OPENSHIFT_NODEJS_PORT || 8081
// var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:8080/'),
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
