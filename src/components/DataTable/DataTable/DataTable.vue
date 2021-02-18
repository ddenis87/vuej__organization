<template>
  <div class="data-table" :id="id">
    <div class="data-table__header">
      <data-table-header :id="`data-table-${id}`"
                         :table-name="properties.tableName"
                         :template="computedTemplateTable"
                         :type-height="typeHeight"
                         :type-column="typeColumn"
                         :items="gettingDataHeader"
                         :is-expansion="isExpansion"
                         :is-multiline="isMultiline"></data-table-header>
      <data-table-progress-line :is-show="isLoadingData"></data-table-progress-line>
    </div>

    <div class="data-table__body">
      <data-table-body :id="id"
                       :table-name="properties.tableName"
                       :template="computedTemplateTable"
                       :type-height="typeHeight"
                       :type-column="typeColumn"
                       :items="gettingDataBody"
                       :items-header="gettingDataHeader"
                       :is-editable="isEditable"
                       :is-expansion="isExpansion"
                       :is-multiline="isMultiline"
                       
                       :is-scroll="isScroll"
                       @event-row-focused="eventRowFocused"
                       @event-row-selected="eventRowSelected"
                       @event-row-keydown="eventRowKeydown"
                       @event-body-blur="eventBodyBlur"></data-table-body>
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
import DataTableBody from './components/DataTableBody/DataTableBody.vue';
import DataTableFooter from './components/DataTableFooter/DataTableFooter.vue';

import { LoadingData } from './mixins/LoadingData.js';
import { GettingData } from './mixins/GettingData.js';
import { ComputedTemplate } from './mixins/ComputedTemplate.js'; // computedTemplateTable
import { EventsComponent } from './mixins/EventsComponent.js';

export default {
  name: 'DataTable',
  components: {
    DataTableProgressLine,
    DataTableHeader,
    DataTableBody,
    DataTableFooter,
  },
  mixins: [
    LoadingData,
    GettingData,
    ComputedTemplate,
    EventsComponent,
  ],
  props: {
    id: { type: String, default: 'dataTable' },
    properties: Object,
    typeHeight: { type: String, default: 'fixed' },
    typeColumn: { type: String, default: 'fixed' },
    isEditable: {type: Boolean, default: false},
    isFooter: {type: Boolean, default: false},
    isExpansion: {type: Boolean, default: false},
    isMultiline: {type: Boolean, default: false},
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

  &__header {
    position: sticky;
    top: 0px;
    display: flex;
    min-height: 5px;
    z-index: 300;
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