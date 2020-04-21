<template>
  <div class="md-layout full">
      <div class="md-layout-item md-size-15 full">
          <Categories/>
      </div>
      <div class="md-layout-item md-size-85 full">
        <div class="md-layout">

        </div>
        <List/>
        <Rankings/>
      </div>
  </div>
</template>

<script>
import Categories from './rooms/categories'
import Rankings from './rankings/rankings'
import List from './rooms/list'
export default {
  name: 'TestContainer',
  components: { Categories, List, Rankings }
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
