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
      <td class="body__col-action">
        <slot name="action" v-bind:activeValue="itemI[listDataProps.activeField]"></slot>
      </td>
    </tr>
    <tr class="body__row" id="anchor"><td :colspan="listDataHeader.length"></td></tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableBody',
  props: {
    listDataProps: Object,
    listDataHeader: Array,
  },
  computed: {
    listItem() { return this.$store.getters[this.listDataProps.state.getterData]; },
  },
  created() { this.createEvents(); },
  updated() { this.createEvents(); },
  destroyed() { this.deleteEvents(); },
  methods: {
    loadData() {
      (+this.listDataProps.container.height) ? this.loadDataForComponent() : this.loadDataForPage();
    },
    loadDataForComponent() {
      if (document.getElementById('anchor').getBoundingClientRect().bottom < document.getElementById('table-uno').getBoundingClientRect().bottom + 10) {
        this.deleteEvents();
        this.$store.dispatch(this.listDataProps.state.dispatchData);
      }
      (document.getElementById('body').getBoundingClientRect().top < 10) ? this.$emit('scroll', true) : this.$emit('scroll', false);
    },
    loadDataForPage() {
      if (document.getElementById('table-uno').getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
        this.deleteEvents();
        this.$store.dispatch(this.listDataProps.state.dispatchData);
      }
    },
    createEvents() {
      if (+this.listDataProps.container.height) {
        if (document.getElementById('table-uno'))
          document.getElementById('table-uno').addEventListener('scroll', this.loadData);
      } else {
        window.addEventListener('scroll', this.loadData);
      }
    },
    deleteEvents() {
      (+this.listDataProps.container.height) ? document.getElementById('table-uno').removeEventListener('scroll', this.loadData) : window.removeEventListener('scroll', this.loadData);
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
    &:hover { background-color: rgb(240, 240, 240); }
    &:hover > .body__col-action > .action-box {
      opacity: 1;
    }
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

    &-action {
      max-width: 0px;
      height: 100%;
    }
    
  }
}
</style>