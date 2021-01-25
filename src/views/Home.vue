<template>
  <div class="organization" id="organization">

  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    if (localStorage.getItem('Token') != null) this.$router.push('/Table/TablePage');
  },
}
</script>

<style lang="scss" scoped>
.organization {
  min-height: 100%;
  display: grid;
  grid-template-areas: "organization-control" "organization-body";
  grid-template-columns: 100%;
  grid-template-rows: 55px 100vh;
  width: 100%;
  box-sizing: border-box;
  &-control {
    position: relative;
    z-index: 20;
    grid-area: organization-control;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    
    .control-view {
      margin: 0px 3px;
      width: 100%;
    }
  }

  &-body {
    position: relative;
    z-index: 10;
    max-height: calc(100% - 150px);
    grid-area: organization-body;
    padding: 3px;
    
    .body-item {
      max-height: 100%;
      display: grid;
      grid-template-areas: "body-item__title" "body-item__body";
      grid-template-columns: 100%;
      grid-template-rows: 56px 100%;
      border: thin solid rgba(0,0,0,.12);
      border-radius: 4px;
      overflow: hidden;
      // border: thin solid blue;
      &__title {
        padding: 0px 10px;
        grid-area: body-item__title;
        overflow: hidden;
        border-bottom: thin solid rgba(0,0,0,.12);
        h4 { margin-right: 10px ; }
        // border: thin solid red;
      }
      &__body {
        max-height: calc(100% - 55px);
        padding: 10px;
        grid-area: body-item__body;
        // border: thin solid purple;
      }
    }
  }
}
::v-deep {
  .container {
    margin-right: 5px;
    margin-left: 5px;
  }
  .row {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .col {
    width: 100%;
  }
  .v-input--selection-controls {
    margin-top: 15px;
  }
  .v-input__control {
    height: 22px;
  }
}
</style>
