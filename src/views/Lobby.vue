<template>
  <v-container fluid>
    <v-row no-gutters>
        <v-col  :md="2" >
          <v-card class="pa-2" outlined tile>
            Categories
          </v-card>
        </v-col>
        <v-col  :md="10">
          <v-card class="pa-2" outlined tile>
            Public rooms for category : {{this.category}}
          </v-card>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col :md="2">
            <Categories/>
            <CreateRoom/>
        </v-col>
        <v-col :md="10">
            <RoomList/>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Categories from '../components/lobby/Categories'
import RoomList from '../components/lobby/RoomList'
import CreateRoom from '../components/lobby/newRoom'
import { mapGetters } from 'vuex'
export default {
  name: 'Lobby',
  components: { Categories, RoomList, CreateRoom },
  computed: {
    ...mapGetters('categories', ['getSelectedCategory']),
    category () {
      return this.getSelectedCategory
    }
  }
}
</script>
