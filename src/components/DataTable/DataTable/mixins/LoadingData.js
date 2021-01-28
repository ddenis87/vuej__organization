export const LoadingData = {
  computed: {
    isLoadingData() {
      let isLoadingData = this.$store.getters[`DataTable/GET_PROCESSED_STATUS`];
      if (!isLoadingData && this.parentElement) {
        this.parentElement.addEventListener('scroll', this.eventScrollPagination);
        if (this.$store.getters[`DataTable/GET_DATA_COUNT`](this.properties.tableName) != 0)
          setTimeout(() => this.eventScrollPagination(), 300);
      }
      return isLoadingData;
    },
  },
  data() {
    return {
      parentElement: null,
      parentElementEdge: 0,
    }
  },
  watch: {
    typeHeight() {
      if (this.typeHeight == 'dense')
        setTimeout(() => this.eventScrollPagination(), 300);
    },
    // isMultiline() {
    //   this.$store.commit('DataTable/SET_STRING_SORTING', {
    //     tableName: this.properties.tableName,
    //     ordering: null,
    //     key: null,
    //   });
    //   this.$store.dispatch(`DataTable/GET_LIST_DATA`, {tableName: this.tableName});
    // },
  },
  created() {
    this.$store.dispatch('DataTable/REQUEST_OPTIONS', { tableName: this.properties.tableName });
  },
  mounted() {
    this.parentElement = document.getElementById(this.id);
    this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;
  },
  updated() { this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;},
  methods: {
    eventScrollPagination() {
      let bootAnchorEdge = document.querySelector(`#${this.id}-boot-anchor`).getBoundingClientRect().bottom - 500;
      if (bootAnchorEdge < this.parentElementEdge) {
        this.parentElement.removeEventListener('scroll', this.eventScrollPagination);
        if (this.$store.getters[`DataTable/GET_ADDRESS_API_PAGE_NEXT`](this.properties.tableName) != null)
          this.$store.dispatch(`DataTable/REQUEST_DATA_NEXT`, {tableName: this.properties.tableName});
      }
    },
  },
}