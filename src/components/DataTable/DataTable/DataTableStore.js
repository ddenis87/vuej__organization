import { Guid } from 'js-guid';

export const DataTableStore = {
  data() {
    return {
      tableName: this.properties.tableName,
      GUID: 'd' + Guid.newGuid().StringGuid,
    }
  },
  computed: {
    storeGetData() {
      return this.$store.getters[`DataTable/GET_DATA`]({
        tableName: this.tableName,
        guid: this.GUID,
      });
    },
    storeGetDataGroup() {
      return this.$store.getters[`DataTable/GET_DATA_GROUP`]({
        tableName: this.tableName,
        guid: this.GUID,
      });
    },
    
  },
  async created() {
    // console.log(Guid.newGuid().StringGuid);
    
    let sendOption = {
      tableName: this.tableName,
      guid: this.GUID,
    };
    this.$store.dispatch('DataTable/CREATE_DATA_TABLE_SPACE', sendOption);
    this.eventCreatedComponent({
      guid: this.GUID,
    })
    if (this.storeGetOptionsCount() == 0) {
      await this.$store.dispatch('DataTable/REQUEST_OPTIONS', sendOption)
        .then(() => {
          this.storeDispatchRequestData({next: false})
          return;
        });
    }
    console.log(this.storeGetDataCount());
    if (this.storeGetDataCount() < 30) {
      console.log('load data');
      this.storeDispatchRequestData({next: false});
    }
  },
  beforeDestroy() {
    this.$store.dispatch('DataTable/DELETE_DATA_TABLE_SPACE', {
      tableName: this.tableName,
      guid: this.GUID,
    })
  },
  methods: {
    storeGetStatusProcessing() { return this.$store.getters[`DataTable/GET_STATUS_PROCESSING`]({
      tableName: this.tableName,
      guid: this.GUID,
    }); },
    storeGetHierarchyMode() { return this.$store.getters[`DataTable/GET_HIERARCHY_MODE`](this.tableName); },
    
    storeGetBaseDataCount() { return this.$store.getters[`DataTable/GET_DATA_COUNT_TOTAL`](this.tableName); },


    storeGetOptions() { return this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName); },
    storeGetOptionsCount() { return Object.keys(this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName)).length; },

    storeGetDataCount() {
      return this.$store.getters[`DataTable/GET_DATA`]({
        tableName: this.tableName,
        guid: this.GUID,
      }).length; 
    },
    storeGetDataApiNext() {
      return this.$store.getters[`DataTable/GET_ADDRESS_API_PAGE_NEXT`]({
        tableName: this.tableName,
        guid: this.GUID,
      });
    },
    
    storeGetDataGroupLevel() {
      return this.$store.getters['DataTable/GET_DATA_GROUP_LEVEL']({
        tableName: this.tableName,
        guid: this.GUID,
      });
    },

    storeDispatchRequestData(option) { 
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {
        tableName: this.tableName,
        guid: this.GUID,
        next: option.next,
      }); 
    },

  }
}