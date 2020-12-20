<template>
  <div class="table-body">
    <div v-for="(itemRow, indexRow) in listData"
         :key="`bodyRow-${indexRow}`"
         class="table-body__row"
         :class="styleRow"
         :style="fieldsTemplate"
         :tabindex="indexRow">
      <div v-for="(itemColumn, indexCol) in listDataHeader"
          :key="`bodyCol-${indexCol}`" 
          class="table-body__col"
          :class="styleCell" 
          :style="itemColumn.position"
          v-bind:tabindex="(editable) ? indexCol : ''"
          @dblclick.stop="(event) => checkDisplayEdit(event, itemColumn)"
          @keydown.stop="(event) => checkDisplayEditForKeydown(event, itemColumn)"
          @editing-completed="editingCompleted" 
          @mouseover.stop.prevent="(event) => $emit('show-tooltip', event)"
          @mouseout.stop.prevent="$emit('hide-tooltip')">

        
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
            <div class="box-display-default" :data-value="itemRow[itemColumn.value]" @mouseover.stop.prevent="">
              <cell-display :data-value="itemRow[itemColumn.value].toString()"
                            :data-props="itemColumn" 
                            :height-type="heightType"></cell-display>
              <cell-overflow :content="itemRow[itemColumn.value]" @destroy-self="(event) => destroyOverflow(event)"></cell-overflow>
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
import CellDisplay from './components/CellDisplay.vue';
import CellOverflow from './components/CellOverflow.vue';

import { Editing } from './mixins/Editing.js'; // checkDisplayEdit, checkDisplayEditForKeydown
import { Styles } from './mixins/Styles.js'; // styleRow, styleCell

export default {
  name: 'DataTableBody',
  components: {
    CellDisplay,
    CellOverflow,
  },
  mixins: [
    Editing,
    Styles,
  ],
  props: {
    listData: Array,
    listDataHeader: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
    parentId: String,
    editable: Boolean,
  },
  data() {
    return {
    }
  },
  methods: {
    destroyOverflow(event) {
      document.querySelector('.box-display-default #box-overflow').remove();
    }
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

    &_editable_false { border-top: thin solid white; }

    &:focus { outline: none; border-top: $bodyRowBorderFocus; border-bottom: $bodyRowBorderFocus; }

    &:hover > .table-body__col { background-color: $bodyRowBackgroundColorHover;}
    &:hover > .table-body__col_focus { background-color: white; }
    // &:hover > .table-body__col-action > .action-box { opacity: 1; }
    
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
      &_focus { border: $bodyCellBorderFocus; }

      &_fixed { padding: $bodyPaddingTB $bodyPaddingLR;           }
      &_dense { padding: $bodyDensePaddingTB $bodyDensePaddingLR; }
      &_auto  { padding: $bodyAutoPaddingTB $bodyAutoPaddingLR;   }

      .box-editing, .box-display {
        width: 100%;
        height: 100%;
      }
      .box-display {
        display: inline-flex;
        align-items: $bodyVerticalAlign;

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