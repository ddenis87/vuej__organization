<template>
  <div class="table-body">
    <div v-for="(itemRow, indexRow) in listData"
         :key="`bodyRow-${indexRow}`"
         class="table-body__row"
         :class="`table-body__row_${heightType}`"
         :style="fieldsTemplate">
      <div v-for="(itemCol, indexCol) in listDataHeader" 
           :key="`bodyCol-${indexCol}`" 
           class="table-body__col"
           :class="`table-body__col_${heightType}`" 
           :style="itemCol.position"
           :tabindex="(!itemCol['read_only']) ? +indexCol: (-1 * (+indexCol + 1))">

        <!-- slot editing -->
        <div class="box-editing display-none">
          <slot :name="`body-editing.${itemCol.value}`" v-bind:itemValue="itemRow[itemCol.value]">

          </slot>
        </div>
        

        <!-- slot display -->
        <div class="box-display">
          <slot :name="`body-display.${itemCol.value}`" v-bind:itemValue="itemRow[itemCol.value]">
            <table-uno-overflow :content="itemRow[itemCol.value]"
                                @show-tooltip="(event) => $emit('show-tooltip', event)">
              <span class="content" :class="`content_${heightType}`" :style="`text-align: ${itemCol.align}`" disabled @dblclick="(event) => editCell(event, itemCol, itemRow[itemCol.value])" @mousedown="() => {return false}">
                {{ itemRow[itemCol.value] }}
              </span>
            </table-uno-overflow>
          </slot>
        </div>
        

      </div>
      <div class="table-body__col-action">
        <slot name="action" v-bind:activeValue="itemRow['title']"></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
import TableUnoOverflow from './TableUnoOverflow.vue';
import { TableCellEditMix } from './mixins/TableUnoBody/TableCellEdit.js';

export default {
  name: 'TableUnoBody',
  components: {
    TableUnoOverflow,
  },  
  mixins: [
    TableCellEditMix,
  ],
  props: {
    listData: Array,
    listDataHeader: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
    parentId: String,
  },
}
</script>

<style lang="scss" scoped>
@import 'TableUno';

.table-body {
  &__row {
    display: grid;
    border-bottom: $bodyRowBorder;

    &_fixed { grid-auto-rows: $bodyRowHeight;       }
    &_dense { grid-auto-rows: $bodyDenseRowHeight;  }
    &_auto  { grid-auto-rows: $bodyAutoRowHeight;   }

    &:hover > .table-body__col { background-color: $bodyRowBackgroundColorHover;}
    &:hover > .table-body__col-action > .action-box { opacity: 1; }
    
    .table-body__col {
      position: relative;
      display: inline-flex;
      justify-content: $bodyHorizontalAlign;
      align-items: $bodyVerticalAlign;

      font-size: $bodyFontSize;
      font-weight: $bodyFontWeight;
      line-height: $bodyFontLineHeight;
      color: $bodyFontColor;

      border: thin solid rgba(0, 0, 255, 0);
      background-color: $bodyRowBackgroundColor;
      transition-delay: .1s;
      overflow: hidden;
      box-sizing: border-box;
      outline: none;

      &:focus { border: $bodyCellBorderFocus }

      &_disabled { border: thin solid rgba(255, 0, 0, .8) }

      &_fixed { padding: $bodyPaddingTB $bodyPaddingLR;           }
      &_dense { padding: $bodyDensePaddingTB $bodyDensePaddingLR; }
      &_auto  { padding: $bodyAutoPaddingTB $bodyAutoPaddingLR;   }

      .content {
        width: 100%;
        -webkit-user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        &_fixed {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        &_dense { white-space: nowrap; }
        // &_auto {  }
      }

      &-action {
        position: sticky;
        right: 0px;
        grid-area: action_box;
      }
    }
  }
}
</style>