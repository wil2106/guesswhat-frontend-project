<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Create Room</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Create Room </v-card-title>
        <v-card-text>
          <v-text-field v-model="username" label="Username :" required></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-select :items="this.getCategories()" lable="Category" v-model="category"></v-select>
        <h1> ID: {{roomID}} </h1>
        <v-card-actions>
          <v-alert v-if="this.requestStatus !== null" type="error">{{this.requestStatus.message}}</v-alert>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn
            class="ma-2"
            color="primary"
            @click="loader = 'loading'"
          >Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      dialog: false,
      username: null,
      loader: null,
      loading: false,
      category: null
    }
  },
  methods: {
    ...mapGetters('categories', ['getCategories']),
    onCancel () {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters('roomJoin', ['getRequestStatus']),
    ...mapGetters('roomList', ['getRoomId']),
    ...mapMutations('categories', ['updateSelectedCategory']),
    requestStatus () {
      return this.getRequestStatus
    },
    roomID () {
      return this.getRoomId
    }
  },
  watch: {
    requestStatus (val) {
      if (val !== null) {
        if (val.error === false) {
          this.updateRequestStatus(null)
          this.dialog = false
        }
      }

      const l = this.loader
      this[l] = !this[l]
    },
    async loader () {
      if (this.username != null) {
        const l = this.loader
        this[l] = !this[l]
        await this.$socket.emit('getPrivateRoomId')
      }
    }
  }
}
</script>

<style>
</style>
