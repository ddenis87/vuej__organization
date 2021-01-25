export const LoadingLazyData = {
  computed: {

  },
  data() {
    return {
      parentElement: null,
      parentElementEdge: 0,
    }
  },
  mounted() { 
    this.parentElement = document.getElementById(this.id)
    this.parentElementEdge = this.parentElement.getBoundingClientRect.bottom;
  },
  updated() { this.parentElementEdge = this.parentElement.getBoundingClientRect.bottom; },
  methods: {
    eventScrollPagination() {
      let bootAnchorEdge = document.querySelector(`#${this.id}-boot-anchor`).getBoundingClientRect.bottom - 500;
      if (bootAnchorEdge < this.parentElementEdge) {
        this.parentElement.removeEventListener('scroll', this.eventScrollPagination);
        if (this.$store.getters[`DataTable/GET_ADDRESS_API_NEXT`](this.properties.tableName) != undefined)
          this.$store.dispatch(`DataTable/GET_LIST_DATA_NEXT`, {tableName: this.properties.tableName});
      }
    }
  },
}