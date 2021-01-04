<template>
  <div class="data-table" :id="parentId">
    <div class="data-table-head">
      <data-table-head :list-data="listHeader"
                       :fields-template="fieldsTemplate"
                       :height-type="heightType"
                       :padding-type="paddingType"></data-table-head>
      <data-table-progress-line :is-show="isProgressBar"></data-table-progress-line>
    </div>
    <!-- table body -->
    <div class="data-table-body">
      <!-- @event-row-focused - one click row - emit event for parent component or page -->
      <!-- @event-row-selected - dblClick row - emit event for parent component or page -->
      <data-table-body :list-data="listBody"
                       :list-data-header="listHeader"
                       :fields-template="fieldsTemplate"
                       :height-type="heightType"
                       :padding-type="paddingType"
                       :parent-id="parentId"
                       :editable="editable"
                       :tableName="tableName"
                       @event-row-focused="eventRowFocused"
                       @event-row-selected="eventRowSelected">
        <!-- editing slot -->
        <template v-for="item in listHeader" #[`body-editing.${item.value}`]="itemValue">
          <slot :name="`body-editing.${(item) ? item.value : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
        </template>
        <!-- display slot -->
        <template v-for="item in listHeader" #[`body-display.${item.value}`]="itemValue">
          <slot :name="`body-display.${(item) ? item.value : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
        </template>
        <!-- action slot -->
        <template v-slot:action="activeValue">
          <slot name="action" v-bind:activeValue="activeValue.activeValue"></slot>
        </template>
      </data-table-body> 
    </div>

    <!-- anchor for lazy load data -->
    <div class="data-table-boot-anchor" id="boot-anchor"></div>

    <!-- component footer -->
    <div class="data-table-footer" :class="`data-table-footer_${paddingType}`" v-show="footer">
      <slot name="component-footer">
        <div class="table-footer">Всего записей в базе по таблице: {{ countRowInBase }}, загружено и показано: {{ countRowLoad }}</div>
      </slot>
    </div>
  </div>
</template>

<script>
import DataTableProgressLine from './components/DataTableProgressLine.vue';
import DataTableHead from './components/DataTableHead/DataTableHead.vue';
import DataTableBody from './components/DataTableBody/DataTableBody.vue';

import { Events } from './mixins/Events.js'; // 
import { Styles } from './mixins/Styles.js'; // heightType
import { LoadData } from './mixins/LoadData.js'; // isProgressBar
import { GetData } from './mixins/GetData.js'; // listHeader, listBody
import { BuildingTemplate } from './mixins/BuildingTemplate.js'; // fieldsTemplate

export default {
  name: 'DataTable',
  components: {
    DataTableProgressLine,
    DataTableHead,
    DataTableBody,
  },
  mixins: [
    Events,
    Styles,
    LoadData,
    GetData,
    BuildingTemplate,
  ],
  props: {
    dId: String,
    tableProperties: Object,
    footer: {type: Boolean, default: false},
    editable: {type: Boolean, default: false},
  },
  data() {
    return {
      tableName: this.tableProperties.tableName,
      parentId: (this.dId) ? `data-table-${this.dId}` : 'data-table',
      parentElement: '',
      parentEdge: Number,
    }
  },
  mounted() {
    this.parentElement = document.getElementById(this.parentId);
    this.parentEdge = this.parentElement.getBoundingClientRect().bottom;
  },
}
</script>

<style lang="scss" scoped>
@import './DataTable.scss';

.data-table {
  position: relative;
  height: 100%;
  font-family: $fontFamily;
  border-radius: $borderRadius;
  box-shadow: $boxShadow;
  overflow: auto;
  &::-webkit-scrollbar {
    width: $scrollWidth;
    height: $scrollHeight;
    border-radius: $scrollBorderRadius;
    &-thumb {
      border-radius: $scrollThumbBorderRadius;
      background-color: $scrollThumbBackgroundColor;
    }
  }

  &-head, &-footer { position: sticky; }
  &-head, &-body, &-footer { display: inline-flex; }
  &-head { top: 0px; z-index: 40; }
  &-body { position: relative; z-index: 20; }
  &-footer { 
    width: 100%; 
    bottom: 0px; 
    left: 0px; 
    z-index: 30; 
    background-color: white;
    border-top: thin solid rgba(0,0,0,.12);

    font-size: $headFontSize;
    font-weight: $headFontWeight;
    line-height: $headFontLineHeight;
    color: $headFontColor;
    &_fixed { padding-left: $headPaddingLR; padding-right: $headPaddingLR;}
    &_dense { padding-left: $headDensePaddingLR; padding-right: $headDensePaddingLR;}

    .table-footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // border-top: thin solid rgba(0,0,0,.12);
      width: 100%;
      height: 40px;
      // background-color: white;
    }
  }
}
</style>