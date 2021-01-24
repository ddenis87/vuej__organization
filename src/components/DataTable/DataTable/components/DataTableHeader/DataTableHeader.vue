<template>
  <div class="header">
    <div class="header-row" 
         :class="`header-row_${typeHeight}`"
         :style="template">
      
      <div class="header-column header-column__action-max"
           :class="`header-column_${typeColumn}`"
           v-if="computedActionMax">
        <span>1</span>
      </div>

      <div v-for="(item, index) in items"
           class="header-column"
           :class="`header-column_${typeColumn}`"
           :key="`header-${index}`"
           :style="item.position_in_template"
           :data-overflow-text="item.label">
        <data-table-content-display :value="item.label"
                                    :properties="{type: 'string'}"
                                    :type-height="typeHeight"></data-table-content-display>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from '../DataTable.js';
import DataTableContentDisplay from '../DataTableContentDisplay.vue';

export default {
  name: 'DataTableHeader',
  components: {
    DataTableContentDisplay,
  },
  mixins: [
    DataTable,
  ],
  props: {
    template: Object,
    typeHeight: { type: String, default: 'fixed' },
    typeColumn: { type: String, default: 'fixed' },
    items: { type: Array, default: () => [] },
    isExpansion: {type: Boolean, default: false},
  },
}
</script>

<style lang="scss" scoped>
@import './DataTableHeader.scss';

.header {
  &-row {
    display: grid;
    // border-top: 2px solid white;
    border-bottom: $rowBorder;
    background-color: white;
    
    font-size: $fontSize;
    font-weight: $fontWeight;
    color: $fontColor;

    &_fixed { grid-template-rows: repeat(auto-fit, $rowHeightFixed); }
    &_dense { grid-template-rows: repeat(auto-fit, $rowHeightDense); }
    &_auto  { grid-template-rows: repeat(auto-fit, $rowHeightAuto);  }
    .header-column {
      
      &__action-max {
        grid-area: action_max;
        visibility: hidden;
      }
      &_fixed {
        padding-left: $columnPaddingLRFixed; 
        padding-right: $columnPaddingLRFixed;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &_dense {
        padding-left: $columnPaddingLRDense; 
        padding-right: $columnPaddingLRDense;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &_auto {
        padding-left: $columnPaddingLRAuto; 
        padding-right: $columnPaddingLRAuto;

        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>