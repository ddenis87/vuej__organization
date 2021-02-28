export const DataTableStore = {
  data() {
    return {
      tableName: this.properties.tableName,
    }
  },
  computed: {
    storeGetData() { return this.$store.getters[`DataTable/GET_DATA`](this.tableName); },
    storeGetDataGroup() { return this.$store.getters[`DataTable/GET_DATA_GROUP`](this.tableName); },
  },
  async created() {
    await this.$store.dispatch('DataTable/REQUEST_OPTIONS', { tableName: this.tableName })
      .then(() => this.$store.dispatch('DataTable/REQUEST_DATA', { tableName: this.tableName }));
  },
  methods: {
    storeGetStatusProcessing() { return this.$store.getters[`DataTable/GET_STATUS_PROCESSING`]; },
    storeGetOptions() { return this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName); },

    storeGetDataCount() { return this.$store.getters[`DataTable/GET_DATA_COUNT_TOTAL`](this.tableName); },
    storeGetDataNextApi() { return this.$store.getters[`DataTable/GET_ADDRESS_API_PAGE_NEXT`](this.tableName); },

    storeDispatchRequestData(option) { console.log(option); this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName, next: true}); },

  }
}