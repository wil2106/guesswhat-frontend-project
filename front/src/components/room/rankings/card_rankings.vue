<template>
    <div class="card md-layout" v-bind:style="'background: '+isRanked+';'">
        <span class="md-layout-item name"> {{rank}} --- {{username}}</span>
        <span class="md-layout-item info">{{nbPoints}} pts</span>
    </div>
</template>

<script>
export default {
  name: 'Card_RK',
  props: ['rank', 'username', 'nbPoints'],
  computed: {
    isRanked () {
    let color = '#ffffff' // rank 4 or lower = white
        if (this.rank == 1) {
            color = '#eaf900'; // rank 1 = gold
        }
        else if (this.rank == 2){
            color = '#d6d6cc'; // rank 2 = silver
        }
        else if (this.rank == 3){
            color = '#c54a15'; // rank 3 = bronze
        }
        return color;
    }

  }
}
</script>

<style scoped>
.card {
width: 512px;
height: 62px;

border-radius: 30px;
font-family: Roboto;
font-size: 1.5rem;
background: white;
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
