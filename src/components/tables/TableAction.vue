<template>
  <div class="action-box" id="active-box" :style="positionLeft">
    <div class="action-box__toolbar">
      <v-btn class="toolbar__item" icon @click="clickButtonPrint">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
      <v-btn class="toolbar__item" icon @click="clickButtonCopy">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn class="toolbar__item" icon @click="clickButtonDelete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableAction',
  props: {
    activeValue: NaN,
  },
  computed: {
    positionLeft() { return ''; } //`left: -${this.widthActionBox}px;`; },
  },
  data() {
    return {
      widthActionBox: 0,
    }
  },
  mounted() {
    let actionBox = document.getElementsByClassName('action-box')[0].getBoundingClientRect();
    this.widthActionBox = actionBox.right - actionBox.left;
  },
  methods: {
    clickButtonPrint() {
      alert('I`m PRINT ' + this.activeValue.activeValue);
    },
    clickButtonCopy() {
      alert('I`m COPY ' + this.activeValue.activeValue);
    },
    clickButtonDelete() {
      alert('I`m DELETE ' + this.activeValue.activeValue);
    },
  },
}
</script>

<style lang="scss" scoped>
.action-box {
  position: relative;
  // z-index: 2;
  // float: right;
  display: inline-flex;
  // padding-left: 15px;
  // padding-right: 15px;
  align-items: center;
  height: 100%;
  // max-width: 0px;
  // width: 0px;
  // box-sizing: border-box;
  opacity: 0;
  background-image: linear-gradient(-90deg, white 95%, rgba(0,0,0,0) 100%);
  transition: opacity .2s;
  // overflow: hidden;
  // border: thin solid blue;
  &__toolbar {
    // position: sticky;
    position: absolute;
    // z-index: 1;
    // float: left;
    right: 0px;
    display: flex;
    height: 100%;
    // padding: 10px 10px;
    // background-color: white;
    background-image: linear-gradient(-90deg, white 92%, rgba(0,0,0,0) 100%);
    // background-color: rgb(240, 240, 240);
    // border-radius: 5px 0px 0px 5px;
    // box-shadow: -1px 0px 5px 0px #C1C1C1;
    box-sizing: border-box;
    // border: thin solid black;
    .toolbar__item {
      &:first-child {
        margin-left: 10px;
      }
      // margin: 0px 5px;
    }
  }
}
</style>