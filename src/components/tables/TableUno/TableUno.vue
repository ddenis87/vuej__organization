<template>
  <div class="table-uno" :id="parentId">
    <div class="table-tooltip" id="table-tooltip" @mouseout="hideTooltip" @click="hideTooltip"></div>

    <div class="table-uno-head">
      <table-uno-head :style="fieldsTemplate"
                      :list-data="listHeader" 
                      :height-type="heightType"></table-uno-head>
      <table-progress-line :is-show="isShowProgressBar"></table-progress-line>
    </div>
    
    <div class="table-uno-body">
      <table-uno-body :list-data="listBody"
                      :list-data-header="listHeader"
                      :fields-template="fieldsTemplate"
                      :height-type="heightType"
                      :parent-id="parentId"
                      @show-tooltip="showTooltip">

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
      </table-uno-body>
    </div>

    <div class="boot-anchor" id="boot-anchor"></div>
  </div>
</template>

<script>
import TableUnoHead from './TableUnoHead.vue';
import TableUnoBody from './TableUnoBody.vue';

import TableProgressLine from './TableProgressLine.vue';

import { LoadData } from './mixins/TableUno/LoadData';
import { GetterData } from './mixins/TableUno/GetterData';
import { BuildingTemplate } from './mixins/TableUno/BuildingTemplate';
import { Tooltip } from './mixins/TableUno/Tooltip';

export default {
  name: 'TableUno',
  components: { 
    TableUnoHead,
    TableUnoBody,
    TableProgressLine,
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
  },
  data() {
    return {
      parentId: (this.dId) ? `table-uno-${this.dId}` : 'table-uno',
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
@import 'TableUno.scss';

.table-uno {
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

  .table-tooltip {
    position: fixed;
    left: 100px;
    top: 100px;
    max-width: 400px;
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