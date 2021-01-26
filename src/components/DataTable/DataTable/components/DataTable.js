export const DataTable = {
  computed: {
    computedActionMax() { return (this.typeHeight != 'auto' && this.isExpansion == true) ? true : false; },
  },
  methods: {
    gettingValueForType(properties, value) {
      if (value == null) return '';
      switch(properties.type) {
        case 'string':
        case 'integer':
        case 'date':
          return value;
        case 'choice':
          return value['display_name'];
        case 'field': {
          let newValue = properties.related_model_view;
          let templateValue = properties.related_model_view.match(/[{\w}]/gi).join(',').replace(/,/g, '').slice(1, -1).split('}{');
          templateValue.forEach(element => {
            newValue = newValue.replace(`{${element}}`, value[element]);
          });
          return newValue;
        }
      }
    },
  }
}