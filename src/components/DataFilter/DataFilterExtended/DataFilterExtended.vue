<template>
  <div class="data-filter-extended" @keydown.stop="eventKeydown">
    <div class="data-filter-extended__body">
      <data-filter-extended-item v-for="item in filterList"
                                 :key="item.key"
                                 :input-properties="item"
                                 @input-filter="inputFilter"
                                 @keydown.stop="eventKeydown"
                                 @next-element="nextElement"></data-filter-extended-item>
    </div>
    <div class="data-filter-extended__action">
      <el-button class="tabspace-end" @click="acceptFilter" @keydown.stop="eventKeydownAcceptFilter">Применить</el-button>
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
    isOpen: { type: Boolean, default: false, },
    listException: { type: Array, default() { return ['id', 'is_deleted', 'is_group', 'parent'] } },
  },
  data() {
    return {
      valueFilterObject: {},
    }
  },
  computed: {
    // tableNameDescription() { return (!this.tableName) ? '' : this.$store.getters[`DataTable/GET_DESCRIPTION`](this.tableName); },
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
  watch: {
    isOpen() {
      if (this.isOpen == true) {
        // console.log(document.activeElement);
        // console.log(document.querySelector('.data-filter-extended .data-filter-extended__body').firstChild.querySelector('.item-compare input'));
        setTimeout(() => {
          document.querySelector('.data-filter-extended .data-filter-extended__body').firstChild.querySelector('.item-compare input').focus();
        }, 100);
      }
    },
  },
  methods: {
    nextElement(target) {
      // console.log(target.nextElementSibling.querySelector('.item-data .el-field__item input'));
      // console.log(target.nextElementSibling);
      if (target.nextElementSibling == null) {
        target.closest('.data-filter-extended').querySelector('.tabspace-end button').focus();
        return;
      }
      console.log(target.nextElementSibling);
      target.nextElementSibling.querySelector('.item .item-compare .el-field__item input').focus();
      // target.nextElementSibling.focus();
    },
    eventKeydownAcceptFilter(event) {
      if (event.key == 'Tab' && event.shiftKey == false) {
        event.preventDefault();
        // console.log(event);
        let startElement = event.target.closest('.data-filter-extended').querySelector('.data-filter-extended__body').firstChild.querySelector('.item-compare input');
        startElement.focus();
      }
      
    },
    eventKeydown(event) {
      console.log(event);
      console.log(document.activeElement);
    },
    inputFilter(option) {
      if (option.key == 'is_deleted') { return; }
      if (option.value == null) {
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
      this.$store.commit('DataTable/CLEAR_DATA', { tableName: this.tableName });
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
      this.$emit('accept');
      // console.log(filterString);
    },
  }
}
</script>

<style lang="scss" scoped>
@import './DataFilterExtended.scss';
.data-filter-extended {
  display: grid;
  grid-template-areas: "data-filter-extended__body" "data-filter-extended__action";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 48px;
  padding: 8px 0px;
  padding-left: 10px;
  height: calc(100vh - 64px);
  overflow: hidden;

  &__body {
    grid-area: data-filter-extended__body;
    padding: 0px 8px;
    padding-top: 10px;
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
    grid-area: data-filter-extended__action;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    padding: 0px 16px;
  }
}
</style>