<template>
  <div class="table-multiline" id="table-multiline">
    <div class="table-multiline-head">
      <table-multiline-head :list-data="listHeader" 
                        :style="fieldsTemplate"></table-multiline-head>
      <v-progress-linear class="table-multiline-progress" color="blue" indeterminate absolute bottom v-show="isShowProgressBar"></v-progress-linear>
    </div>
    
    <div class="table-multiline-body">
      <table-multiline-body :list-data="listBody"
                        :list-data-header="listHeader"
                        :list-style="fieldsTemplate"
                        :row-count="tableProperties.fieldsTemplate.length - 1">
        <template v-for="item in listHeader" #[item.key]="itemValue">
          <slot :name="`body.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
        </template>
        
        <template v-slot:action="activeValue">
          <slot name="action" v-bind:activeValue="activeValue.activeValue"></slot>
        </template>
      </table-multiline-body>
    </div>
    <div id="boot-anchor"></div>
  </div>
</template>

<script>
import TableMultilineHead from './TableMultilineHead.vue';
import TableMultilineBody from './TableMultilineBody.vue';

export default {
  name: 'TableMultiline',
  components: { 
    TableMultilineHead,
    TableMultilineBody, 
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
    this.parentElement = document.getElementById('table-multiline');
    this.parentEdge = this.parentElement.getBoundingClientRect().bottom;
  },
  methods: {
    scrollBody() {
      let bootAnchorEdge = document.getElementById('boot-anchor').getBoundingClientRect().bottom - 600;
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
@import 'TableMultiline.scss';

.table-multiline {
  position: relative;
  height: 100%;
  font-family: $fontFamily;
  border-radius: $borderRadius;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 0px 0 rgba(0,0,0,.12);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    &-thumb {
      border-radius: 3px;
      background-color:  rgba(0,0,0,0.2);
    }
  }
  &-head {
    position: sticky;
    display: inline-flex;
    top: 0px;
    z-index: 40;
  }
  &-body {
    position: relative;
    display: inline-flex;
    z-index: 20;
  }
  &-footer {
    position: sticky;
    bottom: 0px;
    z-index: 30;
  }

  .tooltip-body {
    // position: absolute;
    color:rgba(0, 0, 0, .87);
    background-color: white;
    
    padding: 6px;
    opacity: 1;
  }
}
</style>