<template>
  <div class="section">
    <div class="multi-table">
      <div class="table">
        <multi-table-head :listItem="listHeader" :listItemProps="propsHeader.items"></multi-table-head>
        <multi-table-body :listItem="listItem" :listItemProps="listItemProps" :listItemHeader="listHeader"></multi-table-body>
      </div>
    </div>
  </div>
</template>

<script>
import MultiTableHead from './MultiTableHead.vue';
import MultiTableBody from './MultiTableBody.vue';

export default {
  name: 'MultiTableSection',
  components: {
    MultiTableHead,
    MultiTableBody,
  },
  props: {
    propsHeader: Object,
    propsBody: Object,
  },
  computed: {
    listItem() { return this.$store.getters[this.propsBody.getter]; },
    listHeader() {
      let listFieldsSort = [];
      this.propsHeader.items.forEach(item => {
        listFieldsSort.push(this.$store.getters[this.propsHeader.getter].find(mitem => mitem.key == item.name));
      });
      return listFieldsSort;
    },
    listItemProps() {
      let listItemProps = [];
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
        default: {
          this.propsHeader.items.forEach(item => {
            listItemProps.push({name: item.name});
          })
        }
      }
      listItemProps.forEach(item => {
        if ('cols' in this.propsHeader.items.find(mitem => mitem.name == item.name)) item.cols = this.propsHeader.items.find(mitem => mitem.name == item.name).cols;
        if ('rows' in this.propsHeader.items.find(mitem => mitem.name == item.name)) item.rows = this.propsHeader.items.find(mitem => mitem.name == item.name).rows;
      });
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
.table-section {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-collapse: collapse;
}
</style>