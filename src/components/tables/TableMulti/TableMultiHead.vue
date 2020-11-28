<template>
  <div class="table-head">
    <div class="table-head__item" 
        v-for="(item, index) in listData" 
        :key="index"
        :style="item.style">
      <slot :name="`${item.key}`" v-bind:itemValue="item.label">{{ item.label }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMultiHead',
  props: {
    listData: Array,
  }
}
</script>

<style lang="scss" scoped>
.table-head {
  display: grid;
  grid-auto-rows: 30px;
  border-bottom: thin solid rgba(0,0,0,.12);
  // border: thin solid red;
  // width: 100%;
  font-size: .75rem;
  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 16px;
    // border: thin solid teal;
    text-indent: initial;
    color: rgba(0,0,0,.6);
    font-size: .75rem;
    font-weight: bold;
    box-sizing: border-box;;
  }
}
</style>