<template>
  <div class="table-multiline" id="table-multiline" :style="listStyle">
    <div class="table">
      <table-multiline-head :list-data="listHeader" 
                            :list-data-props="header" 
                            :list-style-location="styleLocation"></table-multiline-head>

      <table-multiline-body :list-data-props="modifyBody" 
                            :list-data-header="listHeader" 
                            :list-style-location="styleLocation">
        <template v-for="(item) in listHeader" v-slot:[item.key]="itemValue">
          <slot :name="`body.${item.key}`" v-bind:itemValue="itemValue.itemValue"></slot>
        </template>
      </table-multiline-body>
    </div>
  </div>
</template>

<script>
import TableMultilineHead from './TableMultilineHead.vue';
import TableMultilineBody from './TableMultilineBody.vue';

export default {
  name: 'TableMultiline',
  components: {
    TableMultilineHead,
    TableMultilineBody,
  },
  props: {
    height: Number,
    locationFields: Array,
    header: Object,
    body: Object,
  },
  computed: {
    listStyle() {
      return (this.height) ? `max-height: ${this.height}px; overflow-y: scroll;` : '';
    },
    listHeader() {
      let listHeaderFilter = [];
      if (this.header.items.length == 0) return this.$store.getters[this.header.state.getterData];
      let listHeader = this.$store.getters[this.header.state.getterData];
      this.header.items.forEach(item => {
        listHeaderFilter.push(listHeader.find(mitem => mitem.key == item.spaceName));
      });
      return listHeaderFilter;
    },

    modifyBody() {
      let modifyBody = this.body;
      modifyBody.height = this.height;
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
      this.locationFields[0].forEach(element => styleLocation += ` ${(+element) ? `${element}px` : '1fr'}`);
      styleLocation += '; grid-template-areas:';
      for (let i = 1; i < this.locationFields.length; i++) styleLocation += ` "${this.locationFields[i].join(' ')}"`;
      styleLocation += '; ';
      console.log(styleLocation);
      return styleLocation;
    },
  },
}
</script>

<style lang="scss" scoped>
.table-multiline {
  width: 100%;
  // padding: 10px 0px;
  font-family: "Roboto", sans-serif;
  .table {
    border-radius: 4px;
    border: thin solid rgba(0, 0, 0, 0.12);
    
  }

}
</style>