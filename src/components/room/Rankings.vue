<template>
    <div>
        <v-container id="scroll-target" style="max-height: 500px;
        border: solid;border-color: #E0E0E0; border-width:1px;" class="overflow-y-auto" fluid>
        <v-row align="start" justify="start" style="height: 500px" >
          <v-list-item-group v-model="playerScoresList" style="width: 100%">
            <md-list-item v-for="(player, index) in playerScoresList" :key="index" class="fragment">
                <div v-bind:style="'background: '+isRanked(index+1)+';'">
                    {{index+1}} - {{player.username}} - {{player.points}} pts
                </div>
            </md-list-item>
          </v-list-item-group>
        </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Rankings',
  computed: {
    ...mapGetters('rankings', ['getPlayerScoresList']),
    playerScoresList () {
      return this.getPlayerScoresList
    }
  },
  methods: {
    isRanked (rank) {
      let color = '#ffffff' // rank 4 or lower = white
      if (rank === 1) {
        color = '#eaf900' // rank 1 = gold
      } else if (rank === 2) {
        color = '#d6d6cc' // rank 2 = silver
      } else if (rank === 3) {
        color = '#c54a15' // rank 3 = bronze
      }
      return color
    }
  }
}
</script>
