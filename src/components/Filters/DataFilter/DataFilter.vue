<template>
  <div class="data-filter">
    <div class="data-filter__body">
      <data-filter-item v-for="(item, index) in listField"
                        :key="index"
                        :properties="item"
                        @input-filter="inputFilter"></data-filter-item>
    </div>
    <div class="data-filter__action">
      <el-button class="tabspace-end"
                 @click="acceptFilter"
                 @keydown="acceptFilter">Применить</el-button>
    </div>
  </div>
</template>

<script>
import DataFilterItem from './DataFilterItem.vue';
import ElButton from '@/components/Elements/ElButton.vue';
export default {
  name: 'DataFilter',
  components: {
    DataFilterItem,
    ElButton,
  },
  props: {
    tableName: { type: String, default: null, },
    listException: { type: Array, default() { return ['id', 'is_deleted', 'is_group'] } },
  },
  data() {
    return {
      dataFilter: {},
    }
  },
  computed: {
    listField() {
      if (!this.tableName) return null;
      let listField = this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName);
      let returnListField = [];
      Object.keys(listField).forEach(key => {
        if (!this.listException.includes(key)) 
          returnListField.push(Object.assign({key: key}, listField[key]))
      });
      return returnListField;
    },
  },
  methods: {
    acceptFilter() {
      console.log()
    },
    inputFilter(value) {
      console.log(value);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/variables.scss';
@import './DataFilter.scss';

.data-filter {
  display: grid;
  grid-template-areas: "data-filter__body" "data-filter__action";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 48px;
  padding: 8px 0px;
  padding-left: 10px;
  height: calc(100vh - 64px);
  overflow: hidden;
  &__body {
    grid-area: data-filter__body;
    overflow: hidden;
    overflow-y: scroll;
    padding-right: 8px;
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
  &__action {
    grid-area: data-filter__action;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    padding: 0px 16px;
  }
}
</style>