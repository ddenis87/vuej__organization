<template>
  <div class="table-head">
    
    <div class="table-head__item" 
        v-for="(item, index) in listData" 
        :key="index"
        :style="item.style">
      <div class="table-head__item-action">
        <v-btn class="item-action__btn" icon x-small><v-icon small>mdi-sort-ascending</v-icon></v-btn>
        <v-btn class="item-action__btn" icon x-small><v-icon small>mdi-sort-descending</v-icon></v-btn>
        <v-btn class="item-action__btn" icon x-small><v-icon small>mdi-filter-plus</v-icon></v-btn>
        <v-btn class="item-action__btn" icon x-small><v-icon small>mdi-filter-remove</v-icon></v-btn>
      </div>
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
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px 16px;
    // border: thin solid teal;
    text-indent: initial;
    color: rgba(0,0,0,.6);
    font-size: .75rem;
    font-weight: bold;
    text-overflow: ellipsis;
    box-sizing: border-box;
    overflow: hidden;
    // background-color: #FFFFFF;
    &:hover > &-action { opacity: 1; }
    &-action {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 94px;
      padding-left: 5px;
      background-color: #FFFFFF;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity .3s;
      background: linear-gradient(-90deg, #FFFFFF 95%, rgba(0, 0, 0, 0) 100%);
      .item-action__btn { margin: 0px 1px; }
    }
  }
}
</style>