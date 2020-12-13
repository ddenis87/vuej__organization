<template>
  <v-autocomplete dense id="boxEditingComponentSelect"
  class="box-editing-component select"
                  tabindex="10"
                  v-model="cellValue" 
                  :items="cellList"
                  @keydown="inputEvent" 
                  @blur="blurInput" @change="changeValue"></v-autocomplete>
</template>

<script>
export default {
  name: 'CellDefaultEditingSelect',
  props: {
    dataValue: null,
    dataList: null,
  },
  computed: {
    cellList() {
      let cellList = [];
      this.dataList.forEach(element => {
        cellList.push({text: element['display_name'], value: element['display_name']})
      })
      return cellList;
    },
  },
  data() {
    return {
      cellValue: this.dataValue,
      cellChange: false,
    }
  },
  methods: {
    inputEvent(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        return;
      } 
      this.$emit('input-event', event, this.cellValue);
    },
    blurInput(event) {
      event.preventDefault();
      this.$emit('input-blur', event);
    },
    changeValue() {
      this.$emit('input-input', event, this.cellValue);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>