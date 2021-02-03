<template>
  <div class="item">
    <template v-if="!isTitle">
      <div class="item-compare">
          <el-field-choice-compare :input-properties="inputProperties"
                                   v-model="valueCompare"></el-field-choice-compare>
      </div>
      <div class="item-data">
        <component :is="componentField"
                   is-label
                   :is-required="false"
                   :is-disabled="isDisabledData"
                   :is-btn-clear="true"
                   :is-single-line="false"
                   :input-properties="inputProperties"
                   @keydown-clear="resetComponent"></component>
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
      valueCompareArray: {
        'equally': '=',
        'more': '__gte=',
        'moreOrEqually': '__gte=',
        'less': '__lte=',
        'lessOrEqually': '__lte=',
        'inList': '__in=',
        'between': ['__gte=', '__lte='],
      },
      valueData: null,
      filterProperties: {
        compare: null,
        value: null,
      }
    }
  },
  computed: {
    componentField() {
      let key = this.inputProperties.key;
      this.filterProperties.compare = `${key}${this.valueCompareArray[this.valueCompare]}`;  //  SET COMPARE EQUALLY
      switch(this.valueCompare) {
        case 'equally': {
          this.isDisabledData = false;
          return this.componentByTypeDefault(this.inputProperties.type);
        }
        case 'more':
        case 'moreOrEqually':
        case 'less':
        case 'lessOrEqually': {
          this.isDisabledData = false;
          return this.componentByTypeDefault(this.inputProperties.type);
        }
        case 'inList': {
          return null;
          // this.isDisabledData = false;
          // switch(this.inputProperties.type) {
          //   case 'choice': return () => import('@/components/Elements/ElField/ElFieldChoice.vue');
          //   case 'date': return () => import('@/components/Elements/ElField/ElFieldDate.vue');
          //   case 'field': return () => import('@/components/Elements/ElField/ElFieldDialog.vue');
          // }
        }
        case 'between': {
          this.isDisabledData = false;
          switch(this.inputProperties.type) {
            case 'integer': return () => import('@/components/Elements/ElField/ElFieldNumberRange.vue');
            case 'date': return () => import('@/components/Elements/ElField/ElFieldDateRange.vue');
          }
        }
        default: {
          return this.componentByTypeDefault(this.inputProperties.type);
        }
      }
    },
  },
  methods: {
    componentByTypeDefault(type) {
      switch(type) {
        case 'string': return () => import('@/components/Elements/ElField/ElFieldString.vue');
        case 'integer': return () => import('@/components/Elements/ElField/ElFieldNumber.vue');
        case 'boolean': return () => import('@/components/Elements/ElField/ElFieldSwitch.vue');
        case 'choice': return () => import('@/components/Elements/ElField/ElFieldChoice.vue');
        case 'date': return () => import('@/components/Elements/ElField/ElFieldDate.vue');
        case 'field': return () => import('@/components/Elements/ElField/ElFieldDialog.vue');
      }
    },
    resetComponent() {
      this.valueCompare = null;
      this.isDisabledData = true;
    },
    eventInputCompare() {

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