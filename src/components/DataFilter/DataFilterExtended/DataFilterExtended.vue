<template>
  <div class="data-filter-extended">
    <data-filter-extended-tree :table-name="tableName"
                               @selected-field="selectedField"></data-filter-extended-tree> <!-- css class tree -->

    <data-filter-extended-list :table-items="tableItems"></data-filter-extended-list> <!-- css class list -->
    
    <data-filter-extended-control></data-filter-extended-control> <!-- css class control -->
  </div>
</template>

<script>
import DataFilterExtendedTree from './DataFilterExtendedTree.vue';
import DataFilterExtendedList from './DataFilterExtendedList.vue';
import DataFilterExtendedControl from './DataFilterExtendedControl.vue';

export default {
  name: 'DataFilterExtended',
  components: {
    DataFilterExtendedTree,
    DataFilterExtendedList,
    DataFilterExtendedControl,
  },
  props: {
    tableName: { type: String, default: null, },
  },
  data() {
    return {
      tableItems: [
        {key: 'bk', label: 'БК', compare: 'Равно', text: 'qwe', type: 'field'},
        {key: 'inn', label: 'ИНН', compare: 'Равно', text: '21312', type: 'String'},
        {key: 'budget_level', label: 'Уровень бюджета', compare: 'Равно', text: 'zxc', type: 'choice'},
      ],
    }
  },
  methods: {
    selectedField() {},
  },
}
</script>

<style lang="scss" scoped>
@import './DataFilterExtended.scss';

.data-filter-extended {
  display: grid;
  grid-template-areas: "tree list" "control control";
  grid-template-columns: 290px 1fr;
  grid-template-rows: 1fr 40px;
  width: 100%;
  height: calc(100vh - 65px);
  column-gap: 16px;
}
</style>