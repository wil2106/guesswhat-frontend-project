<template>
  <div class="md-layout-item full">
      <span class="header-category"> Public Rooms : {{category? category: 'All'}}</span>
      <md-list class="full ul-background">
          <md-list-item v-for="(item, index) in roomList" :key="index" class="fragment">
              <Card :name="index" :id="item.id" :playerLimit="item.playerLimit" :nbPlayers="item.nbPlayers"/>
          </md-list-item>
      </md-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './card'
export default {
    name: 'Room_list',
    components: { Card },
    computed: {
        ...mapGetters('roomList', ['getRoomList']),
        ...mapGetters('categories', ['getSelectedCategory']),
        category () {
            return this.getSelectedCategory
        },
        roomList () {
            return this.getRoomList
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
