<template>
  <div class="section">
    <div class="multi-table">
      <div class="table">
        <table-space-multi-row-head :list-data="listHeader" 
                                    :list-data-props="header" 
                                    :list-style-location="styleLocation"></table-space-multi-row-head>

        <table-space-multi-row-body :list-data-props="modifyBody" 
                                    :list-data-header="listHeader" 
                                    :list-style-location="styleLocation"></table-space-multi-row-body>
      </div>
    </div>
  </div>
</template>

<script>
import TableSpaceMultiRowHead from './TableSpaceMultiRowHead.vue';
import TableSpaceMultiRowBody from './TableSpaceMultiRowBody.vue';

export default {
  name: 'TableSpaceMultiRow',
  components: {
    TableSpaceMultiRowHead,
    TableSpaceMultiRowBody,
  },
  props: {
    locationFields: Array,
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
      console.log(listHeaderFilter);
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

    styleLocation() {
      let styleLocation = 'grid-template-columns:';
      this.locationFields[0].forEach(element => styleLocation += ` ${(+element) ? `${element}px` : 'auto'}`);
      styleLocation += '; grid-template-areas:';
      for (let i = 1; i < this.locationFields.length; i++) styleLocation += ` "${this.locationFields[i].join(' ')}"`;
      styleLocation += '; ';
      console.log(styleLocation);
      return styleLocation;
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

  font-family: "Roboto", sans-serif;
}
</style>