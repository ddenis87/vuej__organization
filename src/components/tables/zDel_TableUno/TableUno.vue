<template>
<div class="table-uno" id="table-uno" :style="listStyle">
  <table class="table">
    <table-uno-head :list-data="listHeader" 
                    :list-style-position="stylePosition"
                    :isScroll="isShowButtonUp"
                    @go-up="goUp">
      <template v-for="item in listHeader" 
                v-slot:[item.key]="itemValue">
        <slot :name="`header.${(item) ? item.key : ''}`" 
              v-bind:itemValue="itemValue.itemValue"></slot>
      </template>
    </table-uno-head>
    <table-uno-body :list-data-props="preparationBody"
                    :list-data-header="listHeader"
                    @scroll="scrollBody">
      <template v-for="item in listHeader" v-slot:[item.key]="itemValue">
          <slot :name="`body.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
      </template>

      <template v-slot:action="activeValue">
        <slot name="action" v-bind:activeValue="activeValue.activeValue"></slot>
      </template>
    </table-uno-body>
    <tfoot class="table-footer">
      <tr>
        <td :colspan="listHeader.length">
          <slot name="footer"></slot>
        </td>
      </tr>
    </tfoot>
  </table>
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
    activeField: String,
    container: {type: Object, default: () => ({ width: undefined, height: undefined })},
    fieldsTemplate: Array,
    header: Object,
    body: Object,
  },
  computed: {
    listStyle() {
      let {width, height} = this.container;

      let listStyleContainer = (width) ? `width: ${width}px; ` : 'width: 100%; ';
      listStyleContainer += (height) ? `max-height: ${height}px; overflow-y: scroll; ` : '';
      return listStyleContainer;
    },
    listHeader() {
      let headerItems = new Set();
      let headerFilter = [];
      let headerList = this.$store.getters[this.header.state.getterData];
      for (let i = 1; i < this.fieldsTemplate.length; i++) {
        this.fieldsTemplate[i].forEach(item => headerItems.add(item));
      }
      headerItems.forEach(item => headerFilter.push(headerList.find(mitem => mitem.key == item)));
      return headerFilter;
    },
    preparationBody() {
      let modifyBody = this.body;
      modifyBody.container = this.container;
      modifyBody.activeField = this.activeField;
      return modifyBody;
    },
    stylePosition() {
      let stylePosition = [];
      let headerItems = new Set();
      for (let i = 1; i < this.fieldsTemplate.length; i++) {
        this.fieldsTemplate[i].forEach(item => headerItems.add(item));
      }
      for (let i = 0; i < headerItems.size; i++)
        stylePosition.push((this.fieldsTemplate[0][i] && +this.fieldsTemplate[0][i]) ? `width: ${this.fieldsTemplate[0][i]}px; ` : 'width: 1fr; ' );
      return stylePosition;
    },
  },
  data() {
    return {
      isShowButtonUp: false,
    }
  },
  created() {
    this.$store.dispatch(this.header.state.dispatchInit);
  },
  methods: {
    scrollBody(value) {
      this.isShowButtonUp = value;
    },
    goUp() {
      document.getElementById('table-uno').scrollTo(0,0);
    },
  },
}
</script>

<style lang="scss" scoped>
.table-uno {
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 5px;
  border: thin solid rgba(0, 0, 0, 0.12);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);
  .table {
    width: 100%;
    border-collapse: collapse;

    .table-footer {
      position: sticky;
      bottom: 0px;
      border-top: thin solid rgba(0, 0, 0, 0.12);
      background-color: #FAFAFA;
    }
  }
}

</style>