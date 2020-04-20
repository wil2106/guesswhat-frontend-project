<template>
  <div>
    <HeaderBanner/>
    <List />
  </div>
</template>

<script>
import HeaderBanner from './components/header'
import List from './components/rooms/list'

export default {
  name: 'App',
  components: {
    HeaderBanner,
    List
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  }
}
</script>
