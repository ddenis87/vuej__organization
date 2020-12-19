<template>
  <div class="data-table" :id="parentId">
    <div class="data-table-tooltip" id="data-table-tooltip" @mouseout="hideTooltip" @click="hideTooltip"></div>
    <!-- table head -->
    <div class="data-table-head">
      <data-table-head :style="fieldsTemplate"
                       :list-data="listHeader" 
                       :height-type="heightType"></data-table-head>
      <progress-line :is-show="isShowProgressBar"></progress-line>
    </div>
    <!-- table body -->
    <div class="data-table-body">
      <data-table-body :list-data="listBody"
                      :list-data-header="listHeader"
                      :fields-template="fieldsTemplate"
                      :height-type="heightType"
                      :parent-id="parentId"
                      :editable="editable"
                      @show-tooltip="showTooltip" @dblclick-row="(eventTarget, itemColumn) => $emit('dblclick-row', eventTarget, itemColumn)">

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
import ProgressLine from './components/ProgressLine.vue';

import { LoadData } from './mixins/LoadData.js';
import { GetterData } from './mixins/GetterData.js';
import { BuildingTemplate } from './mixins/BuildingTemplate.js';
import { Tooltip } from './mixins/Tooltip.js';

export default {
  name: 'DataTable',
  components: { 
    DataTableHead,
    DataTableBody,
    ProgressLine,
  },
  mixins: [
    LoadData,
    GetterData,
    BuildingTemplate,
    Tooltip,
  ],
  props: {
    dId: String,
    tableProperties: Object,

    // props for height type
    fixed: {type: Boolean, default: true},
    dense: {type: Boolean, default: false},
    auto: {type: Boolean, default: false},
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
  computed: {
    heightType() {
      let heightType = 'fixed';
      if (this.dense) heightType = 'dense';
      if (this.auto) heightType = 'auto';
      return heightType;
    },
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
    width: 8px;
    height: 8px;
    border-radius: 4px;
    &-thumb {
      border-radius: 3px;
      background-color:  rgba(0,0,0,0.2);
    }
  }

  &-head, &-footer { position: sticky; }
  &-head, &-body, &-footer { display: inline-flex; }
  &-head { top: 0px; z-index: 40; }
  &-body { position: relative; z-index: 20; }
  &-footer { bottom: 0px; z-index: 30; }

  &-tooltip {
    position: fixed;
    left: 100px;
    top: 100px;
    // max-width: 400px;
    min-width: 400px;

    font-size: $tooltipFontSize;
    color: $tooltipFontColor;
    border: thin solid rgba(0,0,0,.3);
    border-radius: 10px;
    box-shadow: 2px 2px 4px 0px rgba(0,0,0,.12);
    background-color: white;
    padding: 4px 6px;
    opacity: 1;
    z-index: 100;
    visibility: hidden;
  }
}
</style>