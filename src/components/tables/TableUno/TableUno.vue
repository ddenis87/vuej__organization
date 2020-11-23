<template>
<div class="table-uno" id="table-uno" :style="listStyle">
  <table class="table">
    <table-uno-head :list-data="listHeader" 
                    :list-style-position="stylePosition">
      <template v-for="item in listHeader" v-slot:[item.key]="itemValue">
        <slot :name="`header.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
      </template>
    </table-uno-head>
    <table-uno-body :list-data-props="preparationBody"
                    :list-data-header="listHeader">
      <template v-for="item in listHeader" v-slot:[item.key]="itemValue">
          <slot :name="`body.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
      </template>
    </table-uno-body>
    <tfoot></tfoot>
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
    height: Number,
    fieldsTemplate: Array,
    header: Object,
    body: Object,
  },
  computed: {
    listStyle() {
      return (this.height) ? `max-height: ${this.height}px; overflow-y: scroll;` : '';
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
    preparationBody() {
      let modifyBody = this.body;
      modifyBody.height = this.height;
      return modifyBody;
    },
  },
  created() {
    this.$store.dispatch(this.header.state.dispatchInit);
    window.addEventListener('scroll', this.loadData);
  },
  updated() {
    window.addEventListener('scroll', this.loadData);
  },
  destroyed() { window.removeEventListener('scroll', this.loadData); },
  methods: {
    loadData() {
      if (document.getElementById('home').getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
        window.removeEventListener('scroll', this.loadData);
        this.$store.dispatch(this.body.state.dispatchData);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.table-uno {
  position: relative;
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 4px;
  border: thin solid rgba(0, 0, 0, 0.12);
  .table {
    width: 100%;
    border-collapse: collapse;
  }
}

</style>