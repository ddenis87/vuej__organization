export const LoadingData = {
  computed: {
    isLoadingData() {
      let isLoadingData = this.$store.getters[`DataTable/GET_IS_DATA_LOAD`];
      if (!isLoadingData && this.parentElement) {
        this.parentElement.addEventListener('scroll', this.eventScrollPagination);
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
    }
  },
  created() {
    this.$store.dispatch('DataTable/GET_LIST_OPTION', { tableName: this.properties.tableName });
  },
  mounted() {
    // console.log('mount');
    this.parentElement = document.getElementById(this.id)
    this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;
  },
  updated() { console.log('update'); this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;},
  methods: {
    eventScrollPagination() {
      let bootAnchorEdge = document.querySelector(`#${this.id}-boot-anchor`).getBoundingClientRect().bottom - 500;
      if (bootAnchorEdge < this.parentElementEdge) {
        this.parentElement.removeEventListener('scroll', this.eventScrollPagination);
        if (this.$store.getters[`DataTable/GET_ADDRESS_API_NEXT`](this.properties.tableName) != undefined)
          this.$store.dispatch(`DataTable/GET_LIST_DATA_NEXT`, {tableName: this.properties.tableName})
            // .then(complite => setTimeout(() => this.eventScrollPagination(), 800));
      }
    },
  },
}