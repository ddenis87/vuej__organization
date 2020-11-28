<template>
  <div class="table-multi">
    <div class="table-multi-head">
      <table-multi-head :list-data="listHeader" 
                        :style="fieldsTemplate"></table-multi-head>
    </div>
    <div class="table-multi-body">
      <table-multi-body :list-data="listBody"
                        :list-data-header="listHeader"
                        :list-style="fieldsTemplate">
        <template v-for="item in listHeader" #[item.key]="itemValue">
          <slot :name="`body.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
        </template>
        
        <template v-slot:action="activeValue">
          <slot name="action" v-bind:activeValue="activeValue.activeValue"></slot>
        </template>
      </table-multi-body>
    </div>
    <!-- <div class="table-multi-footer">
      123
    </div> -->
  </div>
</template>

<script>
import TableMultiHead from './TableMultiHead.vue';
import TableMultiBody from './TableMultiBody.vue';

export default {
  name: 'TableMulti',
  components: { 
    TableMultiHead,
    TableMultiBody, 
  },
  props: {
    tableProperties: Object,
  },
  computed: {
    listHeader() {
      let headerItems = new Set();
      let headerFilter = [];
      let headerList = this.$store.getters[this.tableProperties.header.state.getterData];
      for (let i = 1; i < this.tableProperties.fieldsTemplate.length; i++) {
        this.tableProperties.fieldsTemplate[i].forEach(item => headerItems.add(item));
      }
      if (headerList.length != 0 && headerItems.size != 0) {
        headerItems.forEach(item => headerFilter.push(headerList.find(mitem => mitem.key == item)));
        if (headerFilter.length != 0) 
          headerFilter.forEach(item => item.style = `grid-area: ${item.key}`);
      }
      return headerFilter;
    },
    listBody() { return this.$store.getters[this.tableProperties.body.state.getterData]; },

    fieldsTemplate() {
      let fieldsTemplate = { 'grid-template-areas': '', 'grid-template-columns': '' };
      this.tableProperties.fieldsTemplate[0].forEach(item => fieldsTemplate['grid-template-columns'] += (+item) ? `${item}px ` : 'minmax(100px, 100vw) ');
      for (let i = 1; i < this.tableProperties.fieldsTemplate.length; i++) fieldsTemplate['grid-template-areas'] += ` "${this.tableProperties.fieldsTemplate[i].join(' ')}"`;
      // console.log(fieldsTemplate);
      return fieldsTemplate;
    }
  },
  created() {
    this.$store.dispatch(this.tableProperties.header.state.dispatchInit);
  },
}
</script>

<style lang="scss" scoped>
.table-multi {
  background-color: #fff;
  color: rgba(0,0,0,.87);
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);

  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  overflow-x: auto;
  overflow-y: auto;
  height: 100%;
  &-head {
    position: sticky;
    top: 0px;
    display: inline-flex;
    background-color: #fff;
    // border: thin solid blue;
  }
  &-body {
    display: inline-flex;
    // border: thin solid orange;
  }
  &-footer {
    position: sticky;
    bottom: 0px;
    height: 25px;
    border: thin solid orange;
  }
}
</style>