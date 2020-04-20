<template>
  <div>
    <h3> Room {{name}} : {{nbPlayers}}/{{playerLimit}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['name', 'playerLimit', 'nbPlayers', 'id']
}
</script>

<style>

</style>
