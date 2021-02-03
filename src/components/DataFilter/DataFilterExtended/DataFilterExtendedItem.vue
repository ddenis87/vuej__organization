<template>
  <div class="item">
    <template v-if="!isTitle">
      <div class="item-compare">
          <el-field-choice-compare :input-properties="inputProperties"
                                   @input-value="inputValueCompare"></el-field-choice-compare>
      </div>
      <div class="item-data">
        <component :is="componentField"
                   is-label
                   :is-required="false"
                   :is-disabled="isDisabledData"
                   :is-btn-clear="true"
                   :is-single-line="false"
                   :input-properties="inputProperties"
                   @input-value="inputValueData"
                   @input-value-blur="inputValueDataBlur"></component>
      </div>
    </template>
    <template v-else>
      <div class="item-compare">{{ inputTitle[0] }}</div>
      <div class="item-data">{{ inputTitle[1] }}</div>
    </template>
  </div>
</template>

<script>
import ElFieldChoiceCompare from '@/components/Elements/ElField/ElFieldChoiceCompare.vue'


export default {
  name: 'DataFilterExtendedItem',
  components: {
    ElFieldChoiceCompare
  },
  props: {
    isTitle: { type: Boolean, default: false },
    inputTitle: { type: Array, default:() => ['', ''] },
    inputProperties: { type: Object, default:() => { type: null } },
  },
  data() {
    return {
      isDisabledData: true,
      valueCompare: null,
      filterProperties: {
        option: null,
        value: null,
      }
    }
  },
  computed: {
    componentField() {
      switch(this.inputProperties.type) {
        case 'date': return () => import('@/components/Elements/ElField/ElFieldDate.vue');
        case 'string': return () => import('@/components/Elements/ElField/ElFieldString.vue');
        case 'integer': return () => import('@/components/Elements/ElField/ElFieldNumber.vue');
        case 'boolean': return () => import('@/components/Elements/ElField/ElFieldSwitch.vue');
        case 'choice': return () => import('@/components/Elements/ElField/ElFieldChoice.vue');
        // case 'field': return () => import('@/components/Elements/ElField/ElFieldDialog.vue');
        default: return null;
      }
    },
  },
  methods: {
    inputValueCompare(option) {
      this.filterProperties.option = this.computedLineCompare(option);
      this.buildingFilterLine();
      this.isDisabledData = false;
    },
    inputValueData(option) {
      // console.log(option);
      // console.log(this.computedLineData(option));
      this.filterProperties.value = this.computedLineData(option);
      switch(this.inputProperties.type) {
        case 'data':
        case 'choice':
        case 'field': this.buildingFilterLine();
      }
    },
    inputValueDataBlur(option) {
      this.buildingFilterLine();
    },
    computedLineCompare(option) {
      let key = this.inputProperties.key;
      this.valueCompare = option;
      switch(option) {
        case 'equally': return `${key}=`;
        case 'more': return `${key}__gte=`;
        case 'moreOrEqually': return `${key}__gte=`
        case 'less': return `${key}__lte=`;
        case 'lessOrEqually': return `${key}__lte=`;
        case 'inList': return `${key}__in=`;
        case 'contains': return 'search=';
        case 'between': return [`${key}__gte=`, `${key}__lte=`];
        default: return null;
      }
    },
    computedLineData(option) {
      let type = this.inputProperties.type;
      switch(this.valueCompare) {
        case 'equally':
        case 'moreOrEqually':
        case 'lessOrEqually':
        case 'contains': return this.computedLineDataString(option);
        case 'more': return this.computedLineDataString(+option + 1);
        case 'less': return this.computedLineDataString(+option - 1);
        default: return null;
      }
    },
    computedLineDataString(option) {
      switch(this.inputProperties.type) {
        case 'string':
        case 'integer':
        case 'data': return option;
        case 'choice': return option.value;
        default: null;
      }
    },
    buildingFilterLine() {
      console.log(this.filterProperties); // EMIT
    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: grid;
  grid-template-areas: "compare data";
  grid-template-columns: 202px 1fr;
  grid-template-rows: 40px;
  align-items: center;
  gap: 0px 15px;
  padding-bottom: 12px;
  &:last-child { padding-bottom: 0px; }
  &-compare {
    grid-area: compare;

  }
  &-data {
    grid-area: data;
  }
}
</style>