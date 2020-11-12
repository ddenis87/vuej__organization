<template>
  <div class="home" >
    <div id="home">
      <h2>Организации</h2>
      <div class="control">
        <div class="control__filter">
          <organization-filter @accept-filter="acceptFilter"
                              @reset-filter="resetFilter"></organization-filter>
        </div>
        <v-btn class="control__btn" fab dark small 
              @click="() => {listMultiRow = !listMultiRow}" title="Переключить вид">
          <v-icon> {{ (listMultiRow) ? 'mdi-view-stream' : 'mdi-format-list-bulleted'}}</v-icon>
        </v-btn>
      </div>

      <div class="body">
        <organization-list :listFields="listFields" v-if="!listMultiRow"
                          :listItems="listOrganizations"></organization-list>
        <organization-list-multi-row :listFields="listFields" v-if="listMultiRow"
                                    :listItems="listOrganizations"></organization-list-multi-row>
      </div>

      <div class="fixed-block" v-show="showBtnUp">
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
    
  </div>
</template>

<script>
import OrganizationFilter from '@/components/organization/organization__filter';
import OrganizationList from '@/components/organization/organization__list';
import OrganizationListMultiRow from '@/components/organization/organization__list-multi-row';

export default {
  name: 'Home',
  components: {
    OrganizationFilter,
    OrganizationList,
    OrganizationListMultiRow,
  },
  computed: {
    listOrganizations() { return this.$store.getters.GET_LIST_ORGANIZATIONS; },
    listFields() { return this.$store.getters.GET_LIST_FIELDS; }

  },
  data() {
    return {
      listMultiRow: false,
      homeBlock: Object,
      showBtnUp: false,
      optionRequest: {
        currentPage: 1,
        stringFilter: ''
      },
      btnUp: false,
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_BK');
  },
  mounted() {
    this.homeBlock = document.getElementById('home');
  },
  updated() {
    window.addEventListener('scroll', this.loadData);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.loadData);
  },
  methods: {
    acceptFilter(stringFilter) {
      this.optionRequest.currentPage = 1;
      this.optionRequest.stringFilter = stringFilter
      this.$store.commit('CLEAR_LIST_ORGANIZATIONS');
      this.$store.dispatch('GET_LIST_ORGANIZATIONS', this.optionRequest);
    },
    resetFilter() {
      this.optionRequest.currentPage = 1;
      this.optionRequest.stringFilter ='';
    },
    loadData() {
      console.log(this.homeBlock.getBoundingClientRect().bottom);
      // console.log(this.homeBlock.clientHeight);
      console.log(document.documentElement.clientHeight + 130);

      (document.documentElement.getBoundingClientRect().top < -100) ? this.showBtnUp = true : this.showBtnUp = false;
  
      if (document.getElementById('home').getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
        window.removeEventListener('scroll', this.loadData);
        this.optionRequest.currentPage++;
        this.$store.dispatch('GET_LIST_ORGANIZATIONS', this.optionRequest);
      }
    },
    goUp() {
      window.scrollBy(0,-500);
      if (window.pageYOffset > 0) {requestAnimationFrame(this.goUp);}
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  // height: 100%;
  .control {
    display: flex;
    align-items: center;
    height: 80px;
    margin-left: 10px;
    margin-right: 10px;
    &__filter {
      align-items: center;
      width: 100%;
      height: 55px;
    }
    &__btn { margin: 0 10px; }
  }
}
.fixed-block {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
