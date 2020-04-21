<template>
  <div class="md-layout full">
      <div class="md-layout-item md-size-15 full">

      </div>
      <div class="md-layout-item md-size-85 full">
        <div class="md-layout">
          
        </div>
        <List />
      </div>
  </div>
</template>

<script>

export default {
  name: 'Room',
  components: {}
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
