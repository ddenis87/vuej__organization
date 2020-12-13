<template>
  <!-- <v-autocomplete dense 
                  v-model="cellValue" 
                  :items="selectList"
                  ></v-autocomplete> -->
  <!-- <input type="text" value="test" /> -->
  <v-autocomplete
            v-model="values"
            :items="items"
            outlined
            dense
            chips
            small-chips
            label="Outlined"
            multiple
          ></v-autocomplete>
</template>

<script>
export default {
  name: 'CellDefaultEditingSelect',
  props: {
    dataValue: String,
    dataList: Array,
  },
  // computed: {
  //   selectList() {
  //     // console.log(this.dataValue);
  //     // console.log(this.dataList);
  //     // return this.dataList;
  //   }
  // },
  data() {
    return {
  //     // cellValue: this.dataValue,
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: ['foo', 'bar'],
      value: null,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>