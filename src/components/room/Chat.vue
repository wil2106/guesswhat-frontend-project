<template>
  <div>
    <v-container id="scroll-target" style="max-height: 600px;border: solid;border-color: #E0E0E0; border-width:1px;" class="overflow-y-auto" fluid>
        <v-row align="end" justify="start" style="height: 600px" >
            <v-list-item-group v-model="messages" color="primary"  style="width: 100%">
                <v-list-item v-for="(data, i) in messages" :key="i">
                    <ChatPlayerMessage v-if="data.message" v-bind:valid="data.message.valid" v-bind:playerUsername="data.message.playerUsername"
                        v-bind:playerColor="data.message.playerColor" v-bind:text="data.message.text"></ChatPlayerMessage>
                    <ChatServerMessage v-else v-bind:joined="data.joined" v-bind:playerUsername="data.playerUsername"></ChatServerMessage>
                </v-list-item>
            </v-list-item-group>
        </v-row>
    </v-container>
    <v-text-field class="mt-2" v-model="input" label="Write here" single-line solo v-on:keyup.enter="submitMessage"></v-text-field>
  </div>

</template>

<script>
import ChatPlayerMessage from './ChatPlayerMessage'
import ChatServerMessage from './ChatServerMessage'
import { mapGetters } from 'vuex'
export default {
  name: 'Chat',
  components: { ChatPlayerMessage, ChatServerMessage },
  props: ['roomId'],
  computed: {
    ...mapGetters('chat', ['getMessages']),
    messages () {
      return this.getMessages
    }
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    submitMessage () {
      if (this.input.trim() !== '') {
        var message = {
          roomId: this.roomId,
          text: this.input
        }
        this.$socket.emit('submitMessage', message)
        this.input = ''
      }
    }
  }
}
</script>
