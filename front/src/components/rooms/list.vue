<template>
  <div>
      <md-list>
          <h4>Category</h4>
          <md-list-item v-for="(item, index) in roomList" :key="index">
              <Card :name="item" />
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
            return this.getRoomList
        }
    },
    methods: {
        clickButton: function() {
            this.$socket.emit('getRoomsByCategory', { category : 'Mangas'})
        }
    }
}
</script>

<style>

</style>
