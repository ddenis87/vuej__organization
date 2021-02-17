<template>
  <div>
    <el-button-icon icon="mdi-plus" :disabled="!isMountTable" @click="eventClickAdding">Добавить</el-button-icon>
    <el-button-icon icon="mdi-table-row-plus-before" :disabled="!isMountTable" @click="eventClickAddingTable">Добавить строку</el-button-icon>
    <el-button-icon icon="mdi-pencil" :disabled="!isFocusedElement" @click="eventClickEditing">Изменить</el-button-icon>
    <v-divider vertical></v-divider>
    <el-button-icon :icon="(isMarkDeleted) ? 'mdi-text-box-remove-outline' : 'mdi-text-box-remove-outline'" 
                    :disabled="!isFocusedElement" 
                    @click="eventActionMarkDeleting">{{ (isMarkDeletedRecord) ? 'Снять пометку на удаление' : 'Установить пометку на удаление'}}</el-button-icon>
    <el-button-icon icon="mdi-delete-variant"
                    :icon-color="(isMarkDeleted) ? 'blue' : ''"
                    @click="eventActionShowMarkDeleting">{{ (isMarkDeleted) ? 'Выйти из корзины' : 'Показать помеченные на удаление' }}</el-button-icon>
  
    <dialog-full-page :is-dialog-name="`${isDialogName} ${(isMarkDeletedRecord) ? '(помечен на удаление)' : ''}`" 
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
import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';
export default {
  name: 'DataTableControlActions',
  components: {
    ElButtonIcon,
  },
  props: {
    isMountTable: { type: Boolean, default: false },
    focusedElementForm: null,
  },
  computed: {
    isFocusedElement() { return (this.focusedElementForm && Object.keys(this.focusedElementForm).length != 0) ? true : false },
  },
  mounted: {
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
  },
}
</script>