export const LoadData = {
  computed: {
    isShowProgressBar() {
      if (!this.$store.getters[this.tableProperties.state.progress]) this.parentElement.addEventListener('scroll', this.scrollBody);
      return this.$store.getters[this.tableProperties.state.progress];
    },
  },
  created() {
    this.$store.dispatch(this.tableProperties.state.init);
  },
  updated() { this.parentEdge = this.parentElement.getBoundingClientRect().bottom; },
  methods: {
    scrollBody() {
      let bootAnchorEdge = document.querySelector(`#${this.parentId} .boot-anchor`).getBoundingClientRect().bottom - 500;
      if (bootAnchorEdge < this.parentEdge) {
        this.parentElement.removeEventListener('scroll', this.scrollBody);
        this.$store.dispatch(this.tableProperties.state.body.loadData);
        console.log('Load');        
      }
    },
  },
}