<template>
  <v-row>
    <v-col v-for="(room, i) in roomList" :key="i" cols="12">
      <v-hover v-slot:default="{ hover }">
        <v-card v-on:click="joinRoom(room.id)" :elevation="hover ? 12 : 2">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">Room : {{room.id}}</v-card-title>
              <v-card-subtitle>{{room.nbPlayers}}/{{room.playerLimit}}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RoomList',
  computed: {
    ...mapGetters('roomList', ['getRoomList']),
    roomList () {
      return this.getRoomList
    }
  },
  methods: {
    joinRoom (id) {
      this.$router.push(`room/${id}`)
    }
  }
}
</script>
