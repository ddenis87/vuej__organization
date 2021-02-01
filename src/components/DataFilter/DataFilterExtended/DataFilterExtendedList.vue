<template>
  <div class="list">
    <div class="list-control">
      <v-btn color="blue darken-1" dark depressed small height="26" @click="deleteField">Удалить</v-btn>
    </div>
    <div class="list-box">
      <div class="list-box__list">
        <data-table-lazy :headers="tableHeaders"
                         :items="tableItems"
                         @focused-row="focusedRow"></data-table-lazy>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import DataTableLazy from '@/components/DataTable/DataTableLazy/DataTableLazy.vue';

export default {
  name: 'DataFilterExtendedList',
  components: {
    DataTableLazy,
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
      // tableItems: [
      //   {key: 'bk', label: 'БК', compare: 'Равно', text: 'qwe', type: 'field'},
      //   {key: 'inn', label: 'ИНН', compare: 'Равно', text: '21312', type: 'String'},
      //   {key: 'budget_level', label: 'Уровень бюджета', compare: 'Равно', text: 'zxc', type: 'choice'},
      // ],
    }
  },
  methods: {
    focusedRow(option) {
      console.log(option);
      this.fieldSelected = option;
    },
    deleteField() {
      if ('key' in this.fieldSelected)
        this.tableItems.splice( this.tableItems.findIndex(item => item.key == this.fieldSelected.key) ,1);
      this.fieldSelected = {};
    }
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