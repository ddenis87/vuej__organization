import ElFieldNumber from '@/components/Elements/ElField/ElFieldNumber.vue';
import ElFieldString from '@/components/Elements/ElField/ElFieldString.vue';
import ElFieldDate from '@/components/Elements/ElField/ElFieldDate.vue';
import ElFieldDateTime from '@/components/Elements/ElField/ElFieldDateTime.vue';
import ElFieldChoice from '@/components/Elements/Field/ElFieldChoice.vue';
import ElFieldDialog from '@/components/Elements/ElField/ElFieldDialog.vue';
import ElButton from '@/components/Elements/ElButton.vue';

export const TheTableForm = {
  components: {
    ElFieldNumber,
    ElFieldString,
    ElFieldDate,
    ElFieldDateTime,
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
    },
    eventClickActionAccept() {
      
      if (!this.fieldFormValueValidation()) return;
      // if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
      let option = {actionName: (this.focusedElement == null) ? 'adding' : 'editing', values: {}};
      Object.assign(option.values, this.fieldFormValue);
      for (let key of Object.keys(option.values)) {
        if (option.values[key] != null) {
          if (typeof(option.values[key]) == 'object') {
            console.log(option.values[key]);
            if ('id' in option.values[key]) option.values[key] = option.values[key].id;
            else option.values[key] = option.values[key].value;
          }
        }
      }
      // console.log(option.values);
      this.$emit('event-action-accept', option);
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