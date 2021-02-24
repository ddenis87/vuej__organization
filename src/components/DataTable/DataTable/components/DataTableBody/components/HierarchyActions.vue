<template>
  <div>
    <data-table-btn-icon v-if="isGroup">mdi-menu-right</data-table-btn-icon>
    <data-table-btn-icon v-if="isGroup">mdi-folder</data-table-btn-icon>
    <data-table-btn-icon v-if="!isGroup">mdi-window-minimize</data-table-btn-icon>
  </div>
</template>

<script>
import DataTableBtnIcon from '../../DataTableBtnIcon.vue';

export default {
  name: 'HierarchyActions',
  components: {
    DataTableBtnIcon,
  },
  props: {
    itemRow: { type: Object, default() { return null } },
  },
  computed: {
    isGroup() {
      // console.log(this.itemRow);
      return ('is_group' in this.itemRow) ? this.itemRow.is_group : false;
    },
  },
}
</script>