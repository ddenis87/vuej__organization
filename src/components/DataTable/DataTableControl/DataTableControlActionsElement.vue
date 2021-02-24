<template>
  <div class="data-table-control-actions-element">
    <el-button-icon icon="mdi-pencil" :disabled="!elementFocused" @click="eventOpenForm">Изменить</el-button-icon>
    <el-button-icon icon="mdi-folder-download-outline" :disabled="!elementFocused">Добавить в группу</el-button-icon>
    <el-button-icon icon="mdi-folder-upload-outline" :disabled="!elementFocused">Удалить из группы</el-button-icon>
    <el-button-icon :icon="(isMarkDeletedView) ? 'mdi-text-box-remove-outline' : 'mdi-text-box-remove-outline'" 
                    :disabled="!elementFocused" 
                    @click="eventActionMarkDeleting">{{ (isMarkDeletedView) ? 'Снять пометку на удаление' : 'Установить пометку на удаление'}}</el-button-icon>
  
    <dialog-full-page :is-dialog-name="`Редактирование записи ${(isMarkDeletedRecord) ? '(помечен на удаление)' : ''}`"
                      :is-dialog-show="isOpenDialog" 
                      @close-dialog="eventCloseDialog">
      <component :is="componentFormTable"
                 :focused-element="elementFocused"
                 @event-action-accept="eventActionAccept"
                 @event-action-cancel="eventActionCancel"></component>
    </dialog-full-page>
  </div>
</template>

<script>
import { DataTableControlActions } from  './DataTableControlActions.js';

export default {
  name: 'DataTableControlActionsElement',
  mixins: [
    DataTableControlActions,
  ],
  props: {
    isMarkDeletedView: { type: Boolean, default: false },
  },
  methods: {
    async eventActionMarkDeleting() {
      let sendOption = {
        tableName: this.tableName,
        recordId: this.elementFocused['id'],
      }
      let snackBar = {
        show: true,
      };
      await this.$store.dispatch('DataTable/REQUEST_DATA_DELETE', sendOption)
        .then(() => {
           snackBar.text = (this.isMarkDeletedRecord) ? 'Пометка на удаление снята' : 'Пометка на удаление установлена';
           snackBar.status = true;
         })
         .catch(() => {
           snackBar.text = 'Ошибка, изменения не сохранены';
           snackBar.status = false;
         })
         .finally(() => {
           this.$emit('event-mark-deleted', snackBar);
         })
    },
  }
}
</script>