<template>
<!-- Body -->
  <div class="table-body" @mouseover="eventBodyMouseOver"
                          @mouseout="eventBodyMouseOut">

    <!-- Tooltip -->
    <data-table-tooltip :is-show="isTooltipShow"
                        :data-properties="isTooltipProperties"
                        @click="isTooltipShow = false" 
                        @mousemove="isTooltipShow = false">
      {{ isTooltipProperties.text }}
    </data-table-tooltip>

    <!-- Overflow -->
    <data-table-overflow d-id="body"
                         :data-properties="isTooltipProperties"
                         @is-show="isTooltipShow = true" 
                         @is-hide="isTooltipShow = false"></data-table-overflow>

    <!-- Body row -->
    <div v-for="(itemRow, indexRow) in listData"
         :key="`bodyRow-${indexRow}`"
         class="table-body__row"
         :class="styleRow"
         :style="fieldsTemplate"
         :tabindex="indexRow"
         @mouseenter="eventRowMouseEnter"
         @mouseleave="eventRowMouseLeave"
         @focus="eventRowFocus"
         @blur="eventRowBlur"
         @click="(event) => eventRowClick(event, itemRow)"
         @dblclick="(event) => eventRowDblclick(event, itemRow)"
         @keydown="eventRowKeydown">

      <!-- Body column -->
      <div v-for="(itemColumn, indexCol) in listDataHeader"
          :key="`bodyCol-${indexCol}`" 
          class="table-body__col"
          :class="styleCell" 
          :style="itemColumn.position"
          v-bind:tabindex="(editable) ? indexCol : ''"
          :data-overflow-text="computedDataValueAttribute(itemRow[itemColumn.value], itemColumn)"
          @focus="eventElementFocus"
          @blur="eventElementBlur"
          @dblclick="(event) => eventElementDblclick(event, itemRow, itemColumn, itemRow[itemColumn.value])"
          @keydown.stop="eventElementKeydown"
          @editing-canceled="editingCanceled"
          @editing-accepted="editingAccepted">

        <!-- slot editing -->
        <div class="box-editing display-none" :data-value="computedDataValueAttribute(itemRow[itemColumn.value], itemColumn)">
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
import DataTableOverflow from '../DataTableOverflow.vue';
import DataTableTooltip from '../DataTableTooltip.vue';

import { Events } from './mixins/Events.js'; // 
import { Editing } from './mixins/Editing.js'; // 
import { Styles } from './mixins/Styles.js'; // styleRow, styleCell

export default {
  name: 'DataTableBody',
  components: {
    CellDisplay,
    DataTableOverflow,
    DataTableTooltip,
  },
  mixins: [
    Events,
    Editing,
    Styles,
  ],
  props: {
    tableName: String,
    listData: Array,
    listDataHeader: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
    paddingType: {type: String, default: 'fixed'},
    parentId: String,
    editable: Boolean,
  },
  methods: {
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
@import './DataTableBody.scss';

.table-body {
  &__row {
    display: grid;
    border-bottom: $bodyRowBorder;
    transition-delay: .05s;
    outline: none;

    &_fixed { grid-auto-rows: $bodyRowHeight;       }
    &_dense { grid-auto-rows: $bodyDenseRowHeight;  }
    &_auto  { grid-auto-rows: $bodyAutoRowHeight;   }

    &_hover {  background-color: $bodyRowBackgroundColorHover; }
    &_focus { background-color: $bodyRowBackgroundColorHover; }

    // &:hover > .table-body__col-action > .action-box { opacity: 1; }
    
    .table-body__col {
      position: relative;
      display: inline-flex;

      font-size: $bodyFontSize;
      font-weight: $bodyFontWeight;
      line-height: $bodyFontLineHeight;
      color: $bodyFontColor;

      border: thin solid rgba(0, 0, 255, 0);
      overflow: hidden;
      box-sizing: border-box;
      outline: none;

      &_focus { border: $bodyCellBorderFocus; }
      &_editing { background-color: white; }

      // &_fixed { padding: $bodyPaddingTB $bodyPaddingLR;           }
      // &_dense { padding: $bodyDensePaddingTB $bodyDensePaddingLR; }
      // &_auto  { padding: $bodyAutoPaddingTB $bodyAutoPaddingLR;   }
      &_fixed { padding-left: $bodyPaddingLR;      padding-right: $bodyPaddingLR;      }
      &_dense { padding-left: $bodyDensePaddingLR; padding-right: $bodyDensePaddingLR; }
      // &_auto  { padding: $bodyAutoPaddingTB $bodyAutoPaddingLR;   }
      
      .box-editing, .box-display {
        width: 100%;
        height: 100%;
      }
      .box-display {
        position: relative;
        display: inline-flex;
        align-items: $bodyVerticalAlign;
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