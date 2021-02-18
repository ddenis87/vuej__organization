import ElBtnIconSmall from '@/components/Elements/ElBtnIconSmall.vue';
import ElBtn from '@/components/Elements/ElBtn.vue';

export const ElField = {
  model: {
    prop: 'inputValue',
    event: 'input-value',
  },
  components: {
    ElBtnIconSmall,
    ElBtn,
  },
  props: {
    // isUse: { type: String, default: 'form', },         // where use component
    isSingleLine: { type: Boolean, default: false, },  // show or hide label
    isRequiredOff: { type: Boolean, default: false },  // 
    isHideMessage: { type: Boolean, default: false },  // hidden or show validation error
    isHideLabel: { type: Boolean, dafault: false },    // hidden or show label
    isHideUnderline: { type: Boolean, dafault: false },
    isDisabled: { type: Boolean, default: false },     // 
    isSelected: { type: Boolean, defalt: false },      // selected value in text field after mounted
    isBtnClear: { type: Boolean, default: true },     // hidden or show button clear

    inputProperties: Object,
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
    fieldLabel() { if (!this.isHideLabel) return this.inputProperties.label; return; },
    fieldRequired() { return (this.inputProperties.required && !this.isRequiredOff) ? true : false; },
    fieldMaxLength() { return ('max_length' in this.inputProperties) ? this.inputProperties['max_length'] : Infinity; },
  },
  watch: {
    inputValue() { this.fieldValue = this.inputValue; }, 
  },
  mounted() {
    let inputElement = null;
    switch (this.inputProperties.type) {
      case 'string':
      case 'integer': 
      case 'date':
      case 'datetime': inputElement = document.querySelector(`.content-editing .v-text-field__slot input`); break;
      case 'choice': 
      case 'field': inputElement = document.querySelector(`.content-editing .v-select__slot input`); break;
    };
    if (!this.isSelected) return;
    setTimeout(() => {
      inputElement.setSelectionRange(0, 0);
      inputElement.select();
      inputElement.focus();
    }, 10);
  },
  methods: {
    // METHODS ---------------------//
    eventKeyTab(event) {
      if (this.checkRequiredField(event)) return;
      
      let sendOption = {
        key: event.key,
        shift: event.shiftKey,
        value: this.fieldValue,
        event: event,
      }
      this.isEmit = true;
      this.emitKeyTab(sendOption);
    },
    checkRequiredField(event) {
      if (this.inputProperties.required && !this.isRequiredOff) {
        if (event.key == 'Tab') event.preventDefault();
        if (!this.fieldValue) {
          this.isEmit = true;
          setTimeout(() => {
            event.target.focus();
            this.isEmit = false;
          }, 100);
          return true;
        }
      }
      return false;
    },
    // ------- ---------------------//

    // EVENTS --------------------- //
    eventInputValue() { this.emitInputValue(); },

    eventKeyEsc() { this.isEmit = true; this.emitKeyEsc(); },
    eventClearValue() {
      this.fieldValue = null;
      this.emitInputValue();
      this.emitClearValue();
    },
    eventFocusField() { this.emitFocusField(); },
    eventBlurField() {
      if (!this.isEmit) this.emitBlurField();
    },
    // ------ --------------------- //

    // EMITS ---------------------- //
    emitInputValue(option = this.fieldValue) { this.$emit('input-value', option); },
    emitKeydown(event) { this.$emit('keydown-any', event); },
    emitKeyEnter(option = null) { this.$emit('keydown-enter', option); },
    emitKeyTab(option = null) { this.$emit('keydown-tab', option); },
    emitKeyEsc() { this.$emit('keydown-esc'); },
    emitClearValue() { this.$emit('clear-value'); },
    
    emitNextElement(option) { this.$emit('next-element', {event: option}); },

    emitFocusField() { this.$emit('focus-field') },
    emitBlurField() { this.$emit('blur-field') },
    // ----- ---------------------- //
  },
}