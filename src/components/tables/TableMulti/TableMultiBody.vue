<template>
  <div class="table-body">
    <div class="table-body__row" :style="listStyle" v-for="(itemRow, indexRow) in listData" :key="`bodyRow-${indexRow}`">
      <div class="table-body__col" v-for="(itemCol, indexCol) in listDataHeader" :key="`bodyCol-${indexCol}`" :style="itemCol.style">
        <slot :name="`${itemCol.key}`" v-bind:itemValue="itemRow[itemCol.key]">{{ itemRow[itemCol.key] }}</slot>
        
      </div>
      <div class="table-body__col-action">
        <slot name="action" v-bind:activeValue="itemRow['title']"></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TableMultiBody',
  props: {
    listData: Array,
    listDataHeader: Array,
    listStyle: Object,
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.table-body {
  // border: thin solid blue;
  &__row {
    display: grid;
    grid-auto-rows: 30px;
    border-bottom: thin solid rgba(0,0,0,.12);
    // font-family: 'Time New Roman', sans-serif;
    // border: thin solid red;
    width: 100%;
    font-size: .875rem;
    &:hover { background-color: rgb(240, 240, 240); }
    &:hover > .table-body__col-action > .action-box { opacity: 1; }

    .table-body__col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 16px;
      color: rgba(0,0,0,.87);
      line-height: 1.5;
      font-size: .875rem;
      text-rendering: optimizeLegibility;
      transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
      -webkit-font-smoothing: antialiased;
      overflow: hidden;
      &-action {
        // border: thin solid red;
        grid-area: action_box;
      }
      // border: thin solid black;
    }
    

  }
  // &__col {
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
  //   padding: 0 16px;
  //   color: rgba(0,0,0,.87);
  //   line-height: 1.5;
  //   font-size: .875rem;
  //   text-rendering: optimizeLegibility;
  //   transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  //   -webkit-font-smoothing: antialiased;
  //   overflow: hidden;
  //   &-action {
  //     // border: thin solid red;
  //     grid-area: action_box;
  //   }
  //   // border: thin solid black;
  // }
}
</style>