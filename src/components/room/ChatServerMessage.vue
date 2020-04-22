<template>
    <v-list-item-content style="display: flex">
        <div style="font-style:italic;"> Player {{this.playerUsername}} {{this.joined ? 'joined ' : 'left'}}</div>
    </v-list-item-content>
</template>
<script>
export default {
  name: 'ChatServerMessage',
  props: ['joined', 'playerUsername']
}
</script>
