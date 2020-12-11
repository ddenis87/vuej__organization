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
           :tabindex="(!itemColumn['read_only']) ? +indexCol: (-1 * (+indexCol + 1))" 
           :data-value="itemRow[itemColumn.value]"
           @dblclick="(event) => checkDisplayEdit(event, itemColumn)">

        <!-- slot editing -->
        <div class="box-editing display-none">
          <slot :name="`body-editing.${itemColumn.value}`" v-bind:itemValue="itemRow[itemColumn.value]">
            <div class="box-editing-default" :data-value="itemRow[itemColumn.value]">
              <!-- includes default component -->
            </div>
          </slot>
        </div>
        

        <!-- slot display -->
        <div class="box-display" :data-value="itemRow[itemColumn.value]">
          <slot :name="`body-display.${itemColumn.value}`" v-bind:itemValue="itemRow[itemColumn.value]">
            <table-uno-overflow :content="itemRow[itemColumn.value]"
                                @show-tooltip="(event) => $emit('show-tooltip', event)">
              <!-- <span class="content" 
                    :class="`content_${heightType}`" 
                    :style="`text-align: ${itemColumn.align}`" 
                    disabled 
                    @dblclick="(event) => editCell(event, itemColumn, itemRow[itemColumn.value])" 
                    @mousedown="() => {return false}">
                {{ itemRow[itemColumn.value] }}
              </span> -->
              <span class="content" 
                    :class="`content_${heightType}`" 
                    :style="`text-align: ${itemColumn.align}`" 
                    disabled 
                    
                    @mousedown="() => {return false}">
                {{ itemRow[itemColumn.value] }}
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
// import TableCellEdit from './TableCellEdit.vue';
import TableUnoOverflow from './TableUnoOverflow.vue';

import { TableCellEditDefault } from './mixins/TableUnoBody/TableCellEditDefault.js';

export default {
  name: 'TableUnoBody',
  components: {
    // TableCellEdit,
    TableUnoOverflow,
  },  
  mixins: [
    TableCellEditDefault,
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
    checkDisplayEdit(event, itemColumn) {
      if (!this.editable) return;
      let parentElement = event.target.closest('.table-body__col');
      if (itemColumn['read_only']) {
        parentElement.classList.add('table-body__col_disabled');
        parentElement.blur();
        setTimeout(() => parentElement.classList.remove('table-body__col_disabled'), 1000);
        return;
      }
      parentElement.querySelector('.box-display').classList.add('display-none');
      parentElement.querySelector('.box-editing').classList.remove('display-none');
      if (parentElement.querySelector('.box-editing-default')) {
        this.displayEditComponent(itemColumn, parentElement.querySelector('.box-editing-default'));
      }
    },
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
      // justify-content: $bodyHorizontalAlign;
      // align-items: $bodyVerticalAlign;

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

      .box-editing {
        // width: inherit;
        width: 100%;
        height: 100%;
        border: thin solid red;
      }
      .box-display {
        display: inline-flex;
        align-items: $bodyVerticalAlign;
        width: 100%;
        height: 100%;
        border: thin solid blue;
      }
      .display-none {
        display: none;
      }

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