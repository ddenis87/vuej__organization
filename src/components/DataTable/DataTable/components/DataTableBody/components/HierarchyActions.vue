<template>
  <div class="body-column__group">
    <div class="group-item">
      <data-table-btn-icon class="action-btn" v-if="isGroup" @click="eventClickHierarchy">mdi-menu-right</data-table-btn-icon>
    </div>
    <div class="group-item">
      <v-icon small v-if="isGroup">mdi-folder</v-icon>
    </div>
    <div class="group-item">
      <v-icon small v-if="!isGroup">mdi-window-minimize</v-icon>
    </div>
    
    
    
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
  methods: {
    eventClickHierarchy(event) {
      // console.log(event);
      event.target.closest('.action-btn').classList.toggle('action-btn_action');
      this.$emit('toggle-hierarchy');
    }
  }
}
</script>

<style lang="scss" scoped>
.body-column__group {
  grid-area: group;
  display: flex;
  justify-content: flex-end;
  // gap: 3px;
  align-items: flex-start;
  .action-btn {
    margin-right: 3px;
    &_action {
      transform: rotate(90deg);
    }
  }
}
</style>