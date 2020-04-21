<template>
  <div class="md-layout-item full">
    <div class="header-box">
      <span class="header-category">Categories</span>
    </div>
    <div class="full">
      <md-list class="md-layout full">
        <md-list-item v-for="(item, index) in list" :key="index"
        v-on:click="onSelected(item)" 
        class="content">
          <span class="md-list-item-text">{{item}}</span>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
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
  },
  computed: {
    ...mapGetters('categories', ['getCategories']),
    list () {
      return this.getCategories
    }
  },
  beforeMount () {
    this.$socket.emit('getCategoeries')
  }
};
</script>

<style>
.selected {
  color: cadetblue;
  background-color: aquamarine;
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
