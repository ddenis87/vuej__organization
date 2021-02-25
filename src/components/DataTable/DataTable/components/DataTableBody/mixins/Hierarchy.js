export const Hierarchy = {
  data() {
    return {
      currentParent: null,
    }
  },
  watch: {

  },
  methods: {
    toggleHiaerarchy(option) {
      let sendOption = {
        tableName: this.tableName,
        id: option.id,
      }
      if (this.currentParent == option.id) sendOption.id = null;
      this.currentParent = sendOption.id;
      this.$store.commit('DataTable/SET_FILTER_PARENT', sendOption);
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
    },
  }
}