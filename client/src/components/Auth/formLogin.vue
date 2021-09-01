<template>
  <section>
    <v-container class="mt-5">
      <v-card v-if="show" class="mx-auto my-auto" width="300px">
        <v-card-title>Iniciar Sesión</v-card-title>
        <form @submit.prevent="login()">
          <v-container>
            <v-row no-gutters>
              <v-col md="12">
                <v-text-field
                    v-model="form.email"
                    outlined
                    label="Correo Electrónico"
                    type="email"
                    required
                />
              </v-col>
              <v-col md="12">
                <v-text-field
                    v-model="form.password"
                    outlined
                    label="Contraseña"
                    type="password"
                    required
                />
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn color="grey" dark @click="registerForm()">Registrarse</v-btn>
              <v-btn color="green" dark type="submit">Ingresar</v-btn>
            </v-card-actions>
          </v-container>
        </form>
      </v-card>
      <v-card v-if="!show" class="mx-auto" width="600px">
        <v-card-title>Registrarse</v-card-title>
        <form @submit.prevent="register()">
          <v-container>
            <v-row>
              <v-col md="12">
                <v-text-field
                    v-model="formRegister.fullName"
                    outlined
                    label="Nombre completo"
                    type="text"
                    required
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                    v-model="formRegister.email"
                    outlined
                    label="Correo Electrónico"
                    type="email"
                    required
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                    v-model="formRegister.password"
                    outlined
                    label="Contraseña"
                    type="password"
                    required
                />
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn color="grey" dark @click="loginForm()">Iniciar sesión</v-btn>
              <v-btn color="green" dark type="submit">Registrarse</v-btn>
            </v-card-actions>
          </v-container>
        </form>
      </v-card>

    </v-container>
    <v-container>
      <v-card class="mx-auto" width="300px" color="transparent">
        <v-alert
            v-if="alertSuccess"
            border="left"
            dismissible
            dense
            type="success"
        >
          {{ alertSuccess }}
        </v-alert>
        <v-alert
            v-if="alertError"
            border="left"
            dismissible
            dense
            type="error"
        >
          {{ alertError }}
        </v-alert>
        <v-alert
            v-if="alertWarning"
            border="left"
            dismissible
            dense
            type="warning"
        >
          {{ alertWarning }}
        </v-alert>
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "formLogin",
  data: () => ({
    alertSuccess: '',
    alertError: '',
    alertWarning: '',
    form: {
      email: '',
      password: ''
    },
    formRegister: {
      fullName: '',
      email: '',
      password: ''
    },
    show: true,
    url: '/api'
  }),
  methods: {
    registerForm () {
      this.show = false
      this.form.email = ''
      this.form.password = ''
    },
    loginForm () {
      this.show = true
      this.formRegister.fullName = ''
      this.formRegister.email = ''
      this.formRegister.password = ''
    },
    register () {
      if (this.formRegister.email !== '' && this.formRegister.password !== '') {
        this.axios.post(`${this.url}/auth/sign-up`, this.formRegister).then(
            (res) => {
              console.log(res.data);
              if (res.data.status === 2) {
                this.alertError = res.data.message;
              } else if (res.data.status === 1) {
                this.alertSuccess = res.data.message;
                this.loginForm();
              }
            }).catch((err) => {
              console.log(err);
            });
      } else {
        this.alertWarning = 'please complete text fields'
      }
    },
    login () {
      if (this.form.email !== '' && this.form.password !== '') {
        this.axios.post(`${this.url}/auth/sign-in`, this.form).then(
            (res) => {
              console.log(res.data);
              if (res.data.status === 1) {
                this.alertSuccess = res.data.message;
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                this.$router.push({path: '/home'});
              } else if (res.data.status === 2) {
                this.alertError = res.data.message;
                this.form.password = '';
              }
            }).catch((err) => {
              console.log(err);
            });
      } else {
        this.alertWarning = 'please insert password or email'
      }
    }
  }
}
</script>

<style scoped>

</style>
