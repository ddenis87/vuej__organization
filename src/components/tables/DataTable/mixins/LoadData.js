export const LoadData = {
  computed: {
    isProgressBar() {
      let statusLoad = this.$store.getters[`${this.stateName}/GET_IS_DATA_LOAD`];
      if (!statusLoad) this.parentElement.addEventListener('scroll', this.scrollBody);
      return statusLoad;
    },
  },
  created() {
    this.$store.dispatch(`${this.stateName}/GET_LIST_OPTION`);
  },
  updated() { this.parentEdge = this.parentElement.getBoundingClientRect().bottom; },
  methods: {
    scrollBody() {
      let bootAnchorEdge = document.querySelector(`#${this.parentId} .data-table-boot-anchor`).getBoundingClientRect().bottom - 500;
      if (bootAnchorEdge < this.parentEdge) {
        this.parentElement.removeEventListener('scroll', this.scrollBody);
        this.$store.dispatch(`${this.stateName}/GET_LIST_DATA`);
      }
    },
  },
}