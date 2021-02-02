<template>
  <div class="item">
    <template v-if="!isTitle">
      <div class="item-compare">
        <div class="item-compare__item">
          <el-static-field-choice-compare></el-static-field-choice-compare>
        </div>
        
      </div>
      <!-- <div class="item-data"> -->
        <component :is="componentField"
                  is-label
                  :is-required="false"
                  :is-btn-clear="true"
                  :is-single-line="false"
                  :input-properties="inputProperties"></component>
      <!-- </div> -->
    </template>
    <template v-else>
      <div class="item-compare">{{ inputTitle[0] }}</div>
      <div class="item-data">{{ inputTitle[1] }}</div>
    </template>
  </div>
</template>

<script>
import ElStaticFieldChoiceCompare from '@/components/Elements/ElStatic/ElStaticFieldChoiceCompare.vue'


export default {
  name: 'DataFilterExtendedItem',
  components: {
    ElStaticFieldChoiceCompare
  },
  props: {
    isTitle: { type: Boolean, default: false },
    inputTitle: { type: Array, default:() => ['', ''] },
    inputProperties: { type: Object, default:() => { type: null } },
  },
  computed: {
    componentField() {
      switch(this.inputProperties.type) {
        case 'date': return () => import('@/components/Elements/ElField/ElFieldDate.vue');
        case 'string': return () => import('@/components/Elements/ElField/ElFieldString.vue');
        case 'integer': return () => import('@/components/Elements/ElField/ElFieldNumber.vue');
        case 'choice': return () => import('@/components/Elements/ElField/ElFieldChoice.vue');
        // case 'field': return () => import('@/components/Elements/ElField/ElFieldDialog.vue');
        default: return null;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: grid;
  grid-template-areas: "compare data";
  grid-template-columns: 140px 1fr;
  grid-template-rows: 40px;
  align-items: center;
  gap: 0px 15px;
  padding-bottom: 10px;
// border: thin solid red;
  &-compare {
    grid-area: compare;
    // height: 100%;
    // border: thin solid grey;
    &__item {
      // border: thin solid green;
      // height: 30px;
      // overflow: hidden;
    }
  }
  &-data {
    grid-area: data;
    // border: thin solid purple;
  }
}
</style>