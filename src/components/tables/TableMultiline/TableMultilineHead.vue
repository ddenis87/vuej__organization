<template>
  <div class="header-grid" :style="listStyleLocationModify" >
    <div class="header-grid__item" 
        v-for="(item, index) in listData" 
        :key="index"
        :style="styleItems[index]">
      <slot :name="`${item.key}`" v-bind:itemValue="item.label">{{ item.label }}</slot>
    </div>
    <div class="header-grid__button-up">
      <table-button-up :isShow="isShowButtonUp" @go-up="$emit('go-up')"></table-button-up>
    </div>
  </div>
</template>

<script>
import { TABLE_MULTILINE } from './TableMultiline.js';
import TableButtonUp from './TableButtonUp';

export default {
  name: 'TableMultilineHead',
  mixins: [
    TABLE_MULTILINE,
  ],
  components: {
    TableButtonUp,
  },
  props: {
    isScroll: {type: Boolean, default: false},
    listData: Array,
    listStyleLocation: String,
  },
  computed: {
    isShowButtonUp() { return this.isScroll},
    listStyleLocationModify() {
      let listStyleLocationModify = '';
      listStyleLocationModify = this.listStyleLocation.slice(0, -2);
      listStyleLocationModify += ' "';
      let countColumn = (this.listStyleLocation.split(';')[0]).split(':')[1].trim().split(' ').length;
      listStyleLocationModify += 'button_up '.repeat(countColumn);
      listStyleLocationModify = listStyleLocationModify.slice(0, -1) + '"';
      return this.listStyleLocation;
    }
  },
}
</script>

<style lang="scss" scoped>
.header-grid {
  padding: 10px 0px;
  background-color: rgba(252,252,252);
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 10px;
    font-family: "Roboto", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    &:hover { cursor: pointer; }
  }
  &__button-up {
    overflow: hidden; 
    background-color:rgba(252,252,252);
  }
}
</style>