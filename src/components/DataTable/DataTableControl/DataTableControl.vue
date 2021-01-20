<template>
  <div class="data-table-control">
    <v-toolbar height="40" flat>
      <el-button-icon icon="mdi-plus" :disabled="!isMountTable" @click="eventClickAdding">Добавить</el-button-icon>
      <el-button-icon icon="mdi-pencil" :disabled="!isFocusedElement" @click="eventClickEditing">Изменить</el-button-icon>
      <el-button-icon icon="mdi-delete" :disabled="!isFocusedElement" @click="eventActionDeleting">Удалить</el-button-icon>
      <v-spacer></v-spacer>

      <el-button-icon :icon="(this.heightType == 'fixed') ? 'mdi-view-sequential' : (this.heightType == 'dense') ? 'mdi-view-sequential-outline' : 'mdi-view-agenda'" 
                      :disabled="!isMountTable"
                      @click="$emit('toggle-type-row')">{{ (heightType == 'fixed') ? 'Строки сжато' : (heightType == 'dense') ? 'Строки свободно' : 'Строки авто' }}</el-button-icon>
      <el-button-icon :icon="(paddingType == 'padding-fixed') ? 'mdi-view-parallel-outline' : 'mdi-view-parallel'" 
                      :disabled="!isMountTable"
                      @click="$emit('toggle-type-column')">{{ (paddingType == 'padding-fixed') ? 'Столбцы сжато' : 'Столбцы свободно' }}</el-button-icon>
      <el-button-icon icon="mdi-page-layout-footer" 
                      :disabled="!isMountTable"
                      @click="$emit('toggle-footer')">Итоги</el-button-icon>

      <el-button-icon icon="mdi-view-quilt" disabled @click="$emit('toggle-multiline')">Многострочность</el-button-icon>
      <v-divider vertical></v-divider>
      
      <el-button-icon icon="mdi-filter-outline" 
                      :icon-color="(isFilterActive) ? 'blue' : ''" 
                      :disabled="!isMountTable"
                      @click="isOpenFilter = !isOpenFilter">Фильтр</el-button-icon>
    </v-toolbar>
    
    <dialog-bar-right is-dialog-name="Фильтры" 
                      :is-dialog-show="isOpenFilter" 
                      @close-dialog="isOpenFilter = false">
      <data-filter :table-name="tableName" 
                   @accept="isOpenFilter = false"
                   @close="isOpenFilter = false"></data-filter>
    </dialog-bar-right>
      
    <dialog-full-page :is-dialog-name="isDialogName" 
                      :is-dialog-show="isOpenDialog" 
                      @close-dialog="eventCloseDialog">
      <component :is="componentForm" 
                 :focused-element="focusedElementForm"
                 @event-action-accept="eventActionAccept"
                 @event-action-cancel="eventActionCancel"></component>
    </dialog-full-page>
  </div>
</template>

<script>
import DialogFullPage from '@/components/Dialogs/DialogFullPage.vue';
import DialogBarRight from '@/components/Dialogs/DialogBarRight.vue';
import DataFilter from '@/components/DataFilter/DataFilter.vue';

import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';

export default {
  name: 'DataTableControl',
  components: {
    DialogFullPage,
    DialogBarRight,
    DataFilter,
    ElButtonIcon,
  },
  props: {
    focusedElement: Object,
    formProperties: Object,
    heightType: {type: String, default: 'fixed'},
    paddingType: {type: String, default: 'padding-fixed'},
  },
  data() {
    return {
      isOpenDialog: false,
      focusedElementForm: null,
      isOpenFilter: false,
    }
  },
  computed: {
    isMountTable() { return (this.formProperties) ? true : false },
    tableName() { return (this.formProperties) ? this.formProperties.tableName : null },
    componentForm() {
      let componentForm = '';
      if (!this.formProperties?.tableName) return null;
      this.formProperties.tableName.split('-').forEach(item => {
        componentForm += item[0].toUpperCase() + item.slice(1);
      })
      return () => import(`@/views/TableForm/TableForm${componentForm}`);
    },
    isFilterActive() {
      let filterString = this.$store.getters[`DataTable/GET_FILTER_STRING`](this.formProperties?.tableName);
      return (filterString == '' || filterString == undefined) ? false : true;
    },
    isFocusedElement() { return (this.focusedElementForm && Object.keys(this.focusedElementForm).length != 0) ? true : false },
    isDialogName() { return (this.focusedElementForm == null) ? 'Добавление записи' : 'Редактирование записи'; }
  },
  watch: {
    focusedElement() { this.focusedElementForm = (Object.keys(this.focusedElement).length != 0) ? this.focusedElement : {} },
  },
  methods: {
    eventClickAdding() {
      this.focusedElementForm = null;
      this.isOpenDialog = true;
    },
    eventClickEditing() {
      this.isOpenDialog = true;
    },
    eventCloseDialog() {
      this.isOpenDialog = false;
      this.focusedElementForm= null;
    },
    eventActionAccept(option) {
      let sendOption = {
        tableName: this.formProperties.tableName,
      };
      Object.assign(sendOption, option);
      sendOption.values.id = (sendOption.actionName == 'editing' || sendOption.actionName == 'deleting') ? this.focusedElement.id : 'newId';
      console.log(sendOption);
      this.$store.commit(`DataTable/${sendOption.actionName.toUpperCase()}_LIST_DATA`, sendOption)
      this.eventCloseDialog();
    },
    eventActionCancel() {
      this.eventCloseDialog();
    },
    eventActionDeleting() {
      let sendOption = {
        actionName: 'deleting',
        values: Object.assign({}, this.focusedElement),
      }
      this.eventActionAccept(sendOption);
    }
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  &__title {
    color: white;
  }
  &__text {
    font-size: 1em;
    padding: 5px 0px;

    &_bold {
      text-indent: 10px;
      font-weight: bold;
    }
  }
}
::v-deep {
  .v-icon { margin-right: 0px; }
  .v-navigation-drawer--temporary {
    z-index: 9998;
  }
}
</style>