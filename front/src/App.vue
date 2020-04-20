<template>
  <div>
    <HeaderBanner/>
    <Categories />
    <List />
  </div>
</template>

<script>
import HeaderBanner from './components/header'
import List from './components/rooms/list'
import Categories from './components/rooms/categories'

export default {
  name: 'App',
  components: {
    HeaderBanner,
    List,
    Categories
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  }
}
</script>
