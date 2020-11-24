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
      <tr>
        <th class="header__button-up" :class="{'header__button-up_show': isScroll}" :colspan="listData.length">
          <table-button-up :isShow="isShowButtonUp" @go-up="$emit('go-up')"></table-button-up>
        </th>
      </tr>
    
  </thead>
</template>

<script>
import { TABLE_UNO } from './TableUno.js';
import TableButtonUp from './TableButtonUp';

export default {
  name: 'TableHaed',
  mixins: [
    TABLE_UNO,
  ],
  components: {
    TableButtonUp,
  },
  props: {
    isScroll: {type: Boolean, default: false},
    listData: Array,
    listStylePosition: Array,
  },
  computed: {
    isShowButtonUp() { return this.isScroll},
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

  &__button-up {
    overflow: hidden; 
    background-color: #FAFAFA;
    &_show {
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>