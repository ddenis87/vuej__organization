<template>
  <!-- @click.stop -- no slide list -->
  <div class="el-field" :class="{'el-field_single-line': isSingleLine, 'el-field_hide-message': isHideMessage}">
    <v-autocomplete class="el-field__item"
                    dense
                    return-object
                    no-data-text="Значение отсутствует"
                    tabindex="1"
                    full-width
                    :single-line="isSingleLine"
                    :hide-details="isHideMessage"
                    :disabled="isDisabled"
                    :label="fieldLabel"
                    :items="fieldItems"
                    :item-text="'display_name'"
                    :item-value="'value'"
                    v-model="fieldValue"
                    @click.stop
                    @input="eventInputValue"
                    @change="eventChangeValue"
                    
                    @keydown.enter="eventKeyEnter"
                    @keydown.tab="eventKeyTab"
                    @keydown.esc="eventKeyEsc"
                    @keydown.stop
                    @blur="eventBlurField">
      <!-- <template v-slot:item>
        <v-menu  z-index="999" min-width="200" max-width="600" offset-overflow>
          1234
        </v-menu>
      </template> -->
      <template v-slot:append-outer v-if="isBtnClear">
        <v-btn icon small tabindex="2">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFiledChoice',
  mixins: [
    ElField,
  ],
  data() {
    return {
      isEmit: false,
      pX: 0,
      pY: 0,
      isChangeValue: false,
    }
  },
  computed: {
    fieldItems() { return this.inputProperties.choices; },
    fieldAttach() {
      switch(this.isUse) {
        case 'table':{
      //     console.log(document.querySelector('.content-editing').getBoundingClientRect());
      //     let fieldAttach = document.querySelector('.content-editing').getBoundingClientRect();
      //     this.pX = fieldAttach.clientX;
      //     this.pY = fieldAttach.clientY + 40;
          return document.querySelector('.content-editing');
        }
      }
    },
  },
  mounted() {
    let fieldInput = document.querySelector(`.content-editing .v-select__slot input`);
    if (!fieldInput) return;
    setTimeout(() => {
      fieldInput.focus();
      // if (this.isSelected) fieldInput.select();
    }, 10);
  },
  methods: {
    eventInputValue(event) {
      console.log(event);
    },
    eventChangeValue(event) {
      this.isChangeValue = true;
      console.log(event);
    },
    eventKeyEnter(event) {
      if (this.isChangeValue) {
        let sendOption = {
          key: event.key,
          value: this.fieldValue,
        }
        // if (this.isUse == 'table' && document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
        // event.preventDefault();
        event.stopImmediatePropagation()
        this.isEmit = true;
        this.emitKeyEnter(sendOption);
      }
    },
    eventKeyTab(event) {
      let sendOption = {
        key: event.key,
        shift: event.shiftKey,
        value: this.fieldValue,
      }
      // if (this.isUse == 'table' && document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
      this.isEmit = true;
      this.emitKeyTab(sendOption);
    }
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
.el-field__item-list {
  color: green;
}
</style>