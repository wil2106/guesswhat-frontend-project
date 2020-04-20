<template>
  <md-list>
      <h1> Categories </h1>
      <md-list-item v-on:click="onSelected('All')">
          <h3 class="md-list-item-text"> All </h3>
      </md-list-item>
      <md-list-item v-on:click="onSelected('Mangas')">
          <h3 class="md-list-item-text"> Anime & Manga </h3>
      </md-list-item>
      <md-list-item v-on:click="onSelected('Games')">
          <h3 class="md-list-item-text"> Games </h3>
      </md-list-item>
      <md-list-item v-on:click="onSelected('Series')">
          <h3 class="md-list-item-text"> Series </h3>
      </md-list-item>
      <md-list-item v-on:click="onSelected('Sports')">
          <h3 class="md-list-item-text"> Sport </h3>
      </md-list-item>
      <md-list-item v-on:click="onSelected('Films')">
          <h3 class="md-list-item-text"> Films </h3>
      </md-list-item>
      <md-list-item v-on:click="onSelected('Celebrities')">
          <h3 class="md-list-item-text"> Celebrities </h3>
      </md-list-item>
  </md-list>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    name: 'Categories',
    methods: {
        ...mapMutations('categories', ['updateSelectedCategory']),
        
        onSelected(category) {
            this.updateSelectedCategory(category)
        }
    }
}
</script>

<style>
.selected {
    color: cadetblue
}
</style>