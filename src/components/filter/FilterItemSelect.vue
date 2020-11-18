<template>
  <v-select :label="item.label" 
            :items="item.choices" 
            item-text="display_name" 
            item-value="value" 
            v-model="valueSelect" 
            @input="$emit('input', item.key, valueSelect)"></v-select>
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
    clearSelect() { this.valueSelect = null; }
  }
}
</script>