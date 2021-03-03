import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';
import DialogFullPage from '@/components/Dialogs/DialogFullPage.vue';

export const DataTableControlActions = {
  components: {
    ElButtonIcon,
    DialogFullPage,
  },
  props: {
    tableName: { type: String, default: null },
    guid: null,
    elementFocused: { type: Object, default() { return null } },
  },
  data() {
    return {
      isOpenDialog: false,
      typeElement: 'element',
    }
  },
  computed: {
    componentFormTable() {
      let componentFormTable = '';
      if (!this.tableName) return null;
      this.tableName.split('-').forEach(item => {
        componentFormTable += item[0].toUpperCase() + item.slice(1);
      })
      return () => import(`@/components/TheTableForm/TheTableForm${componentFormTable}`);
    },
    componentForm() {
      if (!this.tableName) return null;
      if (this.typeElement == 'element')
        return () => import(`@/components/TheTableForm/TheTableForm${this.tableName[0].toUpperCase() + this.tableName.slice(1)}`);
      else 
        return () => import(`@/components/TheTableForm/TheTableForm${this.tableName[0].toUpperCase() + this.tableName.slice(1)}Group`);
    },
    isMarkDeletedRecord() { return (this.elementFocused) ? this.elementFocused.is_deleted : false; },
  },
  methods: {
    eventOpenForm() {
      this.isOpenDialog = true;
    },
    eventCloseDialog() {
      this.isOpenDialog = false;
      this.$emit('blur-element');
    },


    eventActionAccept(option) {
      let sendOption = {
        tableName: this.tableName,
      };
      Object.assign(sendOption, option);
      if (sendOption.actionName == 'editing') {
        sendOption.elementId = option.values.id;
        delete sendOption.values.id;
      }
      let bFormData = new FormData();
      for (let key of Object.keys(sendOption.values)) {
        if (sendOption.values[key])
          bFormData.set(`${key}`, `${sendOption.values[key]}`);
      };
      sendOption.formData = bFormData;
      delete sendOption.values;
      if (sendOption.actionName == 'editing') 
        this.$store.dispatch(`DataTable/UPDATE_ELEMENT`, sendOption);
      if (sendOption.actionName == 'adding') 
        this.$store.dispatch(`DataTable/ADDING_ELEMENT`, sendOption);

      // this.$store.dispatch(`DataTable/REQUEST_DATA_${sendOption.actionName.toUpperCase()}`, sendOption);
      this.eventCloseDialog();
    },
    eventActionCancel() {
      this.eventCloseDialog();
    },
  }
}