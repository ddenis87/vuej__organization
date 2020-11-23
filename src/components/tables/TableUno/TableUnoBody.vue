<template>
  <tbody class="body" id="body">
    <tr class="body__row" 
        v-for="(itemI, indexI) in listItem" 
        :key="`uno-body-row-${indexI}`">
      <td class="body__col" 
          v-for="(itemF, indexF) in listDataHeader" 
          :key="`uno-body-col-${indexF}`">
        <slot :name="`${itemF.key}`" v-bind:itemValue="itemI[itemF.key]">{{ itemI[itemF.key] }}</slot>
      </td>
    </tr>
    <tr class="body__row" id="anchor"><td :colspan="listDataHeader.length"></td></tr>
  </tbody>
</template>

<script>
import { TABLE_UNO } from './TableUno.js';

export default {
  name: 'TableBody',
  mixins: [
    TABLE_UNO,
  ],
  props: {
    listDataProps: Object,
    listDataHeader: Array,
  },
  computed: {
    listItem() { return this.$store.getters[this.listDataProps.state.getterData]; },
  },
  created() {
    if(+this.listDataProps.height) {
    if (document.getElementById('table-uno'))
      document.getElementById('table-uno').addEventListener('scroll', this.loadData);
    } else {
      window.addEventListener('scroll', this.loadData);
    }
  },
  updated() {
    if(+this.listDataProps.height) {
      if (document.getElementById('table-uno'))
        document.getElementById('table-uno').addEventListener('scroll', this.loadData);
    } else {
       window.addEventListener('scroll', this.loadData);
    }
  },
  destroyed() { window.removeEventListener('scroll', this.loadData); },
  methods: {
    loadData() {
      if (+this.listDataProps.height) {
        if (document.getElementById('anchor').getBoundingClientRect().bottom < document.getElementById('table-uno').getBoundingClientRect().bottom + 10) {
          console.log('load');
          document.getElementById('table-uno').removeEventListener('scroll', this.loadData);
          this.$store.dispatch(this.listDataProps.state.dispatchData);
        }
      } else {
        if (document.getElementById('table-uno').getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
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
  font-size: 0.875rem;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.87);
  &__row {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    &:hover { background-color: rgba(0, 0, 0, 0.08); }
  }
  &__col {
    justify-content: start;
    align-items: center;
    padding: 5px 10px;
    text-align: start;
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>