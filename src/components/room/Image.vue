<template>
  <v-row align="center" justify="center">
    <v-img v-if="this.image !== null" v-bind:src="this.image.image" aspect-ratio="1" class="grey lighten-2" max-width="1000" max-height="600">
    </v-img>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Image',
  data: () => ({}),
  computed: {
    ...mapGetters('image', ['getImage']),
    image () {
      return this.getImage
    }
  }
}
</script>
