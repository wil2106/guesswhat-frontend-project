<template>
 <v-container fluid>
    <v-row no-gutters>
        <v-col :md="2">
          <v-btn small class="mb-2" @click="leaveRoom()">Back to Lobby</v-btn>
        </v-col>
        <v-col :md="10">
          Room: {{this.$route.params.id}}
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col :md="2">
          <v-card class="pa-2" outlined tile>
            Ranking
          </v-card>
        </v-col>
        <v-col :md="8">
          <v-card class="pa-2" outlined tile>
              Image
          </v-card>
        </v-col>
        <v-col :md="2">
          <v-card class="pa-2" outlined tile>
            Chat
          </v-card>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col :md="2">
          <v-card class="pa-2" outlined tile>
          </v-card>
        </v-col>
        <v-col :md="8">
            <ImageComponent/>
            <v-btn small class="mt-2" @click="voteToSkip()">Vote to skip <div v-if="nbVoters">({{nbVoters.skipCount}}/{{nbVoters.playerCount}})</div></v-btn>
        </v-col>
        <v-col :md="2">
            <Chat v-bind:roomId="this.$route.params.id"/>
        </v-col>
    </v-row>
    <JoinDialog v-bind:roomId="this.$route.params.id"/>
  </v-container>
</template>

<script>
import JoinDialog from '../components/room/JoinDialog'
import ImageComponent from '../components/room/Image'
import Chat from '../components/room/Chat'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Room',
  components: { JoinDialog, ImageComponent, Chat },
  data () {
    return {
      roomId: this.$route.params.id
    }
  },
  methods: {
    ...mapMutations('chat', ['clearMessages']),
    ...mapMutations('image', ['clearImage']),
    ...mapMutations('vote', ['resetNbOfVoters']),
    ...mapMutations('roomJoin', ['resetRequestStatus']),
    leaveRoom () {
      this.$router.push('/')
    },
    voteToSkip () {
      var message = {
        roomId: this.roomId
      }
      this.$socket.emit('voteToSkip', message)
    }
  },
  computed: {
    ...mapGetters('vote', ['getNbOfVoters']),
    nbVoters () {
      return this.getNbOfVoters
    }
  },
  beforeDestroy () {
    this.clearMessages()
    this.clearImage()
    this.resetRequestStatus()
    this.resetNbOfVoters()
    this.$socket.emit('leaveRoom', { roomId: this.roomId })
  }
}
</script>
