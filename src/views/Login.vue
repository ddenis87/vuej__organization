<template>
  <v-row justify="start">
    <v-dialog persistent v-model="isDialog" width="500" >
      <v-card>
        <dialog-toolbar is-dialog-name="Авторизация" :is-close="false"></dialog-toolbar>
          <v-form class="form-login" ref="FormLogin">
            <el-progress-bar :isShow="isProccessRequest"></el-progress-bar>
            <v-text-field :rules="[rules.required]" v-model="userData.userName" label="Логин"></v-text-field>
            <v-text-field :type="isPasswordShow ? 'text' : 'password'"
                          :rules="[rules.required]" 
                          :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                          v-model="userData.password" label="Пароль"
                          @click:append="isPasswordShow = !isPasswordShow"></v-text-field>
            <v-card-actions class="form-login__action">
              <v-spacer></v-spacer>
              <v-btn :dark="!isProccessRequest"
                     color="blue darken-3" 
                     height="30" 
                     
                     :disabled="isProccessRequest"
                     @click="sendLogin">Войти
                <!-- <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template> -->
              </v-btn>
            </v-card-actions>
            
          </v-form>
          <!-- <v-divider></v-divider>
          <v-breadcrumbs :items="[{text: 'Регистрация', disabled: false, href: 'Login'}]"></v-breadcrumbs> -->
      </v-card>
    </v-dialog>
  </v-row>
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
  methods: {
    sendLogin() {
      
      if (!this.$refs.FormLogin.validate()) return;
      console.log('valid');
      this.$store.commit('Login/SET_USER_NAME_PASSWORD', this.userData);
      this.$store.dispatch(`Login/GET_USER_TOKEN_ACCESS`, this.userData)
        .then(res => this.$router.push('/Table/PageTable'))
        .catch(err => console.log(err));
      // this.$router.push('/Table/PageTable');
    }
  },
}
</script>

<style lang="scss" scoped>
.form-login {
  padding: 15px 15px;
  &__action {
    padding: 0px;
    // padding-top: 25px;
  }
}
</style>