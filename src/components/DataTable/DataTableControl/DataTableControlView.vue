<template>
  <div class="data-table-control-view">
    <!-- <el-button-icon icon="mdi-file-tree"
                    :icon-color="(isHierarchy) ? 'blue' : ''"
                    @click="$emit('toggle-hierarchy')">Иерархический вид</el-button-icon> -->
    <el-button-icon :icon="(this.typeHeight[typeHeightNumber] == 'fixed') ? 'mdi-view-sequential' : (this.typeHeight[typeHeightNumber] == 'dense') ? 'mdi-view-sequential-outline' : 'mdi-view-agenda'" 
                    :disabled="(!isMountTable)"
                    @click="$emit('toggle-type-row')">{{ (typeHeight[typeHeightNumber] == 'fixed') ? 'Строки сжато' : (typeHeight[typeHeightNumber] == 'dense') ? 'Строки свободно' : 'Строки фиксировано' }}</el-button-icon>
    <el-button-icon icon="mdi-view-split-horizontal"
                    :icon-color="(isExpansion) ? 'blue' : ''"
                    :disabled="(!isMountTable || isMultiline)"
                    @click="$emit('toggle-expansion')">Раскрытие строк</el-button-icon>
    <!-- <v-divider vertical></v-divider> -->
    <el-button-icon :icon="(typeColumn == 'fixed') ? 'mdi-view-parallel-outline' : 'mdi-view-parallel'" 
                    :disabled="!isMountTable"
                    @click="$emit('toggle-type-column')">{{ (typeColumn == 'fixed') ? 'Столбцы сжато' : 'Столбцы фиксировано' }}</el-button-icon>
    <!-- <v-divider vertical></v-divider> -->
    <el-button-icon icon="mdi-page-layout-footer"
                    :icon-color="(isFooter) ? 'blue' : ''"
                    :disabled="!isMountTable"
                    @click="$emit('toggle-footer')">Итоги</el-button-icon>
    <!-- <v-divider vertical></v-divider> -->
    <el-button-icon icon="mdi-view-quilt"
                    :icon-color="(isMultiline) ? 'blue' : ''"
                    @click="$emit('toggle-multiline')">Многострочность</el-button-icon>
    <!-- <v-divider vertical></v-divider> -->
  </div>
</template>

<script>
import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';

export default {
  name: 'DataTableControlView',
  components: {
    ElButtonIcon,
  },
  props: {
    typeHeightNumber: { type: Number, default: 0 },
    typeColumn: { type: String, default: 'fixed' },
    isFooter: { type: Boolean, default: false },
    isExpansion: { type: Boolean, default: false },
    isMultiline: { type: Boolean, default: false },
    isHierarchy: { type: Boolean, default: false },
    isMountTable: { type: Boolean, default: false },
  },
  data() {
    return {
      typeHeight: ['fixed', 'dense', 'auto'],
    }
  },
}
</script>