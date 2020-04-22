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
        </v-col>
        <v-col :md="2">
          <v-card class="pa-2" outlined tile>
          </v-card>
        </v-col>
    </v-row>
    <JoinDialog v-bind:roomId="this.$route.params.id"/>
  </v-container>
</template>

<script>
import JoinDialog from '../components/room/JoinDialog'
import ImageComponent from '../components/room/Image'
export default {
  name: 'Room',
  components: { JoinDialog, ImageComponent },
  methods: {
    leaveRoom () {
      this.$socket.emit('leaveRoom', { roomId: this.$route.params.id })
      this.$router.push('/')
    }
  }
}
</script>
