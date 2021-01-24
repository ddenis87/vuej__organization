export const DataTable = {
  computed: {
    computedActionMax() { return (this.typeHeight != 'auto' && this.isExpansion == true) ? true : false; },
  },
  methods: {
    gettingValueForType(properties, value) {
      switch(properties.type) {
        case 'string':
        case 'integer':
          return value;
        case 'choice':
          return value['display_name'];
        case 'field': {
          let objectValue = properties.related_model_view;
          if (Array.isArray(objectValue.field)) {
            let newValue = '';
            objectValue.field.forEach((element, index) => {
              newValue += value[element];
              if (index != objectValue.field.length - 1) newValue += objectValue.delimiter;
            });
            return newValue;
          } else {
            return this.value[objectValue.field];
          }
        }
      }
    },
  }
}