<template>
  <div class="data-table-lazy">
    <div class="data-table-lazy__header">
      <data-table-lazy-header :items="headers" 
                              :template="computedTemplateTable"></data-table-lazy-header>
    </div>
    <div class="data-table-lazy__body">
      <data-table-lazy-body :headers="headers" 
                            :items="items"
                            :template="computedTemplateTable"
                            @focused-row="focusedRow">
        <template v-for="item in headers" v-slot:[item.key]="slotValue">
          <slot :name="item.key" :value="slotValue.value"></slot>
        </template>
      </data-table-lazy-body>
    </div>
    <div class="data-table-lazy__footer"></div>
  </div>
  
</template>

<script>
import DataTableLazyHeader from './components/DataTableLazyHeader/DataTableLazyHeader.vue';
import DataTableLazyBody from './components/DataTableLazyBody/DataTableLazyBody.vue';

import { ComputedTemplate } from './mixins/ComputedTemplate.js'; // computedTemplateTable
import { Events } from './mixins/Events.js';

export default {
  name: 'DataTableLazy',
  components: {
    DataTableLazyHeader,
    DataTableLazyBody,
  },
  mixins: [
    ComputedTemplate,
    Events,
  ],
  props: {
    headers: Array,
    items: Array,
  },
}
</script>

<style lang="scss" scoped>
@import './DataTableLazy.scss';

.data-table-lazy {
  position: relative;
  height: 100%;
  
  font-family: $dtFontFamily;
  // border-radius: $borderRadius;
  // box-shadow: $boxShadow;
  border: $border;
  overflow: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: $scrollWidth;
    height: $scrollHeight;
    border-radius: $scrollBorderRadius;
    &-thumb {
      border-radius: $scrollThumbBorderRadius;
      background-color: $scrollThumbBackgroundColor;
    }
  }

  &__header {
    position: sticky;
    top: 0px;
    display: flex;
    z-index: 300;
  }
  &__body {
    position: relative;
    display: flex;
    z-index: 100;
  }
}
</style>