<template>
  <div class="body"
       @mouseover="eventMouseOver"
       @mouseout="eventMouseOut">

    <!-- TOOLTIP -->
    <data-table-tooltip :is-show="isTooltipShow"
                        :data-properties="isTooltipProperties"
                        @click="isTooltipShow = false" 
                        @mousemove="isTooltipShow = false">
      {{ isTooltipProperties.text }}
    </data-table-tooltip>

    <!-- OVERFLOW TEXT -->
    <data-table-overflow d-id="body"
                         :data-properties="isTooltipProperties"
                         @is-show="isTooltipShow = true" 
                         @is-hide="isTooltipShow = false"></data-table-overflow>
    
    <div v-for="(itemRow, indexRow) in items"
         class="body-row"
         :class="`body-row_${typeHeight}`"
         :key="`body-row-${indexRow}`"
         :style="template"
         :tabindex="indexRow"
         @focus="eventRowFocus"
         @blur="eventRowBlur"
         @keydown="eventRowKeydown">

      <div v-for="(itemColumn, indexColumn) in itemsHeader"
           class="body-column"
           :class="`body-column_${typeColumn}`"
           :key="`body-column-${indexColumn}`"
           :style="itemColumn.position_in_template"
           :tabindex="(isEditable) ? indexColumn : ''"
           :data-overflow-text="itemRow[itemColumn.value]"
           @focus="eventColumnFocus"
           @blur="eventColumnBlur"
           @dblclick="(event) => eventColumnDblclick(event, itemRow, itemColumn, itemRow[itemColumn.value])"
           @keydown.stop="(event) => eventColumnKeydown(event, itemRow, itemColumn, itemRow[itemColumn.value])"
           @editing-canceled="editingCanceled"
           @editing-accepted="editingAccepted">

        <div class="box-editing display-none">
          <div class="box-editing-default">
            <!-- includes default component editing -->
          </div>
        </div>

        <div class="box-display">
          <content-display :value="itemRow[itemColumn.value]"
                          :properties="itemColumn"
                          :type-height="typeHeight"></content-display>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import DataTableOverflow from '../DataTableOverflow.vue';
import DataTableTooltip from '../DataTableTooltip.vue'; 
import ContentDisplay from '../ContentDisplay.vue';

import { Events } from './mixins/Events.js';
import { Editing } from './mixins/Editing.js';

export default {
  name: 'DataTableBody',
  components: {
    DataTableOverflow,
    DataTableTooltip,
    ContentDisplay,
  },
  mixins: [
    Events,
    Editing,
  ],
  props: {
    tableName: { type: String, default: '' },
    template: Object,
    typeHeight: { type: String, default: 'fixed' },
    typeColumn: { type: String, default: 'fixed' },
    items: { type: Array, default: () => [] },
    itemsHeader: { type: Array, default: () => [] },
    isEditable: {type: Boolean, default: false},
  },
}
</script>

<style lang="scss" scoped>
@import './DataTableBody.scss';

.body {

  font-size: $fontSize;
  font-weight: $fontWeight;
  color: $fontColor;

  box-sizing: border-box;
  &-row {
    display: grid;
    border-bottom: $rowBorder;
    outline: none;
    transition-delay: .05s;

    &_fixed { grid-template-rows: repeat(auto-fit, $rowHeightFixed); }
    &_dense { grid-template-rows: repeat(auto-fit, $rowHeightDense); }
    &_auto  { grid-template-rows: repeat(auto-fit, $rowHeightAuto);  }

    &_hover { background-color: $rowBackgroundHover; }
    &_focus { background-color: $rowBackgroundFocus; }

    .body-column {
      border: thin solid rgba(0, 0, 255, 0);
      outline: none;

      &_fixed { padding-left: $columnPaddingLRFixed; padding-right: $columnPaddingLRFixed; }
      &_dense { padding-left: $columnPaddingLRDense; padding-right: $columnPaddingLRDense; }
      &_auto  { padding-left: $columnPaddingLRAuto;  padding-right: $columnPaddingLRAuto;  }

      &_focus { border: $columnBorderFocus; }
      &_editing { background-color: white; }

      .box-editing, .box-display {
        width: 100%;
        height: 100%;
      }
      .box-display {
        position: relative;
        display: flex;
        align-items: $columnVerticalAlign;
      }
      .display-none { display: none; }
    }
  }
}
</style>