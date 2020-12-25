export const Events = {
  methods: {
    itemSelected(event, option) {
      // console.log('item selected');
      // console.log(event);
      // console.log(option);
      this.$emit('item-selected', event, option);
    }
  },
}