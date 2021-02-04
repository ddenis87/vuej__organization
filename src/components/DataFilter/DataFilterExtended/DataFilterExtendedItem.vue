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
                   :is-disabled="isDisabledData || !valueCompare"
                   :is-btn-clear="true"
                   :is-single-line="false"
                   :input-properties="inputProperties"
                   v-model="valueData"
                   @input-value="eventInputData"
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
        // 'more': '__gte=',
        'moreOrEqually': '__gte=',
        // 'less': '__lte=',
        'lessOrEqually': '__lte=',
        'inList': '__in=',
        'between': ['__gte=', '__lte='],
      },
      valueData: null,
    }
  },
  computed: {
    componentField() {
      this.valueData = null;
      let valueDefault = {key: this.inputProperties.key, value: (this.inputProperties.type == 'boolean') ? 
        `${this.computedLineCompare(this.valueCompare)}false` : null};
      // console.log(valueDefault);
      this.$emit('input-filter', valueDefault); //  EMIT ---------------<<<<<<<<<<<<
      switch(this.valueCompare) {
        case 'inList': {
          return null;
        }
        case 'between': {
          this.isDisabledData = false;
          switch(this.inputProperties.type) {
            case 'integer': return () => import('@/components/Elements/ElField/ElFieldRangeNumber.vue');
            case 'date': return () => import('@/components/Elements/ElField/ElFieldRangeDate.vue');
          }
        }
        default: {
          this.isDisabledData = false;
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
    computedLineCompare(option) {
      let key = this.inputProperties.key;
      this.valueCompare = option;
      switch(option) {
        case 'equally': return `&${key}=`;
        // case 'more': return `${key}__gte=`;
        case 'moreOrEqually': return `&${key}__gte=`
        // case 'less': return `${key}__lte=`;
        case 'lessOrEqually': return `&${key}__lte=`;
        case 'inList': return `&${key}__in=`;
        case 'contains': return `&${key}__contains=`;
        case 'between': return [`&${key}__gte=`, `${key}__lte=`];
        default: return null;
      }
    },
    resetComponent() {
      this.valueCompare = null;
      this.isDisabledData = true;
      this.$emit('input-filter', { key: this.inputProperties.key, value: null }); // EMIT -----------------<<<<<<<<<<
    },
    eventInputCompare() {},

    eventInputData () {
      let emitValue = {};
      switch(this.valueCompare) {
        case 'equally':
        case 'contains': 
        case 'moreOrEqually':
        case 'lessOrEqually': {
          switch(this.inputProperties.type) {
            case 'string':
            case 'integer':
            case 'date': {
              if (!this.valueData) emitValue = { key: this.inputProperties.key, value: null };
              else emitValue = { key: this.inputProperties.key, value: `${this.computedLineCompare(this.valueCompare)}${this.valueData}` }
              break;
            }
            case 'boolean': {
              emitValue = { key: this.inputProperties.key, value: `${this.computedLineCompare(this.valueCompare)}${(this.valueData) ? 'true' : 'false'}`};
              break;
            }
            case 'choice': {
              if (!this.valueData.value) emitValue = { key: this.inputProperties.key, value: null };
              else emitValue = { key: this.inputProperties.key, value: `${this.computedLineCompare(this.valueCompare)}${this.valueData.value}` }
              break;
            }
            case 'field': { break; } // WAIT
          }
          break;
        }
        case 'between': {
          if (!this.valueData.start || !this.valueData.end) {
            emitValue = { key: this.inputProperties.key, value: null };
            break;
          }
          let newValueData = [];
          newValueData.push(`${this.computedLineCompare(this.valueCompare)[0]}${this.valueData.start.split('.').reverse().join('-')}`);
          newValueData.push(`${this.computedLineCompare(this.valueCompare)[1]}${this.valueData.end.split('.').reverse().join('-')}`);
          emitValue = { key: this.inputProperties.key, value: newValueData.join('&')};
          break;
        }
        case 'inList': { break; } // WAIT
      }
      // console.log(emitValue);
      this.$emit('input-filter', emitValue); // EMIT -----------------<<<<<<<<<<
    },
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