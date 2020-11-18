<template>
  <div class="block-lock" :class="{'block-lock_show': loading}" tabindex="-1">
    <app-progress-bar></app-progress-bar>
  </div>
</template>

<script>
import AppProgressBar from '@/components/app/AppProrgessBar';

export default {
  name: 'AppLock',
  components: {
    AppProgressBar,
  },
  computed: {
    loading() { return this.$store.getters.GET_STATUS_LOAD; }
  },
}
</script>

<style lang="scss" scoped>
.block-lock {
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: .8;
  z-index: 888;
  &_show {
    display: flex;
  }
}
</style>