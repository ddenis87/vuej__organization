<template>
<div class="table-head" @mouseover="eventHeadMouseOver"
                        @mouseout="eventHeadMouseOut">

  <!-- Tooltip -->
  <data-tooltip :is-show="isTooltipShow"
                :t-left="isTooltipProperties.left" 
                :t-top="isTooltipProperties.top" 
                :t-min-width="isTooltipProperties.width"
                @click="isTooltipShow = false" @mousemove="isTooltipShow = false">
    {{ isTooltipProperties.text }}
  </data-tooltip>

  <!-- Head row -->
  <div class="table-head__row" 
       :class="`table-head__row_${heightType}`"
       :style="fieldsTemplate">
    
    <!-- Head column -->
    <div class="table-head__col"
         :class="`table-head__col_${heightType}`"
         v-for="(item, index) in listData" 
         :key="index"
         :style="item.position">

      <span class="content" :class="`content_${heightType}`">
        <slot :name="`${item.value}`" v-bind:itemValue="item.value">
          {{ item.label }}
          <cell-overflow :content="item.label" @destroy-self="(event) => destroyOverflow(event)"></cell-overflow>
        </slot>
      </span>
      
    </div>
  </div>
</div>
  
</template>

<script>
import CellOverflow from '../CellOverflow.vue';
import DataTooltip from '../DataTooltip.vue';

import { Events } from './mixins/Events.js';

export default {
  name: 'DataTableHead',
  components: {
    CellOverflow,
    DataTooltip,
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