<template>
  <div class="body" id="body">
    <table-multiline-body-btn-up></table-multiline-body-btn-up>
    <div class="body-grid__item"
         v-for="(itemI, indexI) in listItem" 
         :key="indexI"
         :style="listStyleLocation">
      
      <div class="body-grid__item-col" 
            v-for="(itemF, indexF) in listDataHeader" 
            :key="indexF"
            :style="styleItems[indexF]">
        <slot :name="`${itemF.key}`" v-bind:itemValue="itemI[itemF.key]">{{ itemI[itemF.key] }}</slot>
      </div>
    </div>
    <div id="anchor"></div>
  </div>
</template>

<script>
import TableMultilineBodyBtnUp from './TableMultilineBodyBtnUp';
import { TABLE_MULTILINE } from './TableMultiline.js';
export default {
  name: 'TableMultilineBody',
  mixins: [
    TABLE_MULTILINE,
  ],
  components: {
    TableMultilineBodyBtnUp
  },
  props: {
    listDataProps: Object,
    listDataHeader: Array,
    listStyleLocation: String,
  },
  computed: {
    listItem() { return this.$store.getters[this.listDataProps.state.getterData]; },
  },
  created() {
    if(+this.listDataProps.height) {
    if (document.getElementById('table-multiline'))
      document.getElementById('table-multiline').addEventListener('scroll', this.loadData);
    } else {
      window.addEventListener('scroll', this.loadData);
    }
  },
  updated() {
    console.log('tm');
    if(+this.listDataProps.height) {
      if (document.getElementById('table-multiline'))
        document.getElementById('table-multiline').addEventListener('scroll', this.loadData);
    } else {
       window.addEventListener('scroll', this.loadData);
    }
  },
  destroyed() { window.removeEventListener('scroll', this.loadData); },
  methods: {
    loadData() {
      if (+this.listDataProps.height) {
        if (document.getElementById('anchor').getBoundingClientRect().bottom < document.getElementById('table-multiline').getBoundingClientRect().bottom + 10) {
          console.log('load');
          document.getElementById('table-multiline').removeEventListener('scroll', this.loadData);
          this.$store.dispatch(this.listDataProps.state.dispatchData);
        }
      } else {
        if (document.getElementById('table-multiline').getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
          window.removeEventListener('scroll', this.loadData);
          this.$store.dispatch(this.listDataProps.state.dispatchData);
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.body {
  .body-grid__item {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    &:hover { background-color: rgba(0, 0, 0, 0.08); z-index: 999; }
    &-col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 5px 10px;
      font-family: "Roboto", sans-serif;
      font-size: 0.875rem;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.87);

      box-sizing: border-box;
      
    }
  }
}
</style>