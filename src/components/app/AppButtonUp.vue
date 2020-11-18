<template>
  <div class="fixed-block" v-show="btnUp">
    <v-btn class="mx-2"
           fab
           dark
           small
           color="indigo"
           @click="goUp">
      <v-icon dark>
        mdi-navigation
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AppButtonUp',
  data() {
    return {
      btnUp: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.showBtnUp);
  },
  methods: {
    showBtnUp() {
      (document.documentElement.getBoundingClientRect().top < -100) ? this.btnUp = true : this.btnUp = false;
    },
    goUp() {
      window.scrollBy(0,-500);
      if (window.pageYOffset > 0) { requestAnimationFrame(this.goUp); }
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-block {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>