<template>
  <div class="data-table" :id="id">
    <!-- <div class="data-table__block" v-if="isLoadingData"></div> -->
    <!-- <v-overlay v-if="isLoadingData"></v-overlay> -->
    <div class="data-table__header">
      <data-table-header :id="`data-table-${id}`"
                         :table-name="properties.tableName"
                         :template="computedTemplateTable"
                         :type-height="typeHeight"
                         :type-column="typeColumn"
                         :items="getDataHeader"
                         :is-expansion="isExpansion"
                         :is-multiline="isMultiline"
                         :is-hierarchy-mode="storeGetHierarchyMode"></data-table-header>
      <data-table-progress-line :is-show="isLoadingData"></data-table-progress-line>
    </div>

    <div class="data-table__body-group">
      <data-table-body-group :table-name="properties.tableName"
                             :template="computedTemplateTable"
                             :start-column="properties.headers[0]"
                             :type-height="typeHeight"
                             :type-column="typeColumn"
                             :items="itemsDataGroup"
                             :items-header="getDataHeader"
                             ></data-table-body-group>
    </div>

    <div class="data-table__body">
      <data-table-body :id="id"
                       :table-name="properties.tableName"
                       :template="computedTemplateTable"
                       :type-height="typeHeight"
                       :type-column="typeColumn"
                       :items="storeGetData"
                       :items-header="getDataHeader"
                       :is-editable="isEditable"
                       :is-expansion="isExpansion"
                       :is-multiline="isMultiline"
                       :is-hierarchy-mode="storeGetHierarchyMode"
                       :is-scroll="isScroll"
                       @event-row-focused="eventRowFocused"
                       @event-row-selected="eventRowSelected"
                       @event-row-keydown="eventRowKeydown"
                       @event-body-blur="eventBodyBlur"
                       @toggle-group="toggleGroup"></data-table-body>
    </div>

    <!-- ANCHOR FOR LAZY LOAD DATA -->
    <div class="data-table__boot-anchor" :id="`${id}-boot-anchor`"></div>

    <div class="data-table__footer" v-show="isFooter">
      <slot name="component-footer">
        <data-table-footer :tableName="properties.tableName" 
                           :type-column="typeColumn"></data-table-footer>
      </slot>
    </div>
  </div>
</template>

<script>
import DataTableProgressLine from './components/DataTableProgressLine.vue';
import DataTableHeader from './components/DataTableHeader/DataTableHeader.vue';
import DataTableBodyGroup from './components/DataTableBodyGroup/DataTableBodyGroup.vue';
import DataTableBody from './components/DataTableBody/DataTableBody.vue';
import DataTableFooter from './components/DataTableFooter/DataTableFooter.vue';

import { DataTableStore } from './DataTableStore.js';

import { LoadingData } from './mixins/LoadingData.js';
import { GettingData } from './mixins/GettingData.js';
import { ComputedTemplate } from './mixins/ComputedTemplate.js'; // computedTemplateTable
import { EventsComponent } from './mixins/EventsComponent.js';
import { HierarchyGroup } from './mixins/HierarchyGroup.js';

export default {
  name: 'DataTable',
  components: {
    DataTableProgressLine,
    DataTableHeader,
    DataTableBodyGroup,
    DataTableBody,
    DataTableFooter,
  },
  mixins: [
    DataTableStore,
    LoadingData,
    GettingData,
    ComputedTemplate,
    EventsComponent,
    HierarchyGroup,
  ],
  props: {
    id: { type: String, default: 'dataTable' },
    properties: Object,
    typeHeight: { type: String, default: 'fixed' },
    typeColumn: { type: String, default: 'fixed' },
    isEditable: { type: Boolean, default: false },
    isFooter: { type: Boolean, default: false },
    isExpansion: { type: Boolean, default: false },
    isMultiline: { type: Boolean, default: false },
    // isHierarchy: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
@import './DataTable.scss';

.data-table {
  position: relative;
  height: 100%;
  
  font-family: $dtFontFamily;
  border-radius: $borderRadius;
  box-shadow: $boxShadow;
  overflow: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: $scrollWidth;
    height: $scrollHeight;
    border-radius: $scrollBorderRadius;
    &-thumb {
      border-radius: $scrollThumbBorderRadius;
      background-color: $scrollThumbBackgroundColor;
    }
  }

  &__block {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .12);
    z-index: 999;
  }

  &__header {
    position: sticky;
    top: 0px;
    display: flex;
    min-height: 5px;
    z-index: 300;
  }
  &__body-group {
    position: relative;
    display: flex;
    z-index: 150;
  }
  &__body {
    position: relative;
    display: flex;
    z-index: 100;
  }
  &__boot-anchor {
    height: 5px;
    width: 5px;
  }
  &__footer {
    position: sticky;
    bottom: 0px;
    left: 0px;
    display: flex;
    z-index: 200;
  }
}
</style>