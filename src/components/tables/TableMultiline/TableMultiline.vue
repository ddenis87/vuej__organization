<template>
  <div class="table-multiline" id="table-multiline" :style="listStyle">
    <div class="table">
      <table-multiline-head :list-data="listHeader" 
                            :list-style-location="stylePosition"></table-multiline-head>

      <table-multiline-body :list-data-props="preparationBody" 
                            
                            :list-data-header="listHeader" 
                            :list-style-location="stylePosition">
        <template v-for="item in listHeader" v-slot:[item.key]="itemValue">
          <slot :name="`body.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
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
    fieldsTemplate: Array,
    locationFields: Array,
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

    preparationBody() {
      let headerItems = new Set();
      for (let i = 1; i < this.fieldsTemplate.length; i++) {
        this.fieldsTemplate[i].forEach(item => headerItems.add(item));
      }
      let modifyBody = this.body;
      modifyBody.height = this.height;
      return modifyBody;
    },
    stylePosition() {
      let styleLocation = 'grid-template-columns:';
      this.fieldsTemplate[0].forEach(element => styleLocation += ` ${(+element) ? `${element}px` : '1fr'}`);
      styleLocation += '; grid-template-areas:';
      for (let i = 1; i < this.fieldsTemplate.length; i++) styleLocation += ` "${this.fieldsTemplate[i].join(' ')}"`;
      styleLocation += '; ';
      return styleLocation;
    },
  },
}
</script>

<style lang="scss" scoped>
.table-multiline {
  position: relative;
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 4px;
  border: thin solid rgba(0, 0, 0, 0.12);
}
</style>