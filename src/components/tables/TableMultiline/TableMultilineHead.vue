<template>
  <div class="header-grid" :style="listStylePosition" >
    <div class="header-grid__item" 
        v-for="(item, index) in listData" 
        :key="index"
        :style="styleItems[index]">
      <slot :name="`${item.key}`" v-bind:itemValue="item.label">{{ item.label }}</slot>
    </div>
  </div>
</template>

<script>
import { TABLE_MULTILINE } from './TableMultiline.js';
export default {
  name: 'TableMultilineHead',
  mixins: [
    TABLE_MULTILINE,
  ],
  props: {
    listData: Array,
    listStylePosition: String,
  },
}
</script>

<style lang="scss" scoped>
.header-grid {
  position: sticky;
  top: 0px;
  padding: 10px 0px;
  background-color: #FAFAFA;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  z-index: 200;
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
}
</style>