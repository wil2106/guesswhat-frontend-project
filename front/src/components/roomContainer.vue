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
import Categories from './rooms/categories'
import List from './rooms/list'
import NewRoom from './rooms/newRoom'
import JoinRoom from './rooms/roomJoin'
export default {
  name: 'Room_container',
  components: { Categories, List, NewRoom, JoinRoom }
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
