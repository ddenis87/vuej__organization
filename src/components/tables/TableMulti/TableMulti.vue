<template>
  <div class="table-multi" id="table-multi">
    
    <div class="table-multi-head">
      
      <table-multi-head :list-data="listHeader" 
                        :style="fieldsTemplate"></table-multi-head>
      <v-progress-linear class="table-multi-progress" color="blue" indeterminate absolute bottom v-if="isShowProgressBar"></v-progress-linear>
    </div>
    
    <div class="table-multi-body">
      <table-multi-body :list-data="listBody"
                        :list-data-header="listHeader"
                        :list-style="fieldsTemplate"
                        :row-count="tableProperties.fieldsTemplate.length - 1">
        <template v-for="item in listHeader" #[item.key]="itemValue">
          <slot :name="`body.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
        </template>
        
        <template v-slot:action="activeValue">
          <slot name="action" v-bind:activeValue="activeValue.activeValue"></slot>
        </template>
      </table-multi-body>
      <v-overlay :absolute="true" :value="isShowProgressBar"></v-overlay>
    </div>
    <div id="boot-anchor"></div>
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
    isShowProgressBar() {
      if (!this.$store.getters[this.tableProperties.state.progress]) this.parentElement.addEventListener('scroll', this.scrollBody);
      return this.$store.getters[this.tableProperties.state.progress];
    },
    listHeader() {
      let headerItems = new Set();
      let headerFilter = [];
      let headerList = this.$store.getters[this.tableProperties.header.state.getterData];
      for (let i = 1; i < this.tableProperties.fieldsTemplate.length; i++) {
        this.tableProperties.fieldsTemplate[i].forEach(item => headerItems.add(item));
      }
      if (headerList.length != 0 && headerItems.size != 0) {
        headerItems.delete('action_box');
        headerItems.forEach(item => headerFilter.push(headerList.find(mitem => mitem.key == item)));
        if (headerFilter.length != 0) {
          for (let i = 0; i < headerFilter.length; i++) {
            headerFilter[i].style = `grid-area: ${headerFilter[i].key}; `;
            if ('fieldsFixed' in this.tableProperties && this.tableProperties.fieldsFixed.includes(headerFilter[i].key)) {
              // console.log(this.tableProperties.fieldsTemplate[0]);
              let shiftLeft = (this.tableProperties.fieldsTemplate[0][i - 1]) ? +this.tableProperties.fieldsTemplate[0][i - 1][0] : 0;
              console.log(this.tableProperties.fieldsTemplate[0][i][0]);
              headerFilter[i].style += `position: sticky; left: ${shiftLeft}px; `;
              // headerFilter[i].style += (i == this.tableProperties.fieldsFixed.length - 1) ? 
              //   'background-image: linear-gradient(90deg, white 95%, rgba(0,0,0,0) 100%); ' : 
              //     'background-color: white; ';
            }
          }
        }
      }
      // console.log(headerFilter);
      return headerFilter;
    },
    listBody() { return this.$store.getters[this.tableProperties.body.state.getterData]; },

    fieldsTemplate() {
      let fieldsTemplateBase = [].concat(this.tableProperties.fieldsTemplate);
      let fieldsTemplate = { 'grid-template-areas': '', 'grid-template-columns': '' };
      let minWidth = 100;
      for (let i = 1; i < fieldsTemplateBase.length; i++) fieldsTemplateBase[i].push('action_box');

      // fieldsTemplateBase[0].forEach(item => fieldsTemplate['grid-template-columns'] += (+item) ? `${item}px ` : 'minmax(100px, 100vw) ');

      fieldsTemplateBase[0].forEach(item => {
        if (Array.isArray(item)) {
          fieldsTemplate['grid-template-columns'] += `minmax(${(+item[0]) ? +item[0] : minWidth}px, ${(+item[1]) ? item[1] + 'px' : '100vw'}) `;
        } else {
          fieldsTemplate['grid-template-columns'] += (+item) ? `${item}px ` : 'auto ';
        }
      });

      fieldsTemplate['grid-template-columns'] += 'repeat(auto-fit, 0px) '; // For action button
      for (let i = 1; i < fieldsTemplateBase.length; i++) fieldsTemplate['grid-template-areas'] += ` "${fieldsTemplateBase[i].join(' ')}"`;
      console.log(fieldsTemplate['grid-template-columns']);
      return fieldsTemplate;
    }
  },
  data() {
    return {
      parentElement: '',
      parentEdge: Number,
    }
  },
  created() {
    this.$store.dispatch(this.tableProperties.header.state.dispatchInit);
  },
  mounted() {
    this.parentElement = document.getElementById('table-multi');
    this.parentEdge = this.parentElement.getBoundingClientRect().bottom;
  },
  methods: {
    scrollBody() {
      let bootAnchorEdge = document.getElementById('boot-anchor').getBoundingClientRect().bottom - 10;
      if (bootAnchorEdge < this.parentEdge) {
        this.parentElement.removeEventListener('scroll', this.scrollBody);
        this.$store.dispatch(this.tableProperties.body.state.dispatchData);
        console.log('Load');        
      }
    },
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
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,.4);
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    &-thumb { background-color: rgba(0,0,0,.4); }
  }
  &-head {
    position: sticky;
    top: 0px;
    display: inline-flex;
    background-color: #fff;
    z-index: 30;
  }
  &-body {
    position: relative;
    display: inline-flex;
    z-index: 20;
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