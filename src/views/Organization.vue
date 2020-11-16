<template>
  <div class="home" id="home">
    <h2>Организации</h2>

    <div class="control">
      <div class="control__filter">
        <organization-filter></organization-filter>
      </div>
      <v-btn class="control__btn"
              title="Переключить вид"
              fab
              dark
              small
              @click="() => {listMultiRow = !listMultiRow}">
        <v-icon> {{ (listMultiRow) ? 'mdi-view-stream' : 'mdi-format-list-bulleted'}}</v-icon>
      </v-btn>
    </div>
    <hr/>
    <div class="body">
      <organization-list v-if="!listMultiRow"></organization-list>
      <organization-list-multi-row v-if="listMultiRow"></organization-list-multi-row>
    </div>

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
  </div>
</template>

<script>
import OrganizationFilter from '@/components/organization/OrganizationFilter';
import OrganizationList from '@/components/organization/OrganizationList';
import OrganizationListMultiRow from '@/components/organization/OrganizationListMultiRow';

export default {
  name: 'Organization',
  components: {
    OrganizationFilter,
    OrganizationList,
    OrganizationListMultiRow,
  },
  data() {
    return {
      listMultiRow: false,
      btnUp: false,
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_OPTIONS');
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
.home {
  width: 100%;
  .control {
    display: flex;
    align-items: flex-start;
    height: 100px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    &__filter {
      align-items: center;
      width: 100%;
    }
    &__btn { margin: 5px 10px; }
  }
}
.fixed-block {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
