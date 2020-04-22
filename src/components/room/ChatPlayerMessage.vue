<template>
    <v-list-item-content :class="{green: this.valid}" style="display: flex">
        <div v-bind:style="{color:this.playerColor}">{{this.playerUsername}}</div>
        <div> : {{this.text}} </div>
    </v-list-item-content>
</template>
<script>
export default {
  name: 'ChatPlayerMessage',
  props: ['valid', 'playerUsername', 'playerColor', 'text']
}
</script>
