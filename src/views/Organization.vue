<template>
  <div class="home">
    <v-btn @click="getHeaders">Hello</v-btn>
    <!-- <v-sparkline></v-sparkline> -->
    <!-- <v-data-table :headers="[{text: 'Name', value: 'title'}, {text: 'INN', value: 'inn' }, {text: 'OGRN'}]" -->
    <!-- <v-data-table class="tab-org"
                  :headers="listFields"
                  dark
                  :items="listOrganizations"></v-data-table> -->
    <v-simple-table>
      <tbody>
        <tr v-for="(item, index) in listOrganizations" :key="index">
          <td>
            <organization-card :itemOrganization="item"></organization-card>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <!-- <template v-for="(item, index) in listOrganizations"> -->
      
    <!-- </template> -->
  </div>
</template>

<script>
import OrganizationCard from '@/components/organization__card';

export default {
  name: 'Home',
  components: {
    OrganizationCard,
  },
  computed: {
    listOrganizations() { return this.$store.getters.GET_LIST_ORGANIZATIONS; },
    listFields() { return this.$store.getters.GET_LIST_FIELDS; }
  },
  data() {
    return {
      windowsHeight: 0,
      currentPage: 1,
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_ORGANIZATIONS');
    window.addEventListener('scroll',this.loadData);
    
  },
  mounted() {
    // this.windowsHeight = document.documentElement.getBoundingClientRect().bottom;
  },
  methods: {
    loadData() {
      // while(true) {
        let windowBottom = document.documentElement.getBoundingClientRect().bottom;
        
        if (windowBottom < document.documentElement.clientHeight + 50) {
          window.removeEventListener('scroll', this.loadData);
          console.log('load');
          this.$store.dispatch('GET_LIST_ORGANIZATIONS_NEXT', `?page=${++this.currentPage}`);
          // this.$store.state.listOrganizations.push(this.$store.state.listOrganizations[0]);
        }
      // }
    },
    getHeaders() {
      this.$store.dispatch('SET_LIST_FIELD');
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-org {
  font-size: 8px;
}
</style>
