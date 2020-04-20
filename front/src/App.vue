<template>
  <div class="container">
    <HeaderBanner/>
    <RoomContainer/>
  </div>
</template>

<script>
import HeaderBanner from './components/header'
import RoomContainer from './components/roomContainer'

export default {
  name: 'App',
  components: {
    HeaderBanner,
    RoomContainer
  },
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