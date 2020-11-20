<template>
<div class="section">
  <table class="table-section">
    <table-space-head :list-data="listHeader" 
                      :list-data-props="header"></table-space-head>
    <table-space-body :list-data-props="modifyBody"
                      :list-data-header="listHeader"></table-space-body>
    <tfoot></tfoot>
  </table>
</div>
  
</template>

<script>
import TableSpaceHead from './TableSpaceHead.vue';
import TableSpaceBody from './TableSpaceBody.vue';
export default {
  
  name: 'TableSpace',
  components: {
    TableSpaceHead,
    TableSpaceBody,
  },
  props: {
    header: Object,
    body: Object,
  },
  computed: {
    listHeader() {
      if (this.header.items.length == 0) return this.$store.getters[this.header.state.getterData];
      let listHeader = this.$store.getters[this.header.state.getterData];
      let listHeaderFilter = [];
      this.header.items.forEach(item => {
        listHeaderFilter.push(listHeader.find(mitem => mitem.key == item.spaceName));
      });
      return listHeaderFilter;
    },
    modifyBody() {
      let modifyBody = this.body;
      let headerItems = this.header.items;
      let bodyItems = [];
      if (headerItems.length == 0) 
        this.$store.getters[this.header.state.getterData].forEach(item => headerItems.push({spaceName: item.key}));
      
      if ('sourceStyle' in this.body) {
        switch (this.body.sourceStyle) {
          case 'header': bodyItems = headerItems; break;
          case 'body':
          case 'join': {
            headerItems.forEach(item => {
              bodyItems.push(
                (this.body.items.find(mitem => mitem.spaceName == item.spaceName) != undefined ) ? 
                  this.body.items.find(mitem => mitem.spaceName == item.spaceName) : (this.body.sourceProps == 'body') ? 
                  {spaceName: item.spaceName} : item
              );
            });
            break;
          }
          default: {
            this.header.items.forEach(item => {
             bodyItems.push({spaceName: item.spaceName});
            })
          }
        }
      } else {
        this.header.items.forEach(item => {
          bodyItems.push({spaceName: item.spaceName});
        })
      }
      modifyBody.items = bodyItems;
      return modifyBody;
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
        this.$store.dispatch(this.body.state.dispatchData);
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