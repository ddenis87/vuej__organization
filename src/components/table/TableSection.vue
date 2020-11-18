<template>
  <table class="table-section" v-if="true">
    <table-head :listItem="listFields" :columnWidthHeader="columnWidth"></table-head>
    <table-body :listItemColumn="listFields" :listItemRow="listItems"></table-body>
    <tfoot></tfoot>
  </table>
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
    columnWidth: {
      type: Array,
      default: []
    },
    columnSorted: Array,
    multi: { type: Boolean, dafault: false },
  },
  computed: {
    listItems() { return this.$store.getters.GET_LIST_DATA; },
    listFields() {
      let listFieldsSort = [];
      this.columnSorted.forEach(item => {
        listFieldsSort.push(this.$store.getters.GET_LIST_FIELDS.find(mitem => mitem.key == item));
      });
      return listFieldsSort;
    }
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