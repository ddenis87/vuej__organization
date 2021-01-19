import ElFieldNumber from '@/components/elements/ElFieldNumber.vue';
import ElFieldString from '@/components/elements/ElFieldString.vue';
import ElFieldChoice from '@/components/elements/ElFieldChoice.vue';
import ElFieldDialog from '@/components/elements/ElFieldDialog.vue';

export const TableForm = {
  components: {
    ElFieldNumber,
    ElFieldString,
    ElFieldChoice,
    ElFieldDialog,
  },
  props: {
    actionName: 'adding',
    focusedElement: Object,
  },
  computed: {
    fieldForm() { 
      let fieldForm = this.$store.getters[`DataTable/GET_LIST_OPTION`](this.tableName);
      for (let key of Object.keys(fieldForm)) {
        if (fieldForm[key].type == 'nested object') this.$set(fieldForm[key], 'objectValue', 'head_name'); //костыль, надо получать откуда-то
      }
      if (this.focusedElement != null) {
        for (let key of Object.keys(fieldForm)) {
          this.fieldFormValue[key] = this.focusedElement[key];
        }
      }
      return fieldForm;
    },
  },
  watch: {
    focusedElement() {
      if (this.focusedElement == null) this.fieldFormValueClear();
    },
  },
  created() {
    console.log(this.tableName);
    this.$store.dispatch(`DataTable/GET_LIST_OPTION`, {tableName: this.tableName});
  },
  methods: {
    eventClickActionCancel() {
      this.$emit('event-action-cancel');
      this.fieldFormValueClear();
    },
    eventClickActionAccept() {
      if (!this.fieldFormValueValidation()) return;
      let option = {actionName: (this.focusedElement == null) ? 'adding' : 'editing', values: {}};
      Object.assign(option.values, this.fieldFormValue);
      this.$emit('event-action-accept', option);
      this.fieldFormValueClear();
    },
    fieldFormValueValidation() {
      console.log(this.fieldFormValue);
      for (let key of Object.keys(this.fieldFormValue)) {
        if (this.fieldForm[key].required == true && (this.fieldFormValue[key] == '' || this.fieldFormValue[key] == null)) return false;
      }
      return true;
    }
  },
}