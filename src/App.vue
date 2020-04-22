<template>
  <v-app>
    <v-app-bar app color="#3989D8">
       <v-toolbar-title class="font-weight-bold white--text">GuessWhat.io</v-toolbar-title>
    </v-app-bar>
    <v-content>
        <router-view>
        </router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({})
}
</script>
