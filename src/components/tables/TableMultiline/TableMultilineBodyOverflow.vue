<template>
  <div class="box-overflow" 
       :class="{'box-overflow_cut': cutContent}" 
       :id="`box-overflow-${sequenceOverflowBox}`">
    <button class="box-overflow__button-full" 
            :style="`height: ${heightButtonFull}px;`"
            :disabled="disabledButtonFull"
            v-if="cutContent"
            @click="showFullContent">
      <v-icon class="box-overflow__button-full-item"
              style="position: static;"
              small 
              color="blue">{{ (isShowPrompt) ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
    </button>

    <div class="box-overflow__box-full"
         :class="{'box-overflow__box-full_cut': cutContent}"
         :style="countRowStyle" 
         :id="`box-full-${sequenceOverflowBox}`">
      <slot></slot>
    </div>
    
    <div class="box-overflow__prompt" 
         :style="promptLocation" 
         :id="`prompt-${sequenceOverflowBox}`" v-show="isShowPrompt" tabindex="1"  
         @blur="blurPrompt">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMultilineBodyOverflow',
  props: {
    scrollEvent: {type: Boolean, default: false},
  },
  watch: {
    scrollEvent(newValue, oldValue) {
      this.isShowPrompt = false;
    }
  },
  data() {
    return {
      disabledButtonFull: false,
      heightButtonFull: 25,
      isShowPrompt: false,
      promptLocation: '',
      countRowStyle: '',
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
      cutContent: false,
    }
  },
  created() {
    this.$store.commit('INCREMENT_SEQUENCE_OVERFLOW_BOX');
  },
  mounted() {
    let parentContainer = document.getElementById(`box-overflow-${this.sequenceOverflowBox}`);
    this.heightButtonFull = parentContainer.getBoundingClientRect().height;
    let fullContainer = document.getElementById(`box-full-${this.sequenceOverflowBox}`);
    this.countRowStyle = '-webkit-line-clamp: ' + (parentContainer.getBoundingClientRect().height / 25) + ';';
    (fullContainer.getBoundingClientRect().height > parentContainer.getBoundingClientRect().height) ? this.cutContent = true : this.cutContent = false;
  },
  methods: {
    showFullContent() {
      this.disabledButtonFull = true;
      this.isShowPrompt = !this.isShowPrompt;
      let parentContainer = document.getElementById(`box-overflow-${this.sequenceOverflowBox}`);
      let promptContainer = document.getElementById(`prompt-${this.sequenceOverflowBox}`);
      
      let shiftLeft = (document.documentElement.getBoundingClientRect().width - event.clientX < 400) ?                                                                                  //|
        parentContainer.getBoundingClientRect().left - (400 - (document.documentElement.getBoundingClientRect().width - event.clientX)) : parentContainer.getBoundingClientRect().left; //| Location prompt
      let shiftTop = parentContainer.getBoundingClientRect().top + (parentContainer.getBoundingClientRect().bottom - parentContainer.getBoundingClientRect().top);                      //|
      this.promptLocation = `left: ${shiftLeft}px; top: ${shiftTop}px;`;                                                                                                                //|

      promptContainer.innerText = parentContainer.innerText;
      setTimeout(() => promptContainer.focus(), 100);
    },
    blurPrompt(event) {
      this.isShowPrompt = false;
      setTimeout(() => { this.disabledButtonFull = false }, 300);
    },
  },
}
</script>

<style lang="scss" scoped>
.box-overflow {
  width: inherit;
  height: inherit;
  text-align: inherit;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  overflow: hidden;
  &_cut {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.87) 60%, white 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &__button-full {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 18px;
    background-clip: border-box;
    -webkit-text-fill-color: black;
    border-left: thin solid rgba(0, 0, 0, 0.12);
    overflow: hidden;
    outline: none;
    &:hover { background-color: #BBDEFB; cursor: pointer; }
  }
  &__box-full {
    &_cut {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      padding-left: 5px;
    }
  }
  &__prompt {
    position: fixed;
    width: 400px;
    padding: 5px 10px;
    -webkit-text-fill-color: black;
    border: thin solid rgba(0, 0, 0, 0.12);
    box-shadow: 1px 1px 3px black; //#FFF59D;
    border-radius: 5px;
    background-color: #FFF9C4;
    outline: none;
  }
  
}
</style>