<template>
<div class="layout-table">
  <div class="layout-table__view">
    <router-view></router-view>
  </div>
  
</div>
  
</template>

<script>
export default {
  name: 'LayoutTable',
}
</script>

<style lang="scss" scoped>
.layout-table {
  display: grid;
  grid-template-areas: "view";
  grid-template-rows: 1fr;
  grid-template-columns: 100%;
  padding: 0px 2px;
  &__view {
    grid-area: view;
    height: calc(100vh - 70px);
  }
}
</style>