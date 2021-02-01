<template>
  <div class="data-table-control">
    <v-toolbar height="40" flat>
      <el-button-icon icon="mdi-plus" :disabled="!isMountTable" @click="eventClickAdding">Добавить</el-button-icon>
      <el-button-icon icon="mdi-pencil" :disabled="!isFocusedElement" @click="eventClickEditing">Изменить</el-button-icon>
      <v-divider vertical></v-divider>
      <el-button-icon :icon="(isMarkDeleted) ? 'mdi-text-box-remove-outline' : 'mdi-text-box-remove-outline'" 
                      :disabled="!isFocusedElement" 
                      @click="eventActionMarkDeleting">{{ (isMarkDeletedRecord) ? 'Снять пометку на удаление' : 'Установить пометку на удаление'}}</el-button-icon>
      <el-button-icon icon="mdi-delete-variant"
                      :icon-color="(isMarkDeleted) ? 'blue' : ''"
                      @click="eventActionShowMarkDeleting">{{ (isMarkDeleted) ? 'Скрыть помеченные на удаление' : 'Показать помеченные на удаление' }}</el-button-icon>
      <v-spacer></v-spacer>

      <el-button-icon :icon="(this.typeHeight[typeHeightNumber] == 'fixed') ? 'mdi-view-sequential' : (this.typeHeight[typeHeightNumber] == 'dense') ? 'mdi-view-sequential-outline' : 'mdi-view-agenda'" 
                      :disabled="(!isMountTable)"
                      @click="$emit('toggle-type-row')">{{ (typeHeight[typeHeightNumber] == 'fixed') ? 'Строки сжато' : (typeHeight[typeHeightNumber] == 'dense') ? 'Строки свободно' : 'Строки фиксировано' }}</el-button-icon>
      <el-button-icon icon="mdi-view-split-horizontal"
                      :icon-color="(isExpansion) ? 'blue' : ''"
                      :disabled="(!isMountTable || isMultiline)"
                      @click="$emit('toggle-expansion')">Раскрытие строк</el-button-icon>
      <v-divider vertical></v-divider>
      <el-button-icon :icon="(typeColumn == 'fixed') ? 'mdi-view-parallel-outline' : 'mdi-view-parallel'" 
                      :disabled="!isMountTable"
                      @click="$emit('toggle-type-column')">{{ (typeColumn == 'fixed') ? 'Столбцы сжато' : 'Столбцы фиксировано' }}</el-button-icon>
      <v-divider vertical></v-divider>
      <el-button-icon icon="mdi-page-layout-footer"
                      :icon-color="(isFooter) ? 'blue' : ''"
                      :disabled="!isMountTable"
                      @click="$emit('toggle-footer')">Итоги</el-button-icon>
      <v-divider vertical></v-divider>
      <el-button-icon icon="mdi-view-quilt"
                      :icon-color="(isMultiline) ? 'blue' : ''"
                      @click="$emit('toggle-multiline')">Многострочность</el-button-icon>
      <v-divider vertical></v-divider>
      
      <el-button-icon icon="mdi-filter-outline" 
                      :icon-color="(isFilterActive) ? 'blue' : ''" 
                      :disabled="!isMountTable"
                      @click="isOpenFilter = !isOpenFilter">Фильтр</el-button-icon>
      <el-button-icon icon="mdi-filter-variant" 
                      
                      :disabled="!isMountTable"
                      @click="isOpenFilterExtended = !isOpenFilterExtended">Расширенный фильтр</el-button-icon>
    </v-toolbar>
    
    <dialog-bar-right is-dialog-name="Фильтры" 
                      :is-dialog-show="isOpenFilter" 
                      @close-dialog="isOpenFilter = false">
      <!-- <data-filter :table-name="tableName" 
                   @accept="isOpenFilter = false"
                   @close="isOpenFilter = false"></data-filter> -->
    </dialog-bar-right>
    
    <dialog-full-page is-dialog-name="Расширенный фильтр"
                      :is-dialog-show="isOpenFilterExtended"
                      @close-dialog="isOpenFilterExtended = false">
      <component :is="componentFilterExtended" :tableName="tableName"></component>
    </dialog-full-page>

    <dialog-full-page :is-dialog-name="`${isDialogName} ${(isMarkDeletedRecord) ? '(помечен на удаление)' : ''}`" 
                      :is-dialog-show="isOpenDialog" 
                      @close-dialog="eventCloseDialog">
      <component :is="componentForm" 
                 :focused-element="focusedElementForm"
                 @event-action-accept="eventActionAccept"
                 @event-action-cancel="eventActionCancel"></component>
    </dialog-full-page>

    <v-snackbar light
                elevation="4"
                v-model="snackBar.show">
      <div class="snack">
        <v-icon small color="green darken-3" v-if="snackBar.status">mdi-check</v-icon>
        <v-icon small color="red darken-4" v-else>mdi-close</v-icon>
        {{ snackBar.text }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import DialogFullPage from '@/components/Dialogs/DialogFullPage.vue';
import DialogBarRight from '@/components/Dialogs/DialogBarRight.vue';
import DataFilter from '@/components/DataFilter/DataFilter.vue';
// import DataFilterExtended from '@/components/DataFilter/DataFilterExtended/DataFilterExtended.vue';


import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';

export default {
  name: 'DataTableControl',
  components: {
    DialogFullPage,
    DialogBarRight,
    DataFilter,
    // DataFilterExtended,
    ElButtonIcon,
  },
  props: {
    focusedElement: null,
    formProperties: Object,

    typeHeightNumber: { type: Number, default: 0 },
    typeColumn: { type: String, default: 'fixed' },
    isFooter: { type: Boolean, default: false },
    isExpansion: { type: Boolean, default: false },
    isMultiline: { type: Boolean, default: false },
  },
  data() {
    return {
      focusedElementForm: null,
      isOpenDialog: false,
      isOpenFilter: false,
      isOpenFilterExtended: false,
      isMarkDeleted: false,
      typeHeight: ['fixed', 'dense', 'auto'],

      snackBar: {
        show: false,
        text: '',
        status: false,
      },
      
    }
  },
  computed: {
    isMarkDeletedRecord() { return (this.focusedElementForm) ? !!this.focusedElementForm.is_deleted : false; },
    isMountTable() { return (this.formProperties) ? true : false },
    tableName() { return (this.formProperties) ? this.formProperties.tableName : null },
    componentForm() {
      let componentForm = '';
      if (!this.formProperties?.tableName) return null;
      this.formProperties.tableName.split('-').forEach(item => {
        componentForm += item[0].toUpperCase() + item.slice(1);
      })
      return () => import(`@/components/TheTableForm/TheTableForm${componentForm}`);
    },
    componentFilterExtended() {
      if (!this.formProperties?.tableName) return null;
      return () => import('@/components/DataFilter/DataFilterExtended/DataFilterExtended.vue')
    },
    isFilterActive() {
      return (this.formProperties) ? (this.$store.getters[`DataTable/GET_FILTER_STRING`](this.formProperties.tableName) == '') ? false : true : false;
    },
    isFocusedElement() { return (this.focusedElementForm && Object.keys(this.focusedElementForm).length != 0) ? true : false },
    isDialogName() { return (this.focusedElementForm == null) ? 'Добавление записи' : 'Редактирование записи'; }
  },
  watch: {
    focusedElement() { if (typeof(this.focusedElement) == 'object') this.focusedElementForm = (Object.keys(this.focusedElement).length != 0) ? this.focusedElement : {} },
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
    async eventActionMarkDeleting() {
      let sendOption = {
        tableName: this.formProperties.tableName,
        recordId: this.focusedElement['id'],
      }
      this.focusedElementForm = null;
      await this.$store.dispatch('DataTable/REQUEST_DATA_DELETE', sendOption)
        .then(() => {
          this.snackBar.text = (this.isMarkDeleted) ? 'Пометка на удаление снята' : 'Пометка на удаление установлена';
          this.snackBar.show = true;
          this.snackBar.status = true;
          setTimeout(() => { this.snackBar.show = false; this.snackBar.text = '' }, 4000);
         })
         .catch(() => {
            this.snackBar.text = 'Ошибка, изменения не сохранены';
            this.snackBar.show = true;
            this.snackBar.status = false;
            setTimeout(() => { this.snackBar.show = false; this.snackBar.text = '' }, 4000);
         });
      
    },
    eventActionShowMarkDeleting() {
      this.isMarkDeleted = !this.isMarkDeleted;
      this.$store.commit('DataTable/TOGGLE_FILTER_DEFAULT_IS_DELETED', {
        tableName: this.formProperties.tableName,
        value: this.isMarkDeleted,
      });
      this.focusedElementForm = null;
      this.$store.dispatch('DataTable/REQUEST_DATA', {tableName: this.formProperties.tableName});
    },
  },
}
</script>

<style lang="scss" scoped>
.data-table-control {
  .snack {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
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