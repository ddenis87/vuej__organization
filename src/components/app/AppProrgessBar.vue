<template>
  <div class="progress-bar">
    <v-progress-circular :size="40"
                          :width="5"
                          color="primary"
                          indeterminate></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'AppProgressBar',
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: fixed;
  top: 10px;
  right: 20px;
}
</style>