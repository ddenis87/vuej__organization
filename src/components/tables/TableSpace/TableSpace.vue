<template>
<div class="section">
  <table class="table-section">
    <table-space-head :list-data="listHeader" :list-data-props="header"></table-space-head>
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
      let listHeaderFilter = [];
      this.header.items.forEach(item => {
        listHeaderFilter.push(this.$store.getters[this.header.state.getterData].find(mitem => mitem.key == item.name));
      });
      return listHeaderFilter;
    },
    modifyBody() {
      let modifyBody = this.body;
      let bodyItems = [];
      if ('sourceStyle' in this.body) {
        switch (this.body.sourceStyle) {
          case 'header': bodyItems = this.header.items; break;
          case 'body':
          case 'join': {
            this.header.items.forEach(item => {
              bodyItems.push(
                (this.body.items.find(mitem => mitem.name == item.name) != undefined ) ? this.body.items.find(mitem => mitem.name == item.name) : 
                  (this.body.sourceProps == 'body') ? {name: item.name} :
                    item
              );
            });
            break;
          }
          default: {
            this.header.items.forEach(item => {
             bodyItems.push({name: item.name});
            })
          }
        }
      } else {
        this.header.items.forEach(item => {
          bodyItems.push({name: item.name});
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