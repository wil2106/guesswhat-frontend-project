<template>
  <div class="md-layout-item full">
    <div class="header-box">
      <span class="header-category">Categories</span>
    </div>
    <div class="full">
      <md-list class="md-layout full">
        <md-list-item v-on:click="onSelected('All')" class="content">
          <span class="md-list-item-text">All</span>
        </md-list-item>
        <md-list-item v-on:click="onSelected('Mangas')" class="content">
          <span class="md-list-item-text">Anime & Manga</span>
        </md-list-item>
        <md-list-item v-on:click="onSelected('Games')" class="content">
          <span class="md-list-item-text">Games</span>
        </md-list-item>
        <md-list-item v-on:click="onSelected('Series')" class="content">
          <span class="md-list-item-text">Series</span>
        </md-list-item>
        <md-list-item v-on:click="onSelected('Sports')" class="content">
          <span class="md-list-item-text">Sport</span>
        </md-list-item>
        <md-list-item v-on:click="onSelected('Films')" class="content">
          <span class="md-list-item-text">Films</span>
        </md-list-item>
        <md-list-item v-on:click="onSelected('Celebrities')" class="content">
          <span class="md-list-item-text">Celebrities</span>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Categories",
  methods: {
    ...mapMutations("categories", ["updateSelectedCategory"]),
    async onSelected(category) {
      this.updateSelectedCategory(category);
      if (category != undefined) {
        this.$socket.emit("getRoomsByCategory", { category: category });
      } else {
        this.$socket.emit("getRoomsByCategory", { category: "All" });
      }
    }
  }
};
</script>

<style>
.selected {
  color: cadetblue;
}
.full {
  height: 100%;
}
.content {
  position: absolute;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #0e0e10;

  border: 1px solid #efeff1;
  box-sizing: border-box;
}
.background {
  background: #e5e5e5;
}
.header-category {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 2.3rem;
  /* identical to box height */

  margin: 2rem 1rem;
  color: #747474;
}
.header-box {
  background: #ffffff;
  border: 1px solid #efeff1;
  box-sizing: border-box;
}
.md-list {
  padding: 0 !important;
}
.md-list-item-text {
  overflow-wrap: normal !important;
}
</style>
