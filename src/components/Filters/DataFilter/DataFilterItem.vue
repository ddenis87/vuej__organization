<template>
  <div class="data-filter-item">
    <div class="item-checkbox">
      <v-checkbox dense
                  v-model="isFilterOn"></v-checkbox>
    </div>
    <div class="item-compare">
      <st-field-compare :input-properties="properties"
                        :is-disabled="isDisabledData || !valueCompare"
                        v-model="valueCompare"
                        @input-value="inputValue"></st-field-compare>
    </div>
    <div class="item-data">
      <component :is="componentField"
                 :is-required-off="true"
                 :input-properties="properties"
                 v-model="valueFilter"
                 @input-value="inputValue"></component>
    </div>
  </div>
</template>

<script>
import StFieldCompare from '@/components/Elements/StField/StFieldCompare.vue';
export default {
  name: 'DataFilterItem',
  components: {
    StFieldCompare,
  },
  props: {
    properties: { type: Object, default() { return { type: null, key: null } } },
  },
  data() {
    return {
      isFilterOn: false,
      isDisabledData: true,
      valueFilter: null,
      valueCompare: null,

    }
  },
  computed: {
    componentField() {
      switch(this.valueCompare) {
        default: {
          return this.componentByType(this.properties.type);
        }
      }
    },
  },
  mounted() {

  },
  methods: {
    inputValue() {
      if (this.valueFilter)
        this.$emit('input-filter', {key: this.properties.key, compare: this.valueCompare, value: this.valueFilter});
    },
    componentByType(type) {
      switch(type) {
        case 'string': return () => import('@/components/Elements/ElField/ElFieldString.vue');
        case 'integer': return () => import('@/components/Elements/ElField/ElFieldNumber.vue');
        case 'boolean': return () => import('@/components/Elements/ElField/ElFieldSwitch.vue');
        case 'choice': return () => import('@/components/Elements/ElField/ElFieldChoice.vue');
        case 'date': return () => import('@/components/Elements/ElField/ElFieldDate.vue');
        case 'datetime': return () => import('@/components/Elements/ElField/ElFieldDateTime.vue');
        case 'field': return () => import('@/components/Elements/ElField/ElFieldDialog.vue');
      }
    },
    
  }
}
</script>

<style lang="scss" scoped>
.data-filter-item {
  display: grid;
  grid-template-areas: "item-checkbox item-compare item-data";
  grid-template-columns: 34px 202px 1fr;
  grid-template-rows: 40px;
  align-items: flex-end;
  gap: 0px 15px;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0px; }
  .item-checkbox {
    grid-area: item-checkbox;
    margin-bottom: -16px;
    padding-left: 8px;
  }
  .item-compare {
    grid-area: item-compare;
    margin-bottom: -16px;
  }
  .item-data {
    grid-area: item-data;
    margin-bottom: -16px;
  }
}
</style>