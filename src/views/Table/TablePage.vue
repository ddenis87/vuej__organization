<template>
  <div class="page-table">
    <v-toolbar dark flat tile
               class="menu-main"
               color="blue darken-3">
      <v-list nav dark dense color="blue darken-3">
        <v-list-item-group v-model="activeMenu">
          <v-list-item link class="menu-main__item" 
                        v-for="item in listMenu" 
                        :key="item.path" 
                        :value="item">
            <v-list-item-title>{{ item.value }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-spacer></v-spacer>
      <profile-user-bar></profile-user-bar>
    </v-toolbar>
    <div class="page-table__control">
      <v-toolbar dense flat>
        <!-- <v-app-bar-nav-icon @click.stop="isMenu = !isMenu"></v-app-bar-nav-icon> -->
        <v-toolbar-title>{{ nameTable || 'Выберите таблицу' }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card min-width="380" max-height="34" flat v-if="isTableMount">
          <el-field-search :is-label="true"
                           :input-properties="{label: 'Произвольный поиск по таблице'}"
                           @keydown-enter="freeSearch" 
                           @clear-value="freeSearchClear"></el-field-search>
        </v-card>
      </v-toolbar>

      <!-- <dialog-bar-left is-dialog-name="Таблицы" 
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
      </dialog-bar-left> -->
      
    </div>
    <div class="page-table__body">
      <div class="table-control">
        <data-table-control :form-properties="formProperties"
                            :focused-element="focusedElement"
                            :type-height-number="typeHeightNumber"
                            :type-column="typeColumn"
                            :is-footer="isFooter"
                            :is-expansion="isExpansion"
                            :is-multiline="isMultiline"
                            @toggle-type-row="toggleTypeRow"
                            @toggle-type-column="toggleTypeColumn"
                            @toggle-footer="toggleFooter"
                            @toggle-expansion="toggleExpansion"
                            @toggle-multiline="toggleMultiline" ></data-table-control>
      </div>
      <div class="table-body">
        <component class="table" 
                   :is="componentTable"
                   :type-row-number="typeHeightNumber"
                   :type-column="typeColumn"
                   :is-footer="isFooter"
                   :is-expansion="isExpansion"
                   :is-multiline="isMultiline"
                   @table-mount="tableMount"
                   @row-focused="rowFocused"
                   @row-selected="rowSelected"
                   @row-keydown="rowKeydown"
                   @component-blur="componentBlur"></component>
      </div>
    </div>
  </div>
</template>

<script>
import ElFieldSearch from '@/components/Elements/ElField/ElFieldSearch.vue';
import ProfileUserBar from '@/components/Profile/ProfileUserBar.vue';
import DialogBarLeft from '@/components/Dialogs/DialogBarLeft.vue';

import DataTableControl from '@/components/DataTable/DataTableControl/DataTableControl.vue';

export default {
  name: 'PageTable',
  components: {
    ElFieldSearch,
    ProfileUserBar,
    DialogBarLeft,
    DataTableControl,
  },
  data() {
    return {
      isMenu: false,
      activeMenu: {value: 'Организации', path: 'TableOrganization', tableName: 'organization'},
      listMenu: [
        {value: 'Организации', path: 'TableOrganization', tableName: 'organization'},
        {value: 'БК', path: 'TableBudgetclassification', tableName: 'budgetclassification'},
      ],

      formProperties: null,
      focusedElement: null,

      typeHeightNumber: 0,
      typeHeight: ['fixed', 'dense', 'auto'],
      typeColumn: 'fixed',
      isFooter: false,
      isExpansion: false,
      isMultiline: false,
    }
  },
  computed: {
    componentTable() { if (this.activeMenu) return () => import(`@/components/TheTable/The${this.activeMenu?.path}`); else return null; },
    isTableMount() { return (this.formProperties == null) ? false : true },
    nameTable() { return this.activeMenu?.value; },
  },
  watch: {
    activeMenu() {
      this.isMenu = false;
      this.formProperties = null;
      this.focusedElement = {};
      this.typeHeightNumber = 0;
      this.typeColumn = 'fixed';
      this.isFooter = false;
    },
  },
  methods: {
    tableMount(data, tableProperties) {
      this.focusedElement = {};
      this.formProperties = tableProperties;
      // console.log(data);
    },
    rowKeydown(event, option) {
      console.log(option);
      let sendOption = {
        tableName: option.tableName,
        recordId: ('id' in option.itemRow) ? option.itemRow.id : -1,
      }
      console.log(sendOption);
      this.$store.commit('DataTable/DATA_STORE_ADDING_ELEMENT', sendOption);
    },
    rowFocused(option) {
      // console.log(option);
      this.focusedElement = Object.assign({}, option);
    },
    rowSelected(option) {
      this.$emit('event-row-selected', option); // поменять имя события здесь и в диалоге который его слушает (EL-element-dialog)
    },
    componentBlur() {
      this.focusedElement = {};
    },
    toggleTypeRow() {
      if (this.typeHeightNumber == this.typeHeight.length - 1) { this.typeHeightNumber = 0; return; }
      this.typeHeightNumber = this.typeHeightNumber + 1;
    },
    toggleTypeColumn() {
      (this.typeColumn == 'fixed') ? this.typeColumn = 'dense' : this.typeColumn = 'fixed';
    },
    toggleFooter() {
      this.isFooter = !this.isFooter;
    },
    toggleExpansion() {
      this.isExpansion = !this.isExpansion;
    },
    toggleMultiline() {
      this.isMultiline = !this.isMultiline;
    },
    freeSearch(option) {
      console.log(option);
      this.$store.commit('DataTable/SET_FILTER_SEARCH', {
        tableName: this.activeMenu.tableName,
        value: option.value,
      });
      this.$store.commit('DataTable/SET_DATA_CLEAR', { tableName: this.activeMenu.tableName });
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.activeMenu.tableName});
    },
    freeSearchClear() {
      this.$store.commit('DataTable/SET_FILTER_SEARCH', {
        tableName: this.activeMenu.tableName,
        value: null,
      });
      this.$store.commit('DataTable/SET_DATA_CLEAR', { tableName: this.activeMenu.tableName });
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.activeMenu.tableName});
    },
  },
}
</script>

<style lang="scss" scoped>
.page-table {
  height: 100%;
  .menu-main {
    &__item {
      display: inline-flex;
    }
  }

  &__control {
    z-index: 20;
  }
  &__body {
    z-index: 10;
    .table-body {
      padding: 5px 5px;
      height: calc(100vh - 160px);
      .table {
        height: 100%;
        z-index: 5;
      }
    }
  }
}
</style>