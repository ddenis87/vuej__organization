<template>
  <div class="content-display"
       :class="`content-display_${typeHeight}`"
       :style="`text-align: ${properties['align']}`">
    {{ displayValue }}
  </div>
</template>

<script>
export default {
  name: 'ContentDisplay',
  props: {
    value: null,
    properties: { type: Object, default: () => {} },
    typeHeight: { type: String, default: 'fixed' },
  },
  computed: {
    displayValue() {
      switch(this.properties.type) {
        case 'string':
        case 'integer':
          return this.value;
        case 'choice':
          return this.value['display_name'];
        case 'field': {
          let objectValue = this.properties.related_model_view;
          if (Array.isArray(objectValue.field)) {
            let newValue = '';
            objectValue.field.forEach((element, index) => {
              newValue += this.value[element];
              if (index != objectValue.field.length - 1) newValue += objectValue.delimiter;
            });
            return newValue;
          } else {
            return this.value[objectValue.field];
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content-display {
  width: 100%;
  -webkit-user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;
  &_fixed {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &_dense { white-space: nowrap; }
  &_auto { 
    display: block;
    -webkit-box-orient: unset;
    white-space: unset;
  }
}
</style>