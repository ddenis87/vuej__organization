<template>
  <div class="layout-table">
    <div class="layout-table__title">
      <h4></h4>
    </div>
    <div class="layout-table__body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutTablesold',
  data() {
    return {
      
    }
  },
}
</script>

<style lang="scss" scoped>
.layout-table {
  display: grid;
  grid-template-areas: "title" "body";
  grid-template-rows: 40px 1fr;
  grid-template-columns: 100%;
  // border: thin solid purple;
  width: 100%;
  &__title {
    grid-area: title;
    // border: thin solid red;
    height: 100%;
    padding: 0px 5px;
    overflow: hidden;
  }
  &__control {
    grid-area: control;
    // border: thin solid blue;
    // height: 100%;
    padding: 0px 10px;
    overflow: hidden;

    &__btn {
      margin: 0px -5px;
    }
  }
  &__body {
    grid-area: body;
    // border: thin solid orangered;
    // height: 100%;
    padding: 0px 10px;
    height: calc(100vh - 160px);
  }
}
</style>