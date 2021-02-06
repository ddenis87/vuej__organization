<template>
  <div class="filter">
    <div class="filter__title">
      <v-subheader>{{ tableNameDescription }}</v-subheader>
    </div>
    <div class="filter__sub-title">
      <data-filter-extended-item :is-title="true"
                                 :input-title="['Условие', 'Значение']"></data-filter-extended-item>
    </div>
    <div class="filter__body">
      <data-filter-extended-item v-for="item in filterList"
                                 :key="item.key"
                                 :input-properties="item"
                                 @input-filter="inputFilter"></data-filter-extended-item>
    </div>
    <div class="filter__action">
      <el-button @click="acceptFilter">Применить</el-button>
    </div>
  </div>
</template>

<script>
import DataFilterExtendedItem from './DataFilterExtendedItem.vue';
import ElButton from '@/components/Elements/ElButton.vue';
export default {
  name: 'DataFilterExtended',
  components: {
    DataFilterExtendedItem,
    ElButton,
  },
  props: {
    tableName: { type: String, default: null, },
    listException: { type: Array, default() { return ['id', 'is_deleted'] } },
  },
  data() {
    return {
      valueFilterObject: {},
    }
  },
  computed: {
    tableNameDescription() { return (!this.tableName) ? '' : this.$store.getters[`DataTable/GET_DESCRIPTION`](this.tableName); },
    filterList() {
      let filterListArray = [];
      let filterList = this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName);
      for (let key of Object.keys(filterList))
        if (!this.listException.includes(key))
          filterListArray.push(Object.assign({key: key}, filterList[key]));
      // console.log(filterListArray);
      return filterListArray;
    },
  },
  methods: {
    inputFilter(option) {
      // console.log(option);
      
      if (option.key == 'is_deleted') { return; }
      if (option.value == null) {
        // if (this.valueFilterObject)
        // console.log('delete');
        if (option.key in this.valueFilterObject) delete this.valueFilterObject[option.key];

        return;
      }
      this.valueFilterObject[option.key] = option.value;
      // console.log(this.valueFilterObject);
    },
    acceptFilter() {
      
      let filterString = '';
      for(let value of Object.values(this.valueFilterObject)) {
        filterString += value;
      }
      
      if (filterString == '') this.$store.commit('DataTable/SET_FILTER_EXTENDED_CLEAR', { tableName: this.tableName })
      else this.$store.commit('DataTable/SET_FILTER_EXTENDED', {
        tableName: this.tableName,
        value: filterString,
      })
      this.$store.commit('DataTable/SET_DATA_CLEAR', { tableName: this.tableName });
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
      this.$emit('accept');
      // console.log(filterString);
    },
  }
}
</script>

<style lang="scss" scoped>
@import './DataFilterExtended.scss';
.filter {
  display: grid;
  grid-template-areas: "filter__title" "filter__sub-title" "filter__body" "filter__action";
  grid-template-columns: 1fr;
  grid-template-rows: 48px 48px 1fr 48px;
  padding: 8px 0px;
  padding-left: 10px;
  height: calc(100vh - 64px);
  overflow: hidden;
  &__title {
    grid-area: filter__title;
    text-transform: uppercase;
    overflow: hidden;
  }
  &__sub-title {
    grid-area: filter__sub-title;
    padding: 0px 8px;
    margin-top: -10px;
    padding-right: 10px;
    border-bottom: thin solid rgba(0,0,0,.12);    
    overflow: hidden;
  }

  &__body {
    grid-area: filter__body;
    padding: 0px 8px;
    padding-top: 20px;
    padding-right: 10px;
    border-bottom: thin solid rgba(0,0,0,.12);  
    overflow: hidden;
    overflow-y: scroll;
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
    grid-area: filter__action;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    padding: 0px 16px;
  }
}
</style>