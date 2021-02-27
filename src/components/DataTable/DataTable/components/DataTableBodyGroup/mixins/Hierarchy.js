export const Hierarchy = {
  data() {
    return {
      // currentParent: null,
      // listGroup: [],
    }
  },
  watch: {

  },
  updated() {
    // this.listGroup.forEach(element => {
    //   if (document.querySelector(`.body-column__group[data-id="${element}"]`))
    //     document.querySelector(`.body-column__group[data-id="${element}"]`).querySelector('.action-btn').classList.add('action-btn_action');
    // });
  },
  methods: {
    toggleHiaerarchy(event, option) {
      // console.log('out group');
      // console.log(event);
      console.log(option);
      // let listGroup = this.$store.getters[`DataTable/GET_DATA_GROUP`](this.tableName);
      // let indexGroup = listGroup.findIndex(item => item.id == option.id);
      // console.log(indexGroup);
      let sendOption = {
        tableName: this.tableName,
        id: option.id,
      };
      this.$store.commit('DataTable/DATA_GROUP_MODIFY', sendOption);
      let listGroup = this.$store.getters[`DataTable/GET_DATA_GROUP`](this.tableName);

      if (listGroup.length == 0) {
        sendOption = {
          tableName: this.tableName,
          group: {id: null},
        };
      } else {
        sendOption = {
          tableName: this.tableName,
          group: {id: listGroup[listGroup.length - 1].id},
        };
      }
      this.$store.commit('DataTable/SET_FILTER_PARENT', sendOption);
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
    },
  }
}