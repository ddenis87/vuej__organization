import ElFieldNumber from '@/components/Elements/ElField/ElFieldNumber.vue';
import ElFieldString from '@/components/Elements/ElField/ElFieldString.vue';
import ElFieldDate from '@/components/Elements/ElField/ElFieldDate.vue';
import ElFieldChoice from '@/components/Elements/ElField/ElFieldChoice.vue';
import ElFieldDialog from '@/components/Elements/ElField/ElFieldDialog.vue';
import ElButton from '@/components/Elements/ElButton.vue';

export const TheTableForm = {
  components: {
    ElFieldNumber,
    ElFieldString,
    ElFieldDate,
    ElFieldChoice,
    ElFieldDialog,
    ElButton,
  },
  props: {
    actionName: 'adding',
    focusedElement: Object,
  },
  computed: {
    fieldForm() { 
      let fieldForm = this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName);
      // for (let key of Object.keys(fieldForm)) {
      //   if (fieldForm[key].type == 'nested object') this.$set(fieldForm[key], 'objectValue', 'head_name'); //костыль, надо получать откуда-то
      // }
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
    this.$store.dispatch(`DataTable/REQUEST_OPTIONS`, {tableName: this.tableName});
  },
  methods: {
    assingObject(base, added) {
      return Object.assign(base, added);
    },
    eventClickActionCancel() {
      // if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
      this.$emit('event-action-cancel');
      this.$refs.formAction.reset();
      // this.fieldFormValueClear();
    },
    eventClickActionAccept() {
      
      if (!this.fieldFormValueValidation()) return;
      // if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
      let option = {actionName: (this.focusedElement == null) ? 'adding' : 'editing', values: {}};
      Object.assign(option.values, this.fieldFormValue);
      this.$emit('event-action-accept', option);
      // this.fieldFormValueClear();
      this.$refs.formAction.reset();
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