<template>
<div class="table-head" @mouseover="eventHeadMouseOver"
                        @mouseout="eventHeadMouseOut">

  <!-- Tooltip -->
  <data-table-tooltip :is-show="isTooltipShow"
                      :t-left="isTooltipProperties.left" 
                      :t-top="isTooltipProperties.top" 
                      :t-min-width="isTooltipProperties.width"
                      @click="isTooltipShow = false" @mousemove="isTooltipShow = false">
    {{ isTooltipProperties.text }}
  </data-table-tooltip>

  <!-- Head row -->
  <div class="table-head__row" 
       :class="`table-head__row_${heightType}`"
       :style="fieldsTemplate">
    
    <!-- Head column -->
    <div class="table-head__col"
         :class="`table-head__col_${heightType}`"
         v-for="(item, index) in listData" 
         :key="index"
         :style="item.position"
         :data-overflow-text="item.label">
      <data-table-overflow :content="item.label"></data-table-overflow>
      <span class="content" :class="`content_${heightType}`">
        <slot :name="`${item.value}`" v-bind:itemValue="item.value">
          {{ item.label }}
        </slot>
      </span>
    </div>
  </div>
</div>
  
</template>

<script>
import DataTableOverflow from '../DataTableOverflow.vue';
import DataTableTooltip from '../DataTableTooltip.vue';

import { Events } from './mixins/Events.js';

export default {
  name: 'DataTableHead',
  components: {
    DataTableOverflow,
    DataTableTooltip,
  },
  mixins: [
    Events,
  ],
  props: {
    listData: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
  },
  methods: {
    destroyOverflow(event) {
      document.querySelector('.table-head__col #box-overflow').remove();
    },
    computedDataValueAttribute(value, itemColumn) {
      switch(itemColumn.type) {
        case 'string':
        case 'integer': return value;
        case 'choice': return value.display_name;
        case 'nested object': return value[itemColumn.objectValue];
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import './DataTableHead.scss';

.table-head {
  &__row {
    display: grid;
    border-bottom: $headRowBorder;

    &_fixed { grid-auto-rows: $headRowHeight; }
    &_dense { grid-auto-rows: $headDenseRowHeight; }
    &_auto { grid-auto-rows: $headAutoRowHeight; }

    .table-head__col {
      position: relative;
      display: inline-flex;
      justify-content: $headHorizontalAlign;
      align-items: $headVerticalAlign;

      font-size: $headFontSize;
      font-weight: $headFontWeight;
      line-height: $headFontLineHeight;
      color: $headFontColor;
      
      background-color: $headRowBackgroundColor;

      &_fixed { padding: $headPaddingTB $headPaddingLR; }
      &_dense { padding: $headDensePaddingTB $headDensePaddingLR; }
      &_auto { padding: $headAutoPaddingTB $headAutoPaddingLR; }

      .content {
        &_fixed {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &_dense {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &_auto {
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>