<template>
  <div class="body" id="body">
    <div class="body-grid__item"
         v-for="(itemI, indexI) in listItem" 
         :key="`body-row-${indexI}`"
         :style="listStyleLocation">
      
      <div class="body-grid__item-col" 
            v-for="(itemF, indexF) in listDataHeader" 
            :key="`body-col-${indexF}`"
            :style="styleItems[indexF]">
        <slot :name="`${itemF.key}`" v-bind:itemValue="itemI[itemF.key]">{{ itemI[itemF.key] }}</slot>
      </div>
    </div>
    <div id="anchor"></div>
  </div>
</template>

<script>
import { TABLE_MULTILINE } from './TableMultiline.js';

export default {
  name: 'TableMultilineBody',
  mixins: [
    TABLE_MULTILINE,
  ],
  props: {
    listDataProps: Object,
    listDataHeader: Array,
    listStyleLocation: String,
  },
  computed: {
    listItem() { return this.$store.getters[this.listDataProps.state.getterData]; },
    listData() { return this.listDataHeader; }
  },
  created() {
    if(+this.listDataProps.container.height) {
    if (document.getElementById('table-multiline'))
      document.getElementById('table-multiline').addEventListener('scroll', this.loadData);
    } else {
      window.addEventListener('scroll', this.loadData);
    }
  },
  updated() {
    if(+this.listDataProps.container.height) {
      if (document.getElementById('table-multiline'))
        document.getElementById('table-multiline').addEventListener('scroll', this.loadData);
    } else {
       window.addEventListener('scroll', this.loadData);
    }
  },
  destroyed() { window.removeEventListener('scroll', this.loadData); },
  methods: {
    loadData() {
      if (+this.listDataProps.container.height) {
        if (document.getElementById('anchor').getBoundingClientRect().bottom < document.getElementById('table-multiline').getBoundingClientRect().bottom + 10) {
          console.log('load');
          document.getElementById('table-multiline').removeEventListener('scroll', this.loadData);
          this.$store.dispatch(this.listDataProps.state.dispatchData);
        }
        (document.getElementById('body').getBoundingClientRect().top < 10) ? this.$emit('scroll', true) : this.$emit('scroll', false);
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
    background-color: rgba(255, 255, 255);
    &:hover { background-color: rgba(0, 0, 0, 0.08); }
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