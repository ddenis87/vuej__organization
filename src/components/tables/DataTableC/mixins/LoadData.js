export const LoadData = {
  computed: {
    isShowProgressBar() {
      if (!this.$store.getters[`${this.stateName}/GET_IS_DATA_LOAD`]) this.parentElement.addEventListener('scroll', this.scrollBody);
      return this.$store.getters[`${this.stateName}/GET_IS_DATA_LOAD`];
    },
  },
  created() {
    console.log(`${this.stateName}/GET_LIST_OPTION`);
    console.log(this.$store);
    this.$store.dispatch(`${this.stateName}/GET_LIST_OPTION`);
  },
  updated() { this.parentEdge = this.parentElement.getBoundingClientRect().bottom; },
  methods: {
    scrollBody() {
      let bootAnchorEdge = document.querySelector(`#${this.parentId} .data-table-boot-anchor`).getBoundingClientRect().bottom - 500;
      if (bootAnchorEdge < this.parentEdge) {
        this.parentElement.removeEventListener('scroll', this.scrollBody);
        this.$store.dispatch(`${this.stateName}/GET_LIST_DATA`);
        console.log('Load');
      }
    },
  },
}