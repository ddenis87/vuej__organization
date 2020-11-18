<template>
  <div class="filter-item">
    <div class="filter-item__select">
      <filter-item-select :item="item" ref="filterSelect" v-model="valueSelect" @input="selectItem"></filter-item-select>
    </div>
    <div class="filter-item__btn">
      <filter-item-button :key="item.key" :isShow="valueSelect" @click="clearSelect(item.key)"></filter-item-button>
    </div>
  </div>
</template>

<script>
import FilterItemSelect from '@/components/filter/FilterItemSelect.vue';
import FilterItemButton from '@/components/filter/FilterItemButton';


export default {
  name: 'FilterItem',
  components: { 
    FilterItemSelect,
    FilterItemButton
  },
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
    },
    clearSelect(key) {
      this.$refs.filterSelect.clearSelect();
      this.valueSelect = null;
      this.$emit('clear', key);
    },
  }
}
</script>

<style lang="scss" scoped>
.filter-item {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  &__select {
    width: 100%;
    height: 50px;
    padding: 0px;
  }
  &__btn {
    width: 65px;
    padding-top: 15px;
    text-align: center;
  }
}
</style>