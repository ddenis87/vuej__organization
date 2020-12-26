<template>
  <div class="table-body">
    <div v-for="(itemRow, indexRow) in listData"
         :key="`bodyRow-${indexRow}`"
         class="table-body__row"
         :class="styleRow"
         :style="fieldsTemplate"
         :tabindex="indexRow"
         @mouseenter="eventMouseEnterRow"
         @mouseleave="eventMouseLeaveRow"
         @click="(event) => $emit('item-selected', event, itemRow)">
      <div v-for="(itemColumn, indexCol) in listDataHeader"
          :key="`bodyCol-${indexCol}`" 
          class="table-body__col"
          :class="styleCell" 
          :style="itemColumn.position"
          v-bind:tabindex="(editable) ? indexCol : ''"
          
          
          

          @focus="(event) => eventFocusToElement(event)"
          @blur="(event) => eventBlurToElemet(event)"
          @dblclick="(event) => eventDblclickToElement(event, itemRow, itemColumn, itemRow[itemColumn.value])"
          @editing-canceled="editingCanceled"
          @editing-accepted="editingAccepted">

        <!-- slot editing -->
        <div class="box-editing display-none" :data-value="computedDataValueAttribute(itemRow[itemColumn.value])">
          <slot :name="`body-editing.${itemColumn.value}`" v-bind:itemValue="itemRow[itemColumn.value]">
            <div class="box-editing-default">
              <!-- includes default component -->
            </div>
          </slot>
        </div>
        <!-- slot display -->
        <div class="box-display" :data-value="itemRow[itemColumn.value]">
          <slot :name="`body-display.${itemColumn.value}`" v-bind:itemValue="itemRow[itemColumn.value]">
            <cell-display :data-value="itemRow[itemColumn.value]"
                          :data-props="itemColumn" 
                          :height-type="heightType"></cell-display>
            <cell-overflow :content="itemRow[itemColumn.value]" @destroy-self="(event) => destroyOverflow(event)"></cell-overflow>
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

import { Events } from './mixins/Events.js'; // 
// import { Editing } from './mixins/Editing.js'; // checkDisplayEdit, checkDisplayEditForKeydown
import { Styles } from './mixins/Styles.js'; // styleRow, styleCell

export default {
  name: 'DataTableBody',
  components: {
    CellDisplay,
    CellOverflow,
  },
  mixins: [
    Events,
    // Editing,
    Styles,
  ],
  props: {
    tableName: String,
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
  mounted() {
    // console.log(this.listData);
  },
  methods: {
    destroyOverflow(event) {
      document.querySelector('.box-display #box-overflow').remove();
    },
    computedDataValueAttribute(value) {
      // console.log(value);
      if (typeof(value) == 'object') {
        if ('id' in value) { return value.id; }
        return value.value;
      }
      return value;
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
    transition-delay: .05s;

    &_fixed { grid-auto-rows: $bodyRowHeight;       }
    &_dense { grid-auto-rows: $bodyDenseRowHeight;  }
    &_auto  { grid-auto-rows: $bodyAutoRowHeight;   }

    // &_selected-hover {
    //   &:hover { background-color: $bodyRowBackgroundColorHover; }
    // }
    &_hover {  background-color: $bodyRowBackgroundColorHover; }
    &_focus { background-color: $bodyRowBackgroundColorHover; }

    // &_editable_false { border-top: thin solid white; }

    // &:focus { outline: none; border-top: $bodyRowBorderFocus; border-bottom: $bodyRowBorderFocus; }

    // &:hover > .table-body__col { background-color: $bodyRowBackgroundColorHover;}
    // &_hover > .table-body__col { background-color: $bodyRowBackgroundColorHover;}
    // &:hover > .table-body__col_focus { background-color: white; }
    // &:hover > .table-body__col-action > .action-box { opacity: 1; }
    
    .table-body__col {
      position: relative;
      display: inline-flex;

      font-size: $bodyFontSize;
      font-weight: $bodyFontWeight;
      line-height: $bodyFontLineHeight;
      color: $bodyFontColor;

      border: thin solid rgba(0, 0, 255, 0);
      // transition-delay: .1s;
      overflow: hidden;
      box-sizing: border-box;
      outline: none;

      // &:focus { border: $bodyCellBorderFocus; }
      &_focus { border: $bodyCellBorderFocus; }
      &_editing { background-color: white; }

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
      
        // .box-display-default {
        //   width: inherit;
        //   height: inherit;
        // }
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