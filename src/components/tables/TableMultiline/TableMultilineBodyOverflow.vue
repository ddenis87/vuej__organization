<template>
  <div class="box-overflow" :class="{'box-overflow_cut': cutContent}" :id="`box-overflow-${sequenceOverflowBox}`" @scroll="scrollPrompt">
    <div class="box-overflow__button-full" v-if="cutContent" @click="showFullContent">
      <v-icon class="box-overflow__button-full-item" :class="{'box-overflow__button-full-item_active': isShowPrompt}" small color="blue" style="position: static;">mdi-chevron-right</v-icon>
    </div>
    <div class="box-full" :class="{'box-full_cut': cutContent}" :style="countRowStyle" :id="`box-full-${sequenceOverflowBox}`" @scroll="scrollPrompt">
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
      eventBlur: false,
      eventClick: false,
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
    this.countRowStyle = '-webkit-line-clamp: ' + (document.getElementById(`box-overflow-${this.sequenceOverflowBox}`).getBoundingClientRect().height / 25) + ';';
    (document.getElementById(`box-full-${this.sequenceOverflowBox}`).getBoundingClientRect().height > document.getElementById(`box-overflow-${this.sequenceOverflowBox}`).getBoundingClientRect().height) ? this.cutContent = true : this.cutContent = false;
  },
  methods: {
    showFullContent(event) {
      this.isShowPrompt = !this.isShowPrompt;
      let parentContainer = document.getElementById(`box-overflow-${this.sequenceOverflowBox}`);
      let promptContainer = document.getElementById(`prompt-${this.sequenceOverflowBox}`);
      let shiftLeft = 0;
      if( document.documentElement.getBoundingClientRect().width - event.clientX < 400) shiftLeft = 400 - (document.documentElement.getBoundingClientRect().width - event.clientX);
      this.promptLocation = `left: ${parentContainer.getBoundingClientRect().left - shiftLeft}px; top: ${parentContainer.getBoundingClientRect().top + (parentContainer.getBoundingClientRect().bottom - parentContainer.getBoundingClientRect().top)}px;`;
      promptContainer.innerText = parentContainer.innerText;
      setTimeout(() => promptContainer.focus(), 100);
    },
    hideOverflow() {
      this.isShowPrompt = false;
    },
    blurPrompt(event) {
      this.isShowPrompt = false;
    },
    scrollPrompt() {
      console.log('scroll');
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
    // height: 0px;
    background-clip: border-box;
    -webkit-text-fill-color: black;
    border-left: thin solid rgba(0, 0, 0, 0.12);
    &:hover { background-color: #BBDEFB; cursor: pointer; }
    // border: 0 solid blue;
    &-item {
      transition: all .3s;
      &_active {
        transform: rotate(90deg);
      }
    }
    // &-item {
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   height: 15px;
    //   padding: 0px 10px;
    //   border: thin solid rgba(0, 0, 0, 0.12);
    //   border-radius: 15px;
    //   background-color: white; // #ECEFF1;
    //   &:hover { background-color: #BBDEFB; cursor: pointer; }
    // }
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
  .box-full {
    // height: auto;
    // display: inline-flex;
    // width: 100%;
    // border: thin solid green;
    // display: flex;
    &_cut {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      padding-left: 5px;
    }
  }
}
</style>