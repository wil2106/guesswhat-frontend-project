<template>
  <div class="md-layout-item full">
      <span class="header-category"> Ranked Players : </span>
      <md-list class="full ul-background">
          <md-list-item v-for="(item, index) in rankedPlayers" :key="index" class="fragment">
              <CardRK :rank="item.rank" :username="item.username" :nbPoints="item.nbPoints"/>
          </md-list-item>
      </md-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardRK from './card_rankings'
export default {
    name: 'Rankings',
    components: { CardRK },
    computed: {
        ...mapGetters('rankedPlayers', ['getRankedPlayers']),
        rankedPlayers () {
            return this.rankedPlayers
        }
    }
}
</script>

<style scoped>
.full {
    height: 100%;
}
.header-category {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    line-height: 2.3rem;
    /* identical to box height */

    margin: 2rem 1rem;
    color: #747474;
    overflow-wrap: break-word;
}
.ul-background {
    background: #EFEFF1 !important ;
}
.fragment {
    width: fit-content;
    margin: 1rem 1rem;
}
</style>
