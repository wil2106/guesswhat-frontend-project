<template>
  <div>
    <md-dialog :md-active.sync="showDialog" class="dialog md-layout">
      <md-dialog-title class="md-layout-item">Create Room</md-dialog-title>
      <md-field class="droplist">
        <label for="category">Category</label>
        <md-select v-model="category" name="category" id="category">
          <md-option v-for="(item, index) in list" :key="index" :value="item">{{item}}</md-option>
        </md-select>
      </md-field>
      <div class="output md-layout-item">
        <p>Generated Code</p>
        <p> {{code}} </p>
      </div>
      <md-dialog-actions class="actions md-layout-item">
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="onClickCreate">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-primary md-raised" @click="showDialog = true">Create Private Room</md-button>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "newRoom",
  data: () => ({
    showDialog: false,
    code: 'default',
    category: null
  }),
  computed: {
    ...mapGetters('categories', ['getCategories']),
    list () {
      return this.getCategories
    }
  },
  methods: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('roomList', ['getRoomId']),
    ...mapMutations('user', ['updateUserName']),
    async onClickCreate() {
      if(!this.getUser()){
        let user = prompt('Please enter username: ')
        this.updateUserName(user)
      }
      await this.$socket.emit('getPrivateRoomId')
      await this.$socket.emit('createPrivateRoom', {
        message: {
          category: this.category,
          roomId: this.getRoomId,
          username: this.getUser
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
.droplist
{
    width: 80% !important;
    align-self: center;
}
.output {
    margin-top: 2rem;
    align-content: center;
    text-align: center;
}
.actions {
    position: absolute;
    bottom: 10px;
    right: 1rem;
    height: 20px
}
</style>
