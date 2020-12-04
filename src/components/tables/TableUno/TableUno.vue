<template>
  <div class="table-uno" id="table-uno">
    <div class="table-tooltip" id="table-tooltip">
      123
    </div>
    <div class="table-uno-head">
      <table-uno-head :style="fieldsTemplate"
                      :list-data="listHeader" 
                      :height-type="heightType"></table-uno-head>
      <v-progress-linear class="table-uno-progress" color="blue" indeterminate absolute bottom v-show="isShowProgressBar"></v-progress-linear>
    </div>
    
    <div class="table-uno-body">
      <table-uno-body :list-data="listBody"
                      :list-data-header="listHeader"
                      :fields-template="fieldsTemplate"
                      :height-type="heightType"
                      :count-row="tableProperties.countRowBody" 
                      >
        <template v-for="item in listHeader" #[item.value]="itemValue">
          <slot :name="`body.${(item) ? item.value : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
        </template>
        
        <template v-slot:action="activeValue">
          <slot name="action" v-bind:activeValue="activeValue.activeValue"></slot>
        </template>
      </table-uno-body>
    </div>
    <div id="boot-anchor"></div>
  </div>
</template>

<script>
import TableUnoHead from './TableUnoHead.vue';
import TableUnoBody from './TableUnoBody.vue';

export default {
  name: 'TableUno',
  components: { 
    TableUnoHead,
    TableUnoBody, 
  },
  props: {
    tableProperties: Object,
    
    fixed: {type: Boolean, default: true},
    dense: {type: Boolean, default: false},
    auto: {type: Boolean, default: false},
  },
  computed: {
    isShowProgressBar() {
      if (!this.$store.getters[this.tableProperties.state.progress]) this.parentElement.addEventListener('scroll', this.scrollBody);
      return this.$store.getters[this.tableProperties.state.progress];
    },
    
    listHeader() {
      let listHeaderBase = this.tableProperties.header;
      let listHeaderState = this.$store.getters[this.tableProperties.state.header.getData];
      if (listHeaderState.length != 0) {
        listHeaderBase.forEach(item => item.text = listHeaderState.find(mitem => mitem.key == item.value).label);
        console.log(listHeaderBase);
        return listHeaderBase;
      }
    },
    listBody() { return this.$store.getters[this.tableProperties.state.body.getData]; },
    
    heightType() {
      let heightType = 'fixed';
      if (this.dense) heightType = 'dense';
      if (this.auto) heightType = 'auto';
      return heightType;
    },
    fieldsTemplate() {
      let fieldsTemplate = { 'grid-template-areas': '"', 'grid-template-columns': '' };
      let minWidth = 100;
      this.tableProperties.header.forEach(item => {
        fieldsTemplate['grid-template-areas'] += `${item.value} `;
        fieldsTemplate['grid-template-columns'] += (item.width) ? (Array.isArray(item.width)) ? ` minmax(${item.width[0]}px, ${item.width[1]}px)` : ` minmax(${item.width}px, 100vw)` 
          : ` minmax(${minWidth}px, 100%)`;
      });
      fieldsTemplate['grid-template-areas'] += ' action_box"';
      fieldsTemplate['grid-template-columns'] += ' minmax(0px, 0px)';
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
    this.$store.dispatch(this.tableProperties.state.init);
  },
  mounted() {
    this.parentElement = document.getElementById('table-uno');
    this.parentEdge = this.parentElement.getBoundingClientRect().bottom;
  },
  updated() { this.parentEdge = this.parentElement.getBoundingClientRect().bottom; },
  methods: {
    scrollBody() {
      console.log('Scroll'); 
      let bootAnchorEdge = document.getElementById('boot-anchor').getBoundingClientRect().bottom - 500;
      console.log(bootAnchorEdge);
      console.log(this.parentEdge);
      if (bootAnchorEdge < this.parentEdge) {
        this.parentElement.removeEventListener('scroll', this.scrollBody);
        this.$store.dispatch(this.tableProperties.state.body.loadData);
        console.log('Load');        
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'TableUno.scss';

.table-uno {
  position: relative;
  height: 100%;
  font-family: $fontFamily;
  border-radius: $borderRadius;
  box-shadow: $boxShadow;
  overflow: auto;

// border: thin solid green;

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

  .table-tooltip {
    position: fixed;
    left: 100px;
    top: 100px;
    max-width: 400px;
    min-width: 400px;

    font-size: $tooltipFontSize;
    color: $tooltipFontColor;
    border: thin solid rgba(0,0,0,.3);
    border-radius: 10px;
    box-shadow: 2px 2px 4px 0px rgba(0,0,0,.12);
    background-color: white;
    padding: 4px 6px;
    opacity: 1;
    z-index: 100;
    visibility: hidden;
  }
}
</style>