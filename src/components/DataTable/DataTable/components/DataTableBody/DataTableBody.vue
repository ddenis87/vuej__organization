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
    <data-table-overflow :d-id="`${id}-body`"
                         :data-properties="isTooltipProperties"
                         @is-show="isTooltipShow = true" 
                         @is-hide="isTooltipShow = false"></data-table-overflow>
    
    <!-- NO ELEMENT FOR DISPLAY -->
    <div class="body-empty"
         :class="`body-empty_${typeColumn}`"
         v-if="items.length == 0 && !isLoadingData">Отсутствуют элементы для отображения по заданным условиям</div>

    <div v-for="(itemRow, indexRow) in items"
         class="body-row"
         :class="`body-row_${typeHeight}`"
         :key="`body-row-${indexRow}`"
         :style="template"
         :tabindex="indexRow"
         @focus="(event) => eventRowFocus(event, itemRow)"
         @blur="eventRowBlur"
         @click="(event) => eventRowClick(event, itemRow)"
         @dblclick="(event) => eventRowDblclick(event, itemRow)"
         @keydown="(event) => eventRowKeydown(event, itemRow)">
      
      <div class="body-column__action-max"
           :class="`body-column_${typeColumn}`"
           v-if="computedActionMax && !isMultiline">
        <v-btn x-small icon class="action-btn" @click="eventExpansionRow">
          <v-icon small>mdi-chevron-down</v-icon>
        </v-btn>
      </div>

      <div v-for="(itemColumn, indexColumn) in itemsHeader"
           class="body-column"
           :class="`body-column_${typeColumn}`"
           :key="`body-column-${indexColumn}`"
           :style="itemColumn.position_in_template"
           :tabindex="(isEditable) ? indexColumn : ''"
           :data-overflow-text="gettingValueForType(itemColumn, itemRow[itemColumn.value])"
           @focus="eventColumnFocus"
           @blur="eventColumnBlur"
           @dblclick="(event) => eventColumnDblclick(event, itemRow, itemColumn, itemRow[itemColumn.value])"
           @keydown="(event) => eventColumnKeydown(event, itemRow, itemColumn, itemRow[itemColumn.value])"
           @editing-canceled="editingCanceled"
           @editing-accepted="editingAccepted">

        <div class="box-editing display-none">
          <div class="box-editing-default">
            <!-- includes default component editing -->
          </div>
        </div>

        <div class="box-display">
          <data-table-content-display :value="itemRow[itemColumn.value]"
                                      :properties="itemColumn"
                                      :type-height="typeHeight"></data-table-content-display>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import DataTableOverflow from '../DataTableOverflow.vue';
import DataTableTooltip from '../DataTableTooltip.vue'; 
import DataTableContentDisplay from '../DataTableContentDisplay.vue';

import { DataTable } from '../DataTable.js';
import { Events } from './mixins/Events.js';
import { Editing } from './mixins/Editing.js';

export default {
  name: 'DataTableBody',
  components: {
    DataTableOverflow,
    DataTableTooltip,
    DataTableContentDisplay,
  },
  mixins: [
    DataTable, // gettingValueForType, computedActionMax
    Events,
    Editing,
  ],
  props: {
    id: { type: String, default: 'dataTable' },
    tableName: { type: String, default: '' },
    template: Object,
    typeHeight: { type: String, default: 'fixed' },
    typeColumn: { type: String, default: 'fixed' },
    items: { type: Array, default: () => [] },
    itemsHeader: { type: Array, default: () => [] },
    isEditable: {type: Boolean, default: false},
    isExpansion: {type: Boolean, default: false},
    isMultiline: {type: Boolean, default: false},
  },
  computed: {
    isLoadingData() {
      return this.$store.getters[`DataTable/GET_PROCESSED_STATUS`];
    },
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
  &-empty {
    font-size: .875rem;
    font-weight: bold;
    color: rgba(0, 0, 0, .6);
    padding: 5px 0px;

    &_fixed { padding-left: $columnPaddingLRFixed; padding-right: $columnPaddingLRFixed; }
    &_dense { padding-left: $columnPaddingLRDense; padding-right: $columnPaddingLRDense; }
    &_auto  { padding-left: $columnPaddingLRAuto;  padding-right: $columnPaddingLRAuto;  }
  }
  &-row {
    display: grid;
    border-bottom: $rowBorder;
    outline: none;
    transition-delay: .05s;

    &_fixed { grid-template-rows: repeat(auto-fit, $rowHeightFixed); min-height: 1 + $rowHeightFixed; }
    &_dense { grid-template-rows: repeat(auto-fit, $rowHeightDense); min-height: 2 + $rowHeightDense; }
    &_auto  { grid-template-rows: $rowHeightAuto; /* repeat(auto-fill, $rowHeightAuto); */ }

    &_hover { background-color: $rowBackgroundHover; }
    &_focus { background-color: $rowBackgroundFocus; }

    .body-column {
      border: thin solid rgba(0, 0, 255, 0);
      outline: none;
      overflow: hidden;

      &_fixed { padding-left: $columnPaddingLRFixed; padding-right: $columnPaddingLRFixed; }
      &_dense { padding-left: $columnPaddingLRDense; padding-right: $columnPaddingLRDense; }
      &_auto  { padding-left: $columnPaddingLRAuto;  padding-right: $columnPaddingLRAuto;  }

      &_focus { border: $columnBorderFocus; }
      &_editing { background-color: white; }

      &__action-max {
        grid-area: action_max;
        justify-content: center;
        align-items: flex-start;
        .action-btn {
          margin-left: 0px;
          &_action {
            transform: rotate(-180deg);
          }
        }
      }

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