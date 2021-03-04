<template>
  <div class="body"
       @mouseover="eventMouseOver"
       @mouseout="eventMouseOut" @scroll="scrollBody">

    <!-- TOOLTIP -->
    <data-table-tooltip :is-show="isTooltipShow"
                        :data-properties="isTooltipProperties"
                        @click="isTooltipShow = false" 
                        @mousemove="isTooltipShow = false">
      {{ isTooltipProperties.text }}
    </data-table-tooltip>

    <!-- NO ELEMENT FOR DISPLAY -->
    <empty-content :tableName="tableName"
                   :guid="guid"></empty-content>

    <!-- OVERFLOW TEXT -->
    <data-table-overflow :d-id="`${id}-body`"
                         :data-properties="isTooltipProperties"
                         @is-show="isTooltipShow = true" 
                         @is-hide="isTooltipShow = false"></data-table-overflow>
    
    <!-- NO ELEMENT FOR DISPLAY -->
    <!-- <div class="body-empty"
         :class="`body-empty_${typeColumn}`"
         v-if="isEmptyData">Нет элементов для отображения</div> -->

    <div v-for="(itemRow, indexRow) in items"
         class="body-row"
         :class="`body-row_${typeHeight}`"
         :key="`body-row-${indexRow}`"
         :style="template"
         :tabindex="indexRow"
         @focus="(event) => eventRowFocus(event, itemRow)"
         @blur="eventRowBlur"
         @dblclick="(event) => eventRowDblclick(event, itemRow)"
         @keydown.stop="(event) => eventRowKeydown(event, itemRow)">
      
      <!-- EXPANSION ROW -->
      <div class="body-column__action-max"
           :class="`body-column_${typeColumn}`"
           v-if="computedActionMax && !isMultiline">
        <v-btn x-small icon class="action-btn" @click="eventExpansionRow">
          <v-icon small>mdi-chevron-down</v-icon>
        </v-btn>
      </div>

      <!-- GROUP ELEMENT class="body-column__group"--> 
      <hierarchy-actions class="body-column__group"
                         :item-row="itemRow"
                         :data-id="itemRow.id"
                         @toggle-group="(event) => toggleGroup(event, itemRow)"
                         v-if="isHierarchyMode"></hierarchy-actions>

      <div v-for="(itemColumn, indexColumn) in itemsHeader"
           class="body-column"
           :class="`body-column_${typeColumn}`"
           :key="`body-column-${indexColumn}`"
           :style="itemColumn.position_in_template"
           :tabindex="(isEditable) ? indexColumn : ''"
           :data-overflow-text="gettingValueForType(itemColumn, itemRow[itemColumn.value])"
           @focus="(event) => eventColumnFocus(event, itemRow)"
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
import HierarchyActions from './components/HierarchyActions.vue';
import EmptyContent from './components/EmptyContent.vue';

import { DataTableBodyStore } from './DataTableBodyStore.js';

import { DataTable } from '../DataTable.js';
import { Events } from './mixins/Events.js';
import { EventsMouse } from './mixins/EventsMouse.js';
import { EventsKeyboard } from './mixins/EventsKeyboard.js';
import { Editing } from './mixins/Editing.js';
// import { Hierarchy } from './mixins/Hierarchy.js';

export default {
  name: 'DataTableBody',
  components: {
    DataTableOverflow,
    DataTableTooltip,
    DataTableContentDisplay,
    HierarchyActions,
    EmptyContent,
  },
  mixins: [
    DataTableBodyStore,
    DataTable, // gettingValueForType, computedActionMax
    Events,
    EventsMouse,
    EventsKeyboard,
    Editing,
    // Hierarchy,
  ],
  props: {
    guid: { type: String, default: '' },
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
    // isHierarchyMode: {type: Function, default() { return () => false }},
    isScroll: { type: Boolean, default: false },
  },
  data() {
    return {
      isDataLoad: false,
      isTimerLoad: null,
    }
  },
  computed: {
    isHierarchyMode() { return this.$store.getters[`DataTable/GET_HIERARCHY_MODE`](this.tableName); },
    isModeAdding() {
      return this.$store.getters['DataTable/GET_MODE_ADDING_STATUS'](this.tableName);
    },
    // isLoadingData() {
    //   return this.$store.getters[`DataTable/GET_STATUS_PROCESSING`];
    // },
    // isEmptyData() {
    //   clearTimeout(this.isTimerLoad);
    //   if (!this.$store.getters[`DataTable/GET_STATUS_PROCESSING`] && this.items.length == 0) {
    //     this.isTimerLoad = setTimeout(() => {this.isDataLoad = true}, 1000);
    //   } else {
    //     this.isDataLoad = false;
    //   }
    //   return this.isDataLoad;
    // },
  },
  watch: {
    isModeAdding() { // SELECTED FOR ADDING ELEMENT INLINE
      console.log('mode adding');
      if (!this.isModeAdding) return;
      setTimeout(() => {
        let indexAddingElement = this.$store.getters['DataTable/GET_MODE_ADDING_INDEX'](this.tableName);
        let firstElement = document.querySelectorAll(`#${this.guid} .body .body-row`)[indexAddingElement].querySelectorAll('.body-column')[0];
        let eventDblClick = new Event('dblclick', {bubbles: false});
        firstElement.focus();
        firstElement.dispatchEvent(eventDblClick);
      }, 500);
    },
    isScroll() {
      this.isTooltipShow = false;
    },
  },
  updated() {
    if (this.$store.getters['DataTable/GET_MODE_ADDING_ID'](this.tableName)) {
      let recordId = this.$store.getters['DataTable/GET_MODE_ADDING_ID'](this.tableName);
      let index = this.$store.getters['DataTable/GET_DATA_INDEX'](this.tableName, {recordId: recordId});
      if (document.querySelectorAll(`#${this.guid} .body .body-row`)[index] &&
          document.querySelectorAll(`#${this.guid} .body .body-row`)[index].querySelectorAll('.body-column')) {
        let firstElement = document.querySelectorAll(`#${this.guid} .body .body-row`)[index].querySelectorAll('.body-column')[0];
        if (firstElement) {
          setTimeout(() => {
            firstElement.focus();
            this.$store.commit('DataTable/SET_MODE_ADDING_ID', { tableName: this.tableName, recordId: null, guid: this.guid });
          }, 1000);
        }
      }
    }
  },
  methods: {
    toggleGroup(event, option) {
      let sendOption = {
        tableName: this.tableName,
        guid: this.guid,
        value: option,
      };
      
      // ------
      this.storeToggleGroup(sendOption);
      // this.$emit('toggle-group', sendOption);
      // ------

    },
    scrollBody() {
      console.log('scroll');
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
      &__group {
        grid-area: group;
        display: flex;
        justify-content: flex-end;
        // gap: 3px;
        align-items: flex-start;
        // .action-btn {
        //   margin-right: 5px;
        //   &_action {
        //     transform: rotate(90deg);
        //   }
        // }
      }
      
      .box-editing, .box-display {
        width: 100%;
        height: 100%;
      }
      .box-display {
        position: relative;
        display: flex;
        align-items: $columnVerticalAlign;
        &__group {
          display: flex;
        }
      }
      .display-none { display: none; }
    }
  }
}
</style>