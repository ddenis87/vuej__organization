<template>
  <div class="organization-card">
    <v-container fluid >
      <v-row>
        <v-col cols="2" class="card-item card-item__title">Код главы по БК: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.bk.head_code }}</v-col>
        <v-col cols="2" class="card-item card-item__title">Наименование главы по БК: </v-col>
        <v-col cols="6" class="card-item">{{ itemOrganization.bk.head_name }}</v-col>
      </v-row>
      <v-row>
      </v-row>
      <v-row>
        <v-col cols="2" class="card-item card-item__title">Наименование: </v-col>
        <v-col cols="9" class="card-item">{{ itemOrganization.title }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="card-item card-item__title">ИНН: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.inn }}</v-col>
        <v-col cols="2" class="card-item card-item__title">КПП: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.kpp }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="card-item card-item__title">Код учреждения: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.institution_code }}</v-col>
        <v-col cols="2" class="card-item card-item__title">Тип учреждения: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.institution_type }}</v-col>
        <v-col cols="2" class="card-item card-item__title">Тип организации: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.organisation_type }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="card-item card-item__title">Уровень бюджета: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.budget_level }}</v-col>
        <v-col cols="2" class="card-item card-item__title">Статус РУБПНУБП: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.rubpnubp_status }}</v-col>
        <v-col cols="2" class="card-item card-item__title">Отраслевая типизация: </v-col>
        <v-col cols="2" class="card-item">{{ itemOrganization.industry_typing }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="card-item card-item__title">Статус ЕГРЮЛ: </v-col>
        <v-col cols="10" class="card-item">{{ itemOrganization.egrul_status }}</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'OrganizationCard',
  props: {
    itemOrganization: { type: Object, default: null },
  }
}
</script>

<style lang="scss" scoped>
.organization-card {
  font-size: .8em;
  .card-item {
    padding: 3px;
    &__title {
      font-weight: bold;
    }
  }
}
</style>