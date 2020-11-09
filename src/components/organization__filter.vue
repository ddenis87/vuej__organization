<template>
  <v-expansion-panels v-model="closeFilter">
    <v-expansion-panel>
      <v-expansion-panel-header>Фильтр</v-expansion-panel-header>
      <v-divider></v-divider>
      <v-expansion-panel-content>
        <v-form class="form-filter" ref="form">
          <v-container>
            <v-row>
              <v-col v-for="(item, index) in listFilter" :key="index" cols="12" class="select-item">
                <v-select :label="item.title" 
                          :items="item.values" 
                          item-text="title" 
                          item-value="value" 
                          v-model="valueFilter[item.key]"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-container>
            <v-row>
              <v-col cols="12" class="select-item">
                <v-select :label="listOrganizationsProps.bk.title" 
                          :items="listOrganizationsProps.bk.values" 
                          item-text="title" 
                          item-value="value" 
                          v-model="valueFilter.bk"></v-select>
              </v-col>
              <v-col cols="12" class="select-item">
                <v-select :label="listOrganizationsProps.budget_level.title" 
                          :items="listOrganizationsProps.budget_level.values" 
                          item-text="title" 
                          item-value="value" 
                          v-model="valueFilter.budget_level"></v-select>
              </v-col>
              <v-col cols="12" class="select-item">
                <v-select :label="listOrganizationsProps.institution_type.title" :items="listOrganizationsProps.institution_type.values" item-text="title" item-value="value" v-model="valueFilter.institution_type"></v-select>
              </v-col>
              <v-col cols="12" class="select-item">
                <v-select :label="listOrganizationsProps.organisation_type.title" :items="listOrganizationsProps.organisation_type.values" item-text="title" item-value="value" v-model="valueFilter.organisation_type"></v-select>
              </v-col>
              <v-col cols="12" class="select-item">
                <v-select :label="listOrganizationsProps.egrul_status.title" :items="listOrganizationsProps.egrul_status.values" item-text="title" item-value="value" v-model="valueFilter.egrul_status"></v-select>
              </v-col>
              <v-col cols="12" class="select-item">
                <v-select :label="listOrganizationsProps.rubpnubp_status.title" :items="listOrganizationsProps.rubpnubp_status.values" item-text="title" item-value="value" v-model="valueFilter.rubpnubp_status"></v-select>
              </v-col>
              <v-col cols="12" class="select-item">
                <v-select :label="listOrganizationsProps.industry_typing.title" :items="listOrganizationsProps.industry_typing.values" item-text="title" item-value="value" v-model="valueFilter.industry_typing"></v-select>
              </v-col>
            </v-row>
          </v-container> -->
          <v-container>
            <v-row justify="space-between">
              <v-col cols="2">
                <v-btn @click="resetForm">Сбросить фильтр</v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn @click="acceptFilter">Применить</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'OrganizationFilter',
  computed: {
    listFilter() {
      console.log(this.$store.getters.GET_LIST_FILTER);
      return this.$store.getters.GET_LIST_FILTER;
    },
    // listOrganizationsProps() { return this.$store.getters.GET_LIST_ORGANIZATIONS_PROPS; },
  },
  data() {
    return {
      valueFilter: {
        bk: null,
        budget_level: null,
        institution_type: null,
        organisation_type: null,
        egrul_status: null,
        rubpnubp_status: null,
        industry_typing: null
      },
      closeFilter: null,
    }
  },
  created() {
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    acceptFilter() {
      let stringFilter = '';
      for (let [key, value] of Object.entries(this.valueFilter)) {
        if (value) {
          stringFilter += `&${key}=${value}`;
        }
      }
      this.closeFilter = null;
      this.$emit('accept-filter', stringFilter);
      // console.log(stringFilter);
    },
  }
}
</script>

<style lang="scss" scoped>
.form-filter {
  .select-item {
    padding: 2px;
    height: 54px;
  }
}
</style>