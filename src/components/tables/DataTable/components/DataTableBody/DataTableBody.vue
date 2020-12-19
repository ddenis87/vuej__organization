<template>
  <div class="table-body">
    <div v-for="(itemRow, indexRow) in listData"
         :key="`bodyRow-${indexRow}`"
         class="table-body__row"
         :class="`table-body__row_${heightType}`"
         :style="fieldsTemplate">
      <div v-for="(itemColumn, indexCol) in listDataHeader" 
           :key="`bodyCol-${indexCol}`" 
           class="table-body__col"
           :class="`table-body__col_${heightType}`" 
           :style="itemColumn.position"
           :tabindex="indexCol"

           @dblclick.stop="(event) => checkDisplayEdit(event, itemColumn)"
           @keydown.stop="(event) => checkDisplayEditForKeydown(event, itemColumn)"
           @editing-completed="editingCompleted">

        <!-- slot editing -->
        <div class="box-editing display-none">
          <slot :name="`body-editing.${itemColumn.value}`" v-bind:itemValue="itemRow[itemColumn.value]">
            <div class="box-editing-default"
                 :data-value="itemRow[itemColumn.value]">
              <!-- includes default component -->
            </div>
          </slot>
        </div>
        

        <!-- slot display -->
        <div class="box-display">
          <slot :name="`body-display.${itemColumn.value}`" v-bind:itemValue="itemRow[itemColumn.value]">
            <div class="box-display-default" :data-value="itemRow[itemColumn.value]">
              <cell-display :data-value="itemRow[itemColumn.value].toString()"
                            :data-props="itemColumn" 
                            :height-type="heightType"
                            @show-tooltip="(event) => $emit('show-tooltip', event)"></cell-display>
            </div>
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
import CellDisplay from './components/CellDisplay.vue'

import { Editing } from './mixins/Editing.js';

export default {
  name: 'DataTableBody',
  components: {
    CellDisplay,
  },  
  mixins: [
    Editing,
  ],
  props: {
    listData: Array,
    listDataHeader: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
    parentId: String,
    editable: Boolean,
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
@import './DataTableBody.scss';

.table-body {
  &__row {
    display: grid;
    border-bottom: $bodyRowBorder;

    &_fixed { grid-auto-rows: $bodyRowHeight;       }
    &_dense { grid-auto-rows: $bodyDenseRowHeight;  }
    &_auto  { grid-auto-rows: $bodyAutoRowHeight;   }

    &:hover > .table-body__col { background-color: $bodyRowBackgroundColorHover;}
    &:hover > .table-body__col_focus { background-color: white; }
    &:hover > .table-body__col-action > .action-box { opacity: 1; }
    
    .table-body__col {
      position: relative;
      display: inline-flex;

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

      &:focus { border: $bodyCellBorderFocus; }

      &_focus     { border: $bodyCellBorderFocus;             }
      &_disabled  { border: thin solid rgba(255, 0, 0, .8)  }

      &_fixed { padding: $bodyPaddingTB $bodyPaddingLR;           }
      &_dense { padding: $bodyDensePaddingTB $bodyDensePaddingLR; }
      &_auto  { padding: $bodyAutoPaddingTB $bodyAutoPaddingLR;   }

      .box-editing {
        width: 100%;
        height: 100%;
      }
      .box-display {
        display: inline-flex;
        align-items: $bodyVerticalAlign;
        width: 100%;
        height: 100%;

        .box-display-default {
          width: inherit;
          height: inherit;
        }
      }
      .display-none { display: none; }
      
      &-action {
        position: sticky;
        right: 0px;
        grid-area: action_box;
      }
    }
  }
}
</style>