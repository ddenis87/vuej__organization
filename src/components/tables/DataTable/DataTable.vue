<template>
  <div class="data-table" :id="parentId">
    <data-tooltip @hide-tooltip="hideTooltip" @mouseout="hideTooltip"></data-tooltip>
    <div class="data-table-head">
      <data-table-head :style="fieldsTemplate"
                       :list-data="listHeader" 
                       :height-type="heightType"></data-table-head>
      <data-progress-line :is-show="isProgressBar"></data-progress-line>
    </div>
    <!-- table body -->
    <div class="data-table-body">
      <!-- @dblClick-row - emit event for parent component or page -->
      <data-table-body :list-data="listBody"
                       :list-data-header="listHeader"
                       :fields-template="fieldsTemplate"
                       :height-type="heightType"
                       :parent-id="parentId"
                       :editable="editable"
                       @show-tooltip="showTooltip"
                       
                       @dblclick-row="(event, props) => $emit('dblclick-row', event, props)">
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
    <div class="data-table-footer">
      <slot name="component-footer"></slot>
    </div>
  </div>
</template>

<script>
import DataTableHead from './components/DataTableHead/DataTableHead.vue';
import DataTableBody from './components/DataTableBody/DataTableBody.vue';
import DataProgressLine from './components/DataProgressLine.vue';
import DataTooltip from './components/DataTooltip.vue';

import { Styles } from './mixins/Styles.js'; // heightType
import { LoadData } from './mixins/LoadData.js'; // isProgressBar
import { GetterData } from './mixins/GetterData.js'; // listHeader, listBody
import { BuildingTemplate } from './mixins/BuildingTemplate.js'; // fieldsTemplate
import { MDataTooltip } from './mixins/DataTooltip.js';

export default {
  name: 'DataTable',
  components: { 
    DataTableHead,
    DataTableBody,
    DataProgressLine,
    DataTooltip,
  },
  mixins: [
    Styles,
    LoadData,
    GetterData,
    BuildingTemplate,
    MDataTooltip,
  ],
  props: {
    dId: String,
    tableProperties: Object,

    editable: {type: Boolean, default: false},
  },
  data() {
    return {
      stateName: this.tableProperties.stateName,
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
  &-footer { bottom: 0px; z-index: 30; }

  // &-tooltip {
  //   position: fixed;
  //   left: 100px;
  //   top: 100px;
  //   // max-width: 400px;
  //   min-width: 400px;

  //   font-size: $tooltipFontSize;
  //   color: $tooltipFontColor;
  //   border: thin solid rgba(0,0,0,.3);
  //   border-radius: 10px;
  //   box-shadow: 2px 2px 4px 0px rgba(0,0,0,.12);
  //   background-color: white;
  //   padding: 4px 6px;
  //   opacity: 1;
  //   z-index: 100;
  //   visibility: hidden;
  // }
}
</style>