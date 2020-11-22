<template>
  <div class="btn-up" v-show="btnUp">
    <v-icon large color="white" @click="goUp">mdi-arrow-up-drop-circle-outline</v-icon>
  </div>
</template>

<script>
export default {
  name: 'TableMultilineBodyBtnUp',
  data() {
    return {
      btnUp: false,
    }
  },
  mounted() {
    document.getElementById('table-multiline').addEventListener('scroll', this.showBtnUp);
  },
  methods: {
    showBtnUp() {
      (document.getElementById('body').getBoundingClientRect().top < 10) ? this.btnUp = true : this.btnUp = false;
    },
    goUp() {
      document.getElementById('table-multiline').scrollTo(0,0);
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-up {
  position: fixed;
  top: calc(50% + 20px);
  right: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: rgb(0, 116, 116);
  border: 1px solid green;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 175, 175);
  }
  
}
</style>