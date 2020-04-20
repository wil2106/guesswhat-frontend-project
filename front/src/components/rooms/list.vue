<template>
  <div>
      <md-list>
          <h4>Category</h4>
          <md-list-item v-for="room in roomList" :key="room.id">
              <Card :name="room.id" />
          </md-list-item>
          <button v-on:click="clickButton"> CLICK </button>
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
        roomList () {
            console.log(this.getRoomList)
            return this.getRoomList
        }
    },
    methods: {
        clickButton: function() {
            this.$socket.emit('getRoomsByCategory', { category : 'Mangas'})
        }
    },
    sockets: {
        getRoomsByCategory: function(data) {
            console.log(data)
        }
    }
}
</script>

<style>

</style>
