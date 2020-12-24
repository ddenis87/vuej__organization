<template>
  <div class="layout-register">
    <div class="title">
      <h4></h4>
    </div>
    <div class="control">
      <v-toolbar dense >
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="control__btn" icon><v-icon>mdi-filter-outline</v-icon></v-btn>
      </v-toolbar>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutTables',
  data() {
    return {
      heightType: 'fixed',
    }
  },
}
</script>

<style lang="scss" scoped>
.layout-register {
  display: grid;
  grid-template-areas: "title" "control" "body";
  grid-template-rows: 40px 50px 1fr;
  grid-template-columns: 100%;
  // border: thin solid purple;
  width: 100%;
  .title {
    grid-area: title;
    // border: thin solid red;
    height: 100%;
    padding: 0px 5px;
    overflow: hidden;
  }
  .control {
    grid-area: control;
    // border: thin solid blue;
    height: 100%;
    padding: 0px 10px;
    overflow: hidden;

    &__btn {
      margin: 0px -5px;
    }
  }
  .body {
    grid-area: body;
    // border: thin solid orangered;
    // height: 100%;
    padding: 0px 10px;
    height: calc(100vh - 160px);
  }
}
</style>