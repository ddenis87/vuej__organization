export const LoadingComponent = {
  created() {
    this.$store.dispatch('DataTable/GET_LIST_OPTION', { tableName: this.properties.tableName });
  }
}