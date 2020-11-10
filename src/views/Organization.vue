<template>
  <div class="home" id="home">
    <h2>Организации</h2>
    <organization-filter @accept-filter="acceptFilter"></organization-filter>
    <v-simple-table>
      <tbody v-if="!listOrganizations.length">
        <tr>
          <td><h3>Информация отсутствует</h3></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in listOrganizations" :key="index">
          <td>
            <organization-card :itemOrganization="item"></organization-card>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
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
</template>

<script>
import OrganizationFilter from '@/components/organization__filter';
import OrganizationCard from '@/components/organization__card';

export default {
  name: 'Home',
  components: {
    OrganizationFilter,
    OrganizationCard,
  },
  computed: {
    listOrganizations() { return this.$store.getters.GET_LIST_ORGANIZATIONS; },
  },
  data() {
    return {
      homeBlock: Object,
      showBtnUp: false,
      optionRequest: {
        currentPage: 2,
        stringFilter: ''
      },
      btnUp: false,
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_BK');
  },
  mounted() {
    this.homeBlock = document.getElementById('home')
  },
  updated() {
    window.addEventListener('scroll', this.loadData);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.loadData);
  },
  methods: {
    acceptFilter(stringFilter) {
      let stringWhere = stringFilter;
      this.optionRequest.currentPage = 1;
      this.optionRequest.stringFilter = stringFilter
      this.$store.commit('CLEAR_LIST_ORGANIZATIONS');
      this.$store.dispatch('GET_LIST_ORGANIZATIONS', this.optionRequest);
    },
    loadData() {
      (document.documentElement.getBoundingClientRect().top < -100) ? this.showBtnUp = true : this.showBtnUp = false;
      if (this.homeBlock.getBoundingClientRect().bottom < document.documentElement.clientHeight + 130) {
        window.removeEventListener('scroll', this.loadData);
        console.log('load');
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
.fixed-block {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
