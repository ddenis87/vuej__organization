<template>
  <div class="login">
    <v-card width="500"  flat class="login__window">
      <dialog-toolbar is-dialog-name="Авторизация" :is-close="false"></dialog-toolbar>
      <v-form class="form-login" ref="FormLogin">
        <el-progress-bar :isShow="isProccessRequest"></el-progress-bar>
        <div class="form-login__label"><v-subheader>Логин</v-subheader></div>
        <v-text-field dense single-line :rules="[rules.required]" v-model="userData.userName"></v-text-field>
        <div class="form-login__label"><v-subheader>Пароль</v-subheader></div>
        <v-text-field dense single-line autocomplete="false"
                      :type="isPasswordShow ? 'text' : 'password'"
                      :rules="[rules.required]" 
                      :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="userData.password"
                      @click:append="isPasswordShow = !isPasswordShow"></v-text-field>
        <v-card-actions class="form-login__action">
          <span class="form-login__error" v-show="isError">Предоставлены неверные данные для входа</span>
          <v-spacer></v-spacer>
          <v-btn :dark="!isProccessRequest"
                  color="blue darken-3" 
                  height="30" 
                  :disabled="isProccessRequest"
                  @click="sendLogin">Войти
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import DialogToolbar from '@/components/Dialogs/DialogToolbar.vue';
import ElProgressBar from '@/components/Elements/ElProgressBar/ElProgressBar.vue';

export default {
  name: 'Login',
  components: {
    DialogToolbar,
    ElProgressBar,
  },
  data() {
    return {
      isDialog: true,
      isPasswordShow: false,
      isError: false,
      rules: {
        required: value => !!value || 'Обязательное поле',
      },
      userData: {
        userName: '',
        password: '',
      },
    }
  },
  computed: {
    isProccessRequest() { return this.$store.getters['Login/GET_PROCCESS_REQUEST']; },
  },
  mounted() {
    if (localStorage.getItem('Token') != null) this.$router.push('/Table/TablePage');
  },
  methods: {
    async sendLogin() {
      if (!this.$refs.FormLogin.validate()) return;
      console.log('valid');
      this.$store.commit('Login/SET_USER_NAME_PASSWORD', this.userData);
      await this.$store.dispatch(`Login/GET_USER_TOKEN_ACCESS`, this.userData)
        .then(res => this.$router.push('/Table/TablePage'))
        .catch(err => {
          this.isError = true;
          this.$refs.FormLogin.reset();
          setTimeout(() => this.isError = false, 3000);
        });
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
  &__window {
    border: thin solid rgba(0, 0, 0, .12);
    border-radius: 4px;
  }
  .form-login {
    padding: 15px 15px;
    &__label {
      display: inline-flex;
      align-items: center;
      height: 22px;
      margin-left: -17px;
      overflow: hidden;
    }
    .v-text-field {
      margin-top: -3.5px;
    }
    &__action {
      padding: 0px;
      // padding-top: 25px;
    }
    &__error {
      font-size: 0.75rem;
      color: red;
    }
  }
}
</style>