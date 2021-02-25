export const Hierarchy = {
  data() {
    return {
      currentParent: null,
      isIntoGroup: false,

    }
  },
  watch: {
    // isIntoGroup() {
    //   if (this.isIntoGroup) {
    //     this.$store.commit('SET_FILTER_INTO_GROUP', true);
    //   } else {
    //     this.$store.commit('SET_FILTER_INTO_GROUP', false);
    //   }
    // },
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