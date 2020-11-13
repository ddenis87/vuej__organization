<template>
  <div class="footer">
    <p class="footer__text">Copyright by Dontsov D.A. 2020</p>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: teal;
  box-sizing: border-box;
  &__text {
    font-size: 8px;
  }
}
</style>