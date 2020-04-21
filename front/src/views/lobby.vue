<template>
  <div class="md-layout full">
      <div class="md-layout-item md-size-15 full">
        <Categories />
      </div>
      <div class="md-layout-item md-size-85 full">
        <div class="md-layout">
            <NewRoom class="md-layout-item"/>
            <JoinRoom class="md-layout-item"/>
        </div>
        <List />
      </div>
  </div>
</template>

<script>
import Categories from '../components/lobby/categories'
import List from '../components/lobby/list'
import NewRoom from '../components/lobby/newRoom'
import JoinRoom from '../components/lobby/roomJoin'
export default {
  name: 'Lobby',
  components: { Categories, List, NewRoom, JoinRoom },
  created() {
    console.log('LOBBY MOUNTED')
  }
}
</script>

<style lang="scss">
.md-layout-item {
    height: 100%;
}
.full {
    height: 100%;
    min-width: 150px !important;
}
</style>
