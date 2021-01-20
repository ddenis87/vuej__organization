<template>
  <div class="page-table">
    <div class="page-table__control">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon @click.stop="isMenu = !isMenu"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ nameTable || 'Выберите таблицу' }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card min-width="380" max-height="34" flat v-if="isTableMount">
          <el-field-search label-text="Произвольный поиск по таблице"></el-field-search>
        </v-card>
      </v-toolbar>

      <dialog-bar-left is-dialog-name="Таблицы" 
                       :is-dialog-show="isMenu" 
                       @close-dialog="isMenu = false">
        <v-list nav dense>
          <v-list-item-group v-model="activeMenu">
            <v-list-item link
                         v-for="item in listMenu" 
                         :key="item.path" 
                         :value="item">
              <v-list-item-title>{{ item.value }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </dialog-bar-left>
      
    </div>
    <div class="page-table__body">
      <div class="table-control">
        <data-table-control :form-properties="formProperties"
                            :focused-element="focusedElement"
                            @toggle-type-row="toggleTypeRow"
                            @toggle-type-column="toggleTypeColumn"
                            @toggle-footer="toggleFooter" ></data-table-control>
      </div>
      <div class="table-body">
        <component class="table" 
                   :is="componentTable"
                   :type-row-number="typeRowNumber"
                   :type-column="typeColumn"
                   :is-footer="isFooter"
                   @table-mount="tableMount"
                   @row-focused="rowFocused"
                   @row-selected="rowSelected"></component>
      </div>
    </div>
  </div>
</template>

<script>
import ElFieldSearch from '@/components/Elements/ElFieldSearch.vue';
import DialogBarLeft from '@/components/Dialogs/DialogBarLeft.vue';
import DataTableControl from '@/components/DataTable/DataTableControl/DataTableControl.vue';

export default {
  name: 'PageTable',
  components: {
    ElFieldSearch,
    DialogBarLeft,
    DataTableControl,
  },
  data() {
    return {
      isMenu: false,
      activeMenu: null,
      listMenu: [
        {value: 'Организации', path: 'TableOrganisations'},
        {value: 'БК', path: 'TableBudgetClassifications'},
      ],

      formProperties: null,
      focusedElement: null,

      typeRowNumber: 0,
      typeRow: ['fixed', 'dense', 'auto'],
      typeColumn: 'padding-fixed',
      isFooter: false,
    }
  },
  computed: {
    componentTable() { if (this.activeMenu) return () => import(`@/components/TTables/${this.activeMenu?.path}`); else return null; },
    isTableMount() { return (this.formProperties == null) ? false : true },
    nameTable() { return this.activeMenu?.value; },
  },
  watch: {
    activeMenu() {
      this.isMenu = false;
      this.formProperties = null;
      this.focusedElement = null;
      this.typeRowNumber = 0;
      this.typeColumn = 'padding-fixed';
      this.isFooter = false;
    },
  },
  methods: {
    tableMount(data) {
      this.formProperties = data.tableProperties;
      console.log(data);
    },
    rowFocused(option) {
      console.log(option);
      this.focusedElement = Object.assign({}, option);
    },
    rowSelected(option) {
      this.$emit('event-row-selected', option); // поменять имя события здесь и в диалоге который его слушает (EL-element-dialog)
    },
    toggleTypeRow() {
      if (this.typeRowNumber == this.typeRow.length - 1) { this.typeRowNumber = 0; return; }
      this.typeRowNumber = this.typeRowNumber + 1;
    },
    toggleTypeColumn() {
      (this.typeColumn == 'padding-fixed') ? this.typeColumn = 'padding-dense' : this.typeColumn = 'padding-fixed';
    },
    toggleFooter() {
      this.isFooter = !this.isFooter;
    },
  },
}
</script>

<style lang="scss" scoped>
.page-table {
  height: 100%;
  &__control {
    z-index: 20;
  }
  &__body {
    z-index: 10;
    .table-body {
      height: calc(100vh - 160px);
      .table {
        height: 100%;
        z-index: 5;
      }
    }
  }
}
</style>