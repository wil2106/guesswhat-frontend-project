<template>
  <div class="card md-layout">
    <span class="md-layout-item name"> Room {{name}}</span> 
    <span class="md-layout-item info">{{nbPlayers}}/{{playerLimit}}</span>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['name', 'playerLimit', 'nbPlayers', 'id']
}
</script>

<style scoped>
.card {
width: 512px;
height: 62px;

background: #FFFFFF;
border-radius: 30px;
font-family: Roboto;
font-size: 1.5rem;
  line-height: 2rem;
}
.name {
  text-align: left;
  margin: 1rem 3rem;
}
.info {
  text-align: right;
  margin: 1rem 3rem;
}
</style>
