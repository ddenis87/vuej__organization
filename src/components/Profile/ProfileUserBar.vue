<template>
  <div class="profile-user-bar">
    <!-- <v-icon color="white">mdi-account-outline</v-icon> -->
    <span class="profile-user-bar__user-name">{{ userName }}</span>
    <el-button-icon :no-tooltip="true" icon="mdi-logout" iconColor="white" @click="logout"></el-button-icon>
  </div>
</template>

<script>
import ElButtonIcon from '../Elements/ElButtonIcon.vue'

export default {
  name: 'ProfileUserBar',
  components: {
    ElButtonIcon,
  },
  computed: {
    userName() { return this.$store.getters['Login/GET_USER_NAME_PASSWORD'].userName; },
  },
  methods: {
    logout() {
      this.$store.commit('Login/SET_LOGOUT');
      this.$router.push('/');
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-user-bar {
  display: inline-flex;
  align-items: center;

  &__user-name {
    margin: 0px 5px;
    color: white;
  }
}
</style>