<template>
<div class="section">
  <hr/>
  <table class="table-section">
    <table-head :listItem="listHeader" :listItemProps="propsHeader"></table-head>
    <table-body :listItem="listItem" :listItemProps="listItemProps" :listItemHeader="listHeader"></table-body>
    <tfoot></tfoot>
  </table>
</div>
  
</template>

<script>
import TableHead from './TableHead.vue';
import TableBody from './TableBody.vue';
export default {
  
  name: 'TableSection',
  components: {
    TableHead,
    TableBody,
  },
  props: {
    propsHeader: Object,
    propsBody: Object,
  },
  computed: {
    listItem() { return this.$store.getters[this.propsBody.state.getterData]; },
    listHeader() {
      let listFieldsSort = [];
      this.propsHeader.items.forEach(item => {
        listFieldsSort.push(this.$store.getters[this.propsHeader.state.getterData].find(mitem => mitem.key == item.name));
      });
      return listFieldsSort;
    },
    listItemProps() {
      let listItemProps = [];
      if (!'sourceProps' in this.propsBody) return [];
      switch (this.propsBody.sourceProps) {
        case 'header': return this.propsHeader.items; break;
        case 'body':
        case 'join': {
          this.propsHeader.items.forEach(item => {
            listItemProps.push(
              (this.propsBody.items.find(mitem => mitem.name == item.name) != undefined ) ? this.propsBody.items.find(mitem => mitem.name == item.name) : 
              (this.propsBody.sourceProps == 'body') ? {name: item.name} :
              item
            );
          });
          break;
        }
        default: return [];
      }
      return listItemProps;
    },
  },
  created() {
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
        this.$store.dispatch('GET_LIST_DATA');
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// .section {
  // .control {
  //   display: flex;
  //   justify-content: flex-end;
  //   width: 98%;
  //   margin: 0px auto;
  // }
// }
.table-section {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-collapse: collapse;
}
</style>