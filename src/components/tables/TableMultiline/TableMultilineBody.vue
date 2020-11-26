<template>
  <div class="body" id="body">
    <div class="body-grid__item"
         v-for="(itemI, indexI) in listItem" 
         :key="`body-row-${indexI}`"
         :style="listStyleLocationModify">
      
      <div class="body-grid__item-col" 
           v-for="(itemF, indexF) in listDataHeader" 
           :key="`body-col-${indexF}`"
           :style="styleItems[indexF]">
        <table-multiline-body-overflow>
          <template>
            <slot :name="`${itemF.key}`" v-bind:itemValue="itemI[itemF.key]">{{ itemI[itemF.key] }}</slot>
          </template>
        </table-multiline-body-overflow>
      </div>
      <div class="body-grid__item-col-action">
        <slot name="action" v-bind:activeValue="itemI[listDataProps.activeField]"></slot>
      </div>
    </div>
    <div id="anchor"></div>
  </div>
</template>

<script>
import { TABLE_MULTILINE } from './TableMultiline.js';

import TableMultilineBodyOverflow from './TableMultilineBodyOverflow.vue'

export default {
  name: 'TableMultilineBody',
  mixins: [
    TABLE_MULTILINE,
  ],
  components: {
    TableMultilineBodyOverflow,
  },
  props: {
    listDataProps: Object,
    listDataHeader: Array,
    listStyleLocation: String,
  },
  computed: {
    listStyleLocationModify() {
      let modifyAreas = this.listStyleLocation.split(';')[1].split(':')[1].split('" "');
      for (let i = 0; i < modifyAreas.length; i++) {
        modifyAreas[i] = '"' + (modifyAreas[i].replace(/"/g, '').trim()) + ' action_box"';
      }
      return `${this.listStyleLocation.split(';')[0]} 0px; grid-template-areas: ${modifyAreas.join().replace(/,/g, ' ')};`;
    },
    listItem() { return this.$store.getters[this.listDataProps.state.getterData]; },
    listData() { return this.listDataHeader; }
  },
  created() { this.createEvents(); },
  updated() { this.createEvents(); },
  destroyed() { this.deleteEvents() },
  methods: {
    loadData() {
      (+this.listDataProps.container.height) ? this.loadDataForComponent() : this.loadDataForPage();
    },
    loadDataForComponent() {
      if (document.getElementById('anchor').getBoundingClientRect().bottom < document.getElementById('table-multiline').getBoundingClientRect().bottom + 10) {
        this.deleteEvents();
        this.$store.dispatch(this.listDataProps.state.dispatchData);
      }
      (document.getElementById('body').getBoundingClientRect().top < 10) ? this.$emit('scroll', true) : this.$emit('scroll', false);
    },
    loadDataForPage() {
      if (document.getElementById('table-multiline').getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
        this.deleteEvents();
        this.$store.dispatch(this.listDataProps.state.dispatchData);
      }
    },
    createEvents() {
      if(+this.listDataProps.container.height) {
        if (document.getElementById('table-multiline'))
          document.getElementById('table-multiline').addEventListener('scroll', this.loadData);
      } else {
        window.addEventListener('scroll', this.loadData);
      }
    },
    deleteEvents() {
      (+this.listDataProps.container.height) ? document.getElementById('table-multiline').removeEventListener('scroll', this.loadData) : window.removeEventListener('scroll', this.loadData);
    }
  },
}
</script>

<style lang="scss" scoped>
.body {
  .body-grid__item {
    display: grid;
    grid-gap: 0vw;
    grid-template-rows: auto;
    grid-template-columns: auto;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255);
    &:hover { background-color: rgb(240, 240, 240); }
    &:hover > .body-grid__item-col-action > .action-box { opacity: 1; }
    &-col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0px 10px;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 1.5rem;
      color: rgba(0, 0, 0, 0.87);
      box-sizing: border-box;
      min-height: 25px;
      overflow: hidden;
      &-action {
        grid-area: action_box;
        max-width: 0px;
        height: 100%;
      }
    }
  }
}
</style>