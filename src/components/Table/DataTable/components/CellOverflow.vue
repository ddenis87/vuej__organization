<template>
  <div class="box-overflow" :id="`box-overflow`">
    <div class="box-full" :id="`box-full`">
      {{ content }}
    </div>
    <!-- <div class="box-full-line" id="box-full-line">
      {{ content }}
    </div> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CellOverflow',
  props: {
    content: '',
  },
  mounted() {
    this.computedOverflow();
  },
  methods: {
    computedOverflow() {
      
      let parentContainer = document.getElementById(`box-overflow`);
      let fullContainer = document.getElementById(`box-full`);
      let boxFullLine = document.getElementById('box-full-line');
      if (fullContainer.getBoundingClientRect().height > parentContainer.getBoundingClientRect().height + 10) {
        if (parentContainer.closest('.table-body__col')) {
          parentContainer.closest('.table-body__col').setAttribute('data-overflow', true);
          parentContainer.closest('.table-body__col').setAttribute('data-overflow-text', this.content);
        } else if (parentContainer.closest('.table-head__col')) {
          parentContainer.closest('.table-head__col').setAttribute('data-overflow', true);
          parentContainer.closest('.table-head__col').setAttribute('data-overflow-text', this.content);
        }
      }

      // if (boxFullLine.getBoundingClientRect().width > parentContainer.getBoundingClientRect().width + 10) {
      //   // parentContainer.closest('.table-head__col').setAttribute('data-overflow', true);
      //   console.log(boxFullLine.getBoundingClientRect().width);
      //   console.log(parentContainer.getBoundingClientRect().width);
      // }
      this.$emit('destroy-self');
    },
  }
}
</script>

<style lang="scss" scoped>
.box-overflow {
  position: relative;
  left: 0px;
  top: 0px;
  display: inline-flex;
  justify-content: inherit;
  align-items: inherit;
  // border: thin solid purple;
  height: 100%;
  width: 100%;
  background-color: inherit;
  overflow: hidden;
  .box-full {
    position: absolute;
    left: 0px;
    top: 0px;
    // border: thin solid red;
    width: 100%;
    line-height: 1.5;
    // visibility: hidden;
  }
  // .box-full-line {
  //   position: absolute;
  //   display: inline;
  //   left: 0px;
  //   top: 0px;
  //   border: thin solid blue;
  //   width: auto;
  //   line-height: 1.5;
  //   // visibility: hidden;
  // }
}
</style>