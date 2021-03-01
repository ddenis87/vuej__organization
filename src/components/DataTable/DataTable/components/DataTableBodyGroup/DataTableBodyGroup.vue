<template>
  <div class="body-group">
    <div v-for="(itemRow, indexRow) in items"
         class="body-group-row"
         :class="`body-group-row_${typeHeight}`"
         :key="`body-group-row-${indexRow}`"
         :style="computedTemplate(indexRow)"
         :tabindex="indexRow">
      <!-- GROUP ELEMENT class="body-group-column__group"--> 
      <hierarchy-actions class="body-group-column__group"
                         :item-row="itemRow"
                         :data-id="itemRow.id"
                         @toggle-group="(event) => toggleGroup(event, itemRow)"
                         v-if="isHierarchyMode"></hierarchy-actions>

      <div v-for="(itemColumn, indexColumn) in itemsHeader"
           class="body-group-column"
           :class="`body-group-column_${typeColumn}`"
           :key="`body-group-column-${indexColumn}`"
           :style="itemColumn.position_in_template"
           :tabindex="(isEditable) ? indexColumn : ''"
           :data-overflow-text="gettingValueForType(itemColumn, itemRow[itemColumn.value])">
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
import DataTableContentDisplay from '../DataTableContentDisplay.vue';
import HierarchyActions from './components/HierarchyActions.vue';

import { DataTableBodyGroupStore } from './DataTableBodyGroupStore.js';

import { DataTable } from '../DataTable.js';
// import { Hierarchy } from './mixins/Hierarchy.js';
export default {
  name: 'DataTableBodyGroup',
  components: {
    DataTableContentDisplay,
    HierarchyActions,
  },
  mixins: [
    DataTableBodyGroupStore,
    DataTable, // gettingValueForType, computedActionMax
    // Hierarchy,
  ],
  props: {
    tableName: { type: String, default: '' },
    template: Object,
    startColumn: Object,
    typeHeight: { type: String, default: 'fixed' },
    typeColumn: { type: String, default: 'fixed' },
    items: { type: Array, default: () => [] },
    itemsHeader: { type: Array, default: () => [] },
    isEditable: {type: Boolean, default: false},
    isHierarchyMode: {type: Function, default:() => false},
  },
  data() {
    return {
    }
  },
  methods: {
    computedTemplate(index) {
      let element = this.startColumn;
      let columnWidth = '';
      if (Array.isArray(element.width)) {
        columnWidth += `minmax(${(element.width[0] != undefined) ? 
          element.width[0] + ((1) * 20) : 
          `${100 + ((index + 1) * 20)}`}px,${(element.width[1] != undefined) ? 
            element.width[1] + 'px' : 
            '100vw'}) `;
      } else {
        columnWidth += `${element.width + ((index + 1) * 20)}px `
      }
      let newTemplate = {
        'grid-template-areas': this.template['grid-template-areas'],
        'grid-template-columns': '',
      };
      // let widthStartColumn = this.templateGroup['grid-template-columns'].split(' ')[1];
      let newGridTemplateColumns = this.template['grid-template-columns'].split(' ');
      newGridTemplateColumns[1] = columnWidth;
      newGridTemplateColumns[0] = `${40 + (20 * index)}px`;

      newTemplate['grid-template-columns'] = newGridTemplateColumns.join(' ');
      // console.log(newTemplate);
      return newTemplate;
    },
    toggleGroup(event, option) {
      let sendOption = {
        tableName: this.tableName,
        value: option,
      };
      this.storeToggleGroup(sendOption);
    },
  },
}
</script>

<style lang="scss" scoped>
@import './DataTableBodyGroup.scss';
.body-group {
  font-size: $fontSize;
  font-weight: $fontWeight;
  color: $fontColor;

  box-sizing: border-box;

  &-row {
    display: grid;
    border-bottom: $rowBorder;
    outline: none;
    transition-delay: .05s;
    color: green;
    &_fixed { grid-template-rows: repeat(auto-fit, $rowHeightFixed); min-height: 1 + $rowHeightFixed; }
    &_dense { grid-template-rows: repeat(auto-fit, $rowHeightDense); min-height: 2 + $rowHeightDense; }
    &_auto  { grid-template-rows: $rowHeightAuto; /* repeat(auto-fill, $rowHeightAuto); */ }

    &_hover { background-color: $rowBackgroundHover; }
    &_focus { background-color: $rowBackgroundFocus; }

    .body-group-column {
      border: thin solid rgba(0, 0, 255, 0);
      outline: none;
      overflow: hidden;

      &_fixed { padding-left: $columnPaddingLRFixed; padding-right: $columnPaddingLRFixed; }
      &_dense { padding-left: $columnPaddingLRDense; padding-right: $columnPaddingLRDense; }
      &_auto  { padding-left: $columnPaddingLRAuto;  padding-right: $columnPaddingLRAuto;  }

      &_focus { border: $columnBorderFocus; }
      &_editing { background-color: white; }

      // &__action-max {
      //   grid-area: action_max;
      //   justify-content: center;
      //   align-items: flex-start;
      //   .action-btn {
      //     margin-left: 0px;
      //     &_action {
      //       transform: rotate(-180deg);
      //     }
      //   }
      // }
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