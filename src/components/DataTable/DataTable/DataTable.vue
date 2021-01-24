<template>
  <div class="data-table" :id="id">
    <div class="data-table__header">
      <data-table-header :template="computedTemplateTable"
                         :type-height="typeHeight"
                         :type-column="typeColumn"
                         :items="gettingDataHeader"
                         :is-expansion="isExpansion"></data-table-header>
    </div>

    <div class="data-table__body">
      <data-table-body :table-name="properties.tableName"
                       :template="computedTemplateTable"
                       :type-height="typeHeight"
                       :type-column="typeColumn"
                       :items="gettingDataBody"
                       :items-header="gettingDataHeader"
                       :is-editable="isEditable"
                       :is-expansion="isExpansion"></data-table-body>
    </div>

    <div class="data-table__footer" v-show="isFooter">
      <slot name="component-footer">
        <data-table-footer :tableName="properties.tableName" 
                           :type-column="typeColumn"></data-table-footer>
      </slot>
    </div>
  </div>
</template>

<script>
import DataTableHeader from './components/DataTableHeader/DataTableHeader.vue';
import DataTableBody from './components/DataTableBody/DataTableBody.vue';
import DataTableFooter from './components/DataTableFooter/DataTableFooter.vue';

import { LoadingComponent } from './mixins/LoadingComponent.js';
import { GettingData } from './mixins/GettingData.js';
import { ComputedTemplate } from './mixins/ComputedTemplate.js'; // computedTemplateTable

export default {
  name: 'DataTable',
  components: {
    DataTableHeader,
    DataTableBody,
    DataTableFooter,
  },
  mixins: [
    LoadingComponent,
    GettingData,
    ComputedTemplate,
  ],
  props: {
    id: { type: String, default: 'dataTable' },
    properties: Object,
    typeHeight: { type: String, default: 'fixed' },
    typeColumn: { type: String, default: 'fixed' },
    isEditable: {type: Boolean, default: false},
    isFooter: {type: Boolean, default: false},
    isExpansion: {type: Boolean, default: false},
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
    z-index: 300;
  }
  &__body {
    position: relative;
    display: flex;
    z-index: 100;
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