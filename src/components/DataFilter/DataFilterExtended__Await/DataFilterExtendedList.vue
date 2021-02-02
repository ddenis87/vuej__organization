<template>
  <div class="list">
    <div class="list-control">
      <v-btn color="blue darken-1" dark depressed small height="26" @click="fieldDelete">Удалить</v-btn>
    </div>
    <div class="list-box">
      <div class="list-box__list">
        <data-table-lazy :headers="tableHeaders"
                         :items="tableItems"
                         @focused-row="focusedRow">
          <template v-slot:compare>
            <!-- {{ computedSlotValue(slotValue.value) }} -->
            <el-static-field-choice-compare></el-static-field-choice-compare>
          </template>
        </data-table-lazy>
      </div>
      
    </div>
    
  </div>
</template>

<script>

import DataTableLazy from '@/components/DataTable/DataTableLazy/DataTableLazy.vue';
import ElStaticFieldChoiceCompare from '@/components/Elements/ElStatic/ElStaticFieldChoiceCompare.vue';

export default {
  name: 'DataFilterExtendedList',
  components: {
    DataTableLazy,
    ElStaticFieldChoiceCompare,
  },
  props: {
    tableItems: {type: Array, default() { return [] }},
  },
  data() {
    return {
      fieldSelected: Object,
      tableHeaders: [
        {key: 'label', text: 'Поле', 'position_in_template': 'grid-area: label', width: [300,]},
        {key: 'compare', text: 'Вид сравнения', 'position_in_template': 'grid-area: compare', width: [200, 200]},
        {key: 'text', text: 'Значение', 'position_in_template': 'grid-area: text', width: [200,]},
      ],
    }
  },
  computed: {
    
  },
  methods: {
    focusedRow(option) {
      console.log(option);
      this.fieldSelected = option;
    },
    fieldDelete() {
      this.$emit('field-delete', this.fieldSelected);
      this.fieldSelected = {};
    },
    computedSlotValue(option) {
      console.log(option);
      return '123455';
    },
  },
}
</script>

<style lang="scss" scoped>
@import './DataFilterExtended.scss';
.list {
  grid-area: list;
  display: grid;
  grid-template-areas: "tree-control" "tree-box";
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr;
  
  height: calc(100vh - 105px);
  &-control {
    grid-area: tree-control;
    display: flex;
    justify-content: left;
    align-items: center;
    // padding-left: 16px;
    // border: thin solid green;
  }
  &-box {
    grid-area: tree-box;
    overflow: auto;
    border: thin solid rgba(0,0,0,.12);

    &::-webkit-scrollbar {
      width: $scrollWidth;
      height: $scrollHeight;
      border-radius: $scrollBorderRadius;
      &-thumb {
        border-radius: $scrollThumbBorderRadius;
        background-color: $scrollThumbBackgroundColor;
      }
    }
  }
}
</style>