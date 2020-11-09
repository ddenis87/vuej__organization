<template>
  <div class="home">
    <v-btn @click="getHeaders">Hello</v-btn>
    <organization-filter @accept-filter="acceptFilter"></organization-filter>
    <v-simple-table>
      <tbody>
        <tr v-for="(item, index) in listOrganizations" :key="index">
          <td>
            <organization-card :itemOrganization="item"></organization-card>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
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
    listFields() { return this.$store.getters.GET_LIST_FIELDS; }
  },
  data() {
    return {
      windowsHeight: 0,
      optionRequest: {
        currentPage: 2,
        stringFilter: ''
      },
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_BK');
    window.addEventListener('scroll',this.loadData);
  },
  updated() { window.addEventListener('scroll', this.loadData); },
  methods: {
    acceptFilter(stringFilter) {
      let stringWhere = stringFilter;
      this.optionRequest.currentPage = 1;
      this.optionRequest.stringFilter = stringFilter
      this.$store.dispatch('GET_LIST_ORGANIZATIONS', this.optionRequest);
    },
    loadData() {
        let windowBottom = document.documentElement.getBoundingClientRect().bottom;
        if (windowBottom < document.documentElement.clientHeight + 50) {
          window.removeEventListener('scroll', this.loadData);
          console.log('load');
          this.optionRequest.currentPage++;
          this.$store.dispatch('GET_LIST_ORGANIZATIONS', this.optionRequest);
        }
    },
    getHeaders() {
      console.log(this.$store.getters.GET_LIST_BK);
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-org {
  font-size: 8px;
}
</style>
