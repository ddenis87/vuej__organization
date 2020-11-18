<template>
  <v-col cols="12" class="select-item">
    <v-select :label="item.label" 
              :items="item.choices" 
              item-text="display_name" 
              item-value="value" v-model="valueSelect" @input="selectItem(item.key, valueSelect)"></v-select>
  </v-col>
</template>

<script>
export default {
  name: 'FilterItemSelect',
  props: {
    item: Object,
  },
  data() {
    return {
      valueSelect: null,
    }
  },
  methods: {
    selectItem(key, value) {
      let valueSelect = {[key]: value};
      this.$emit('input', valueSelect);
    }
  }
}
</script>

<style lang="scss" scoped>
.select-item {
  padding: 0px;
  height: 25px;
}
</style>