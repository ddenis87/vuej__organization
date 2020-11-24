<template>
  <div class="table-multiline" id="table-multiline" :style="listStyle">
    <div class="table">
      <div class="table-header">
        <table-multiline-head :list-data="listHeader" 
                              :list-style-position="stylePosition">
          <template v-for="(item) in listHeader" #[item.key]="itemValue">
            <slot :name="`header.${(item) ? item.key : ''}`" 
                  v-bind:itemValue="itemValue.itemValue" ></slot>
          </template>
          

        </table-multiline-head>
      </div>
      
      <div class="table-body">
        <table-multiline-body :list-data-props="preparationBody" 
                              :list-data-header="listHeader" 
                              :list-style-location="stylePosition">
          <template v-for="item in listHeader" #[item.key]="itemValue">
            <slot :name="`body.${(item) ? item.key : ''}`" v-bind:itemValue="itemValue.itemValue"></slot>
          </template>
        </table-multiline-body> 
      </div>

      <div class="table-footer">
        <slot name="footer"></slot>
      </div>
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
    container: {type: Object, default: () => ({ width: undefined, height: undefined })},
    fieldsTemplate: Array,
    header: Object,
    body: Object,
  },
  computed: {
    listStyle() {
      let {width, height} = this.container;
      let listStyleContainer = (width) ? `width: ${width}px; ` : 'width: 100%; ';
      listStyleContainer += (height) ? `max-height: ${height}px; overflow-y: scroll; ` : '';
      return listStyleContainer;
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
      let modifyBody = this.body;
      modifyBody.container = this.container;
      return modifyBody;
    },
    stylePosition() {
      let styleLocation = '';
      
      if (this.container.width) {
        let maxWidth = 0;
        this.fieldsTemplate[0].forEach(element => {if (+element) maxWidth += +element });
        if (maxWidth < this.container.width) {
          styleLocation += 'grid-template-columns:';
          this.fieldsTemplate[0].forEach(element => styleLocation += ` ${(+element) ? `${element}px` : '1fr'}`);
        } else {
          styleLocation += 'grid-template-columns: repeat(auto-fit, 1fr) ';
        }
      } else {
        styleLocation += 'grid-template-columns:';
        this.fieldsTemplate[0].forEach(element => styleLocation += ` ${(+element) ? `${element}px` : '1fr'}`);
      }

      styleLocation += '; grid-template-areas:';
      for (let i = 1; i < this.fieldsTemplate.length; i++) styleLocation += ` "${this.fieldsTemplate[i].join(' ')}"`;
      styleLocation += '; ';
      return styleLocation;
    },
  },
  created() {
    this.$store.dispatch(this.header.state.dispatchInit);
  },
}
</script>

<style lang="scss" scoped>
.table-multiline {
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 4px;
  border: thin solid rgba(0, 0, 0, 0.12);
  .table {
    .table-header {
      position: sticky;
      top: 0px;
    }
    .table-footer {
      position: sticky;
      bottom: 0px;
      border-top: thin solid rgba(0, 0, 0, 0.12);
      background-color: #FAFAFA;
    }
  }
}

</style>