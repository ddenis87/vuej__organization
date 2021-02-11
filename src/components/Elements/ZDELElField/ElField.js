export const ElField = {
  model: {
    prop: 'inputValue',
    event: 'input-value'
  },
  props: {
    isDense: { type: Boolean, default: true, },
    isSingleLine: { type: Boolean, default: true, },  // show or hide label
    isLabel: { type: Boolean, default: false, },  // hidden or show label
    isShowValidation: {type: Boolean, default: false}, // hidden or show validation error
    isRequired: {type: Boolean, default: true},
    isBtnClear: {type: Boolean, default: false},
    isDisabled: { type: Boolean, default: false },
    isValueSelected: {type: Boolean, defalt: false},  // selected value in text field after mounted
    isValueFocus: {type: Boolean, defalt: false},
    inputProperties: {
      type: Object,
      default() {
        return {
          label: '',
          required: { type: Boolean, default: false },
        }
      }
    },
    inputValue: '',
  },
  data() {
    return {
      isEmit: false,
      fieldValue: this.inputValue,
      rules: {
        required(value) { return !!value || false; },
      },
    }
  },
  computed: {
    fieldLabel() { if (this.isLabel) return this.inputProperties.label; return; },
    fieldMaxLength() { return ('max_length' in this.inputProperties) ? this.inputProperties['max_length'] : Infinity; },
    fieldRequired() { return (this.inputProperties.required && this.isRequired) ? true : false; },

    isFieldValue() { return (this.fieldValue == null) ? true : false },
  },
  watch: {
    inputValue() { this.fieldValue = this.inputValue; }, 
  },
  methods: {
    // EVENTS ON COMPONENT
    clearValue() {
      this.fieldValue = null;
      this.emitClearValue();
    },
    keydownEsc() { this.isEmit = true; this.emitCanceled(); },
    keydownEnterTab(event) {
      this.isEmit = true;
      let sendOption = {
        key: event.key,
        shift: event.shiftKey,
        value: this.fieldValue,
      }
      this.emitAccepted(sendOption);
    },
    blurComponent() { if (this.isEmit == false) { this.emitCanceled(); } },

    // EVENTS EMITTED COMPONENT
    emitAccepted(option) {
      this.emitInputValue(option.value) // for form
// ----------
      // this.emitInputValue() // for form
// ----------
      this.emitEnterValue() // for form
      this.$emit('editing-accepted', option); // for table
    },
    emitCanceled() { this.$emit('editing-canceled');  },
    emitInputValue(option) { this.$emit('input-value', option); }, //this.fieldValue); }, // for form, emit only value
// ----------
    // emitInputValue(option) { this.$emit('input-value', this.fieldValue); }, // for form, emit only value
// ----------
    emitClearValue() {
      // this.fieldValue = null;
      this.emitInputValue();
      this.$emit('keydown-clear'); // for form
    },
    emitEnterValue() {
      this.$emit('keydown-enter', this.fieldValue); // for form
    }
  }
}