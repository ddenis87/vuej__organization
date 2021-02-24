<template>
  <div class="data-table-control-actions-table">
    <el-button-icon icon="mdi-plus" :disabled="!isMountTable" @click="eventOpenForm">Добавить</el-button-icon>
    <el-button-icon icon="mdi-table-row-plus-after" :disabled="!isMountTable" @click="eventClickAddingTable">Добавить строку</el-button-icon>
    <el-button-icon icon="mdi-folder-plus-outline" :disabled="!isMountTable">Добавить группу</el-button-icon>
    
    <dialog-full-page :is-dialog-name="`Добавление записи`" 
                      :is-dialog-show="isOpenDialog" 
                      @close-dialog="eventCloseDialog">
      <component :is="componentFormTable" 
                 @event-action-accept="eventActionAccept"
                 @event-action-cancel="eventActionCancel"></component>
    </dialog-full-page>
  </div>
</template>

<script>
import { DataTableControlActions } from  './DataTableControlActions.js';

export default {
  name: 'DataTableControlActionsTable',
  mixins: [
    DataTableControlActions,
  ],
  props: {
    isMountTable: { type: Boolean, default: false },
  },
  methods: {
    eventClickAddingTable() {
      console.log(this.elementFocused);
      let sendOption = {
        tableName: this.tableName,
        recordId: (this.elementFocused) ? this.elementFocused.id : -1,
      }
      console.log(sendOption);
      this.$store.commit('DataTable/DATA_STORE_ADDING_ELEMENT', sendOption);
    },
  },
}
</script>

<style lang="scss" scoped>
.data-table-control-actions-table {
  margin-left: -15px;
}
</style>