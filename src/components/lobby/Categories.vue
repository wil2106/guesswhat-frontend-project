<template>
  <v-list shaped>
    <v-list-item-group v-model="category" color="primary">
      <v-list-item v-for="(category, i) in list" :key="i" v-on:click="onSelected(category)">
        <v-list-item-content>
          <v-list-item-title v-text="category"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Lobby',
  data: () => ({
    category: null
  }),
  methods: {
    ...mapMutations('categories', ['updateSelectedCategory']),
    async onSelected (category) {
      this.updateSelectedCategory(category)
      this.$socket.emit('getRoomsByCategory', { category: category })
    }
  },
  computed: {
    ...mapGetters('categories', ['getCategories']),
    list () {
      return this.getCategories
    }
  },
  beforeMount () {
    this.$socket.emit('getCategories')
  }
}
</script>
