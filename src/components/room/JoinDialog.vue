<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Join room {{this.roomId}}</v-card-title>
        <v-card-text>
            <v-text-field v-model="username" label="Username :" required></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-alert v-if="this.requestStatus !== null" type="error">{{this.requestStatus.message}}</v-alert>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onCancel()"> Cancel </v-btn>
          <v-btn class="ma-2" :loading="loading" :disabled="loading" color="primary" @click="loader = 'loading'"> Join </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['roomId'],
  data () {
    return {
      dialog: true,
      username: null,
      loader: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters('roomJoin', ['getRequestStatus']),
    requestStatus () {
      return this.getRequestStatus
    }
  },
  methods: {
    ...mapMutations('roomJoin', ['updateRequestStatus']),
    onCancel () {
      this.$router.push('/')
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
    loader () {
      if (this.username != null) {
        const l = this.loader
        this[l] = !this[l]
        var message = { roomId: this.roomId, username: this.username }
        this.$socket.emit('joinRoom', message)
      }
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
