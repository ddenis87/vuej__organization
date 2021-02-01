<template>
  <div class="body"
       @mouseover="eventMouseOver"
       @mouseout="eventMouseOut">

    <div class="body-empty"
         v-if="items.length == 0">
      Условия отсутствуют
    </div>

    <div v-for="(itemRow, indexRow) in items"
          class="body-row"
          :key="`body-row-${indexRow}`"
          :style="template"
          :tabindex="indexRow"
          @focus="(event) => eventRowFocus(event, itemRow)"
          @blur="eventRowBlur"
          @click="(event) => eventRowClick(event, itemRow)">

      <div class="body-column"></div> <!-- EMPTY FIRST COLUMN -->

      <div v-for="(itemColumn, indexColumn) in headers"
           class="body-column"
           :key="`body-column-${indexColumn}`"
           :style="itemColumn.position_in_template"
           :tabindex="indexColumn"
           @focus="eventColumnFocus"
           @blur="eventColumnBlur">
        <slot :name="itemColumn.key" :value="itemRow">{{ itemRow[itemColumn.key] }}</slot>
      </div>
    </div>

  </div>
</template>

<script>
import { DataTableLazyBodyEvents } from './DataTableLazyBodyEvents.js';
export default {
  name: 'DataTableLazyBody',
  mixins: [
    DataTableLazyBodyEvents,
  ],
  props: {
    headers: Array,
    items: Array,
    template: Object,
  }
}
</script>

<style lang="scss" scoped>
@import './DataTableLazyBody.scss';

.body {

  font-size: $fontSize;
  font-weight: $fontWeight;
  color: $fontColor;

  box-sizing: border-box;
  &-empty {
    font-size: .875rem;
    font-weight: bold;
    color: rgba(0, 0, 0, .6);
    padding: 5px 10px;
  }
  &-row {
    display: grid;
    grid-template-rows: 30px;
    border-bottom: $rowBorder;
    outline: none;
    transition-delay: .05s;

    &_hover { background-color: $rowBackgroundHover; }
    &_focus { background-color: $rowBackgroundFocus; }

    .body-column {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 3px 10px;
      
      border: thin solid rgba(0, 0, 255, 0);
      border-right: $rowBorder;
      outline: none;
      overflow: hidden;
      &:last-child { border-right: 0px; }
      &_focus { border: $columnBorderFocus; }
      &_editing { background-color: white; }
    }
  }
}
</style>