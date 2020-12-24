export const LoadData = {
  computed: {
    isProgressBar() {
      let statusLoad = this.$store.getters[`DataTable/GET_IS_DATA_LOAD`];
      if (!statusLoad) this.parentElement.addEventListener('scroll', this.scrollBody);
      return statusLoad;
    },
  },
  created() {
    this.$store.dispatch(`DataTable/GET_LIST_OPTION`, {tableName: this.tableName});
  },
  updated() { this.parentEdge = this.parentElement.getBoundingClientRect().bottom; },
  methods: {
    scrollBody() {
      let bootAnchorEdge = document.querySelector(`#${this.parentId} .data-table-boot-anchor`).getBoundingClientRect().bottom - 500;
      if (bootAnchorEdge < this.parentEdge) {
        this.parentElement.removeEventListener('scroll', this.scrollBody);
        this.$store.dispatch(`DataTable/GET_LIST_DATA_NEXT`, {tableName: this.tableName});
      }
    },
  },
}