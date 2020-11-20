<template>
  <div class="body">          
    <div class="body-grid__item"
         v-for="(itemI, indexI) in listItem" 
         :key="indexI"
         :style="listStyleLocation">
      <div class="body-grid__item-col" 
            v-for="(itemF, indexF) in listDataHeader" 
            :key="indexF"
            :style="styleItems[indexF]">{{ itemI[itemF.key] }}</div>
    </div>
  </div>
</template>

<script>
import { TABLE_SPACE_MULTI_ROW } from './TableSpaceMultiRow.js';
export default {
  name: 'TableSpaceMultiRowBody',
  mixins: [
    TABLE_SPACE_MULTI_ROW,
  ],
  props: {
    listDataProps: Object,
    listDataHeader: Array,
    listStyleLocation: String,
  },
  computed: {
    listItem() { return this.$store.getters[this.listDataProps.state.getterData]; },
  },
}
</script>

<style lang="scss" scoped>
.body {
  .body-grid__item {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    &:hover { background-color: rgba(0, 0, 0, 0.08); }
    &-col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 5px 10px;
      text-align: start;
      font-family: "Roboto", sans-serif;
      font-size: 0.875rem;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.87);
      
    }
  }
}
</style>