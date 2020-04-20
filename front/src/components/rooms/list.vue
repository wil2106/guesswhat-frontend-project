<template>
  <div>
      <h1> {{category? category: 'All'}} - Public Rooms </h1>
      <md-list>
          <md-list-item v-for="(item, index) in roomList" :key="index">
              <Card :name="index" :id="item.id" :playerLimit="item.playerLimit" :nbPlayers="item.nbPlayers"/>
          </md-list-item>
      </md-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { mapMutations } from 'vuex'
import Card from './card'
export default {
    name: 'Room_list',
    components: { Card },
    computed: {
        ...mapGetters('roomList', ['getRoomList']),
        ...mapGetters('categories', ['getSelectedCategory']),
        category () {
            return this.getSelectedCategory
        },
        roomList () {
            return this.getRoomList
        }
    }
}
</script>

<style>

</style>
