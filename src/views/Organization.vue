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
    <div class="home__up" v-show="btnUp">
      <v-btn class="mx-2" fab dark small color="primary" @click="windowUp">
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
    listFields() { return this.$store.getters.GET_LIST_FIELDS; },
  },
  data() {
    return {
      homeBlock: Object,
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
      this.$store.dispatch('GET_LIST_ORGANIZATIONS', this.optionRequest);
    },
    loadData() {
      let windowBottom = this.homeBlock.getBoundingClientRect().bottom;
      (this.homeBlock.getBoundingClientRect().top < -100) ? this.btnUp = true : this.btnUp = false;
      if (windowBottom < document.documentElement.clientHeight + 130) {
        window.removeEventListener('scroll', this.loadData);
        this.optionRequest.currentPage++;
        this.$store.dispatch('GET_LIST_ORGANIZATIONS', this.optionRequest);
      }
    },
    windowUp() {
      this.btnUp = false;
      window.scrollBy(0,-500);
      if (window.pageYOffset > 0) requestAnimationFrame(this.windowUp); 
    },
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  &__up {
    position: fixed;
    bottom: 50px;
    right: 50px
  }
}
.tab-org {
  font-size: 8px;
}
</style>
