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