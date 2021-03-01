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
    console.log(this.storeGetOptions());
    if (this.storeGetOptionsCount() == 0)
      {
        await this.$store.dispatch('DataTable/REQUEST_OPTIONS', { tableName: this.tableName })
          .then(() => this.storeDispatchRequestData({next: false}));
        return;
      }
    console.log(this.storeGetDataCount());
    if (this.storeGetDataCount() < 30) {
      console.log('load data');
      this.storeDispatchRequestData({next: false});
    }
  },
  methods: {
    storeGetStatusProcessing() { return this.$store.getters[`DataTable/GET_STATUS_PROCESSING`]; },
    storeGetHierarchyMode() { return this.$store.getters[`DataTable/GET_HIERARCHY_MODE`](this.tableName); },
    
    storeGetBaseDataCount() { return this.$store.getters[`DataTable/GET_DATA_COUNT_TOTAL`](this.tableName); },


    storeGetOptions() { return this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName); },
    storeGetOptionsCount() { return Object.keys(this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName)).length; },

    storeGetDataCount() { return this.$store.getters[`DataTable/GET_DATA`](this.tableName).length; },
    storeGetDataApiNext() { return this.$store.getters[`DataTable/GET_ADDRESS_API_PAGE_NEXT`](this.tableName); },
    
    storeGetDataGroupLevel() { return this.$store.getters['DataTable/GET_DATA_GROUP_LEVEL'](this.tableName); },

    storeDispatchRequestData(option) { this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName, next: option.next}); },

  }
}