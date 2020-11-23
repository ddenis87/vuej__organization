<template>
  <thead class="header">
    <tr class="header__row">
      <th class="header__col" 
          v-for="(item, index) in listData" 
          :key="index"
          :style="listStylePosition[index]">
        <slot :name="`${item.key}`" v-bind:itemValue="item.label">{{ item.label }}</slot>
      </th>
    </tr>
  </thead>
</template>

<script>
import TableUnoBodyBtnUp from './TableUnoBodyBtnUp';
import { TABLE_UNO } from './TableUno.js';

export default {
  name: 'TableHaed',
  mixins: [
    TABLE_UNO,
  ],
  components: {
    TableUnoBodyBtnUp,
  },
  props: {
    listData: Array,
    listStylePosition: Array,
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0px;
  &__col {
    position: sticky;
    top: 0px;
    background-color: #FAFAFA;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.12);
    text-align: start;
    align-items: center;
    padding: 20px 10px;
    font-family: "Roboto", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    &:hover { cursor: pointer; }
  }
}
</style>