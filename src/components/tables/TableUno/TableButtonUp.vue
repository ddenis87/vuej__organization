<template>
  <div class="btn-up" :class="{'btn-up_show': isShow}">
    <v-btn class="btn-up__item" fab x-small icon @click="$emit('go-up')">
      <v-icon medium color="blue" >
        mdi-chevron-up
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'TableMultilineBodyBtnUp',
  props: {
    isShow: {type: Boolean, default: false},
  },
}
</script>

<style lang="scss" scoped>

.btn-up {
  display: flex;
  align-items: center;
  padding: 0px 5px;
  bottom: 100px;
  right: 100px;
  height: 0px;
  width: 35px;
  transition: height .5s;
  &_show {
    height: 35px;
    transition: height .5s;
  }

}
</style>