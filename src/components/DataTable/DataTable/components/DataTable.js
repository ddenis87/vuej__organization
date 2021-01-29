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
          return value;
        case 'date': {
          // console.log(value);
          if (value == '') return value;
          let [yyyy, mm, dd] = value.split('-');
          if ('related_model_view' in properties) {
            let newValue = properties.related_model_view;
            newValue = newValue.replace(`{yyyy}`, yyyy);
            newValue = newValue.replace(`{mm}`, mm);
            newValue = newValue.replace(`{dd}`, dd);
            return newValue;
          }
          return `${dd}.${mm}.${yyyy}`;
        }
        // case 'boolean':
        //   return value;
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