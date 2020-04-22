<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
    </md-app>
    <md-toolbar>
          <h3 class="md-title"> GUESSWHAT.io </h3>
    </md-toolbar>
    <md-app-content>
      <router-view>
      </router-view>
    </md-app-content>
  </div>
</template>

<script>
//import HeaderBanner from './components/header'
//import RoomContainer from './components/roomContainer'

export default {
  name: 'App',
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}

.container {
  margin: 0;
  padding: 0;
  height: 100% !important;
}
</style>