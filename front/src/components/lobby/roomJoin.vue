<template>
  <div>
    <md-dialog :md-active.sync="showDialog" class="dialog md-layout">
      <md-dialog-title class="md-layout-item">Join Room</md-dialog-title>
      <md-field class="code">
        <label>Room Code</label>
        <md-input v-model="code"></md-input>
    </md-field>
      <md-dialog-actions class="actions md-layout-item">
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="onClickCreate">Join</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-primary md-raised" @click="showDialog = true">Join Room</md-button>
  </div>
</template>

<script>
export default {
  name: "newRoom",
  data: () => ({
    showDialog: false,
    code: '',
  }),
  methods: {
    onClickJoin() {
      this.$socket.emit('startPrivateGame', {
        message: {
          roomId: code
        }
      })
    }
  }
};
</script>

<style>
.md-dialog {
    max-width: 768px;
    width: 400px;
    height: 400px;
}
.dialog {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  opacity: 1;
  pointer-events: none;
}
.code
{
    width: 80% !important;
    align-self: center;
}
</style>