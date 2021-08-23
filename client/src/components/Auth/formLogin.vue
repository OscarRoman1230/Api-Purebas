<template>
  <section>
    <v-container>
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
              <v-col md="12">
                <v-text-field
                    v-model="formRegister.company"
                    outlined
                    label="Nombre Compañia"
                    type="text"
                    required
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                    v-model="formRegister.nit"
                    outlined
                    label="Nit"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    type="text"
                    maxlength="11"
                    required
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                    v-model="formRegister.phone"
                    outlined
                    label="Teléfono"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    type="text"
                    maxlength="10"
                    required
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                    v-model="formRegister.address"
                    outlined
                    label="Dirección compañia"
                    type="text"
                    required
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                    v-model="formRegister.emailCompany"
                    outlined
                    label="Correo Electronico Compañia"
                    type="email"
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
  </section>
</template>

<script>
export default {
  name: "formLogin",
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    formRegister: {
      fullName: '',
      email: '',
      password: '',
      company: '',
      nit: '',
      phone: '',
      address: '',
      emailCompany: ''
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
      this.formRegister.company = ''
      this.formRegister.nit = ''
      this.formRegister.phone = ''
      this.formRegister.address = ''
      this.formRegister.emailCompany = ''
    },
    register () {
      if (this.formRegister.email !== '' && this.formRegister.password !== ''
          && this.formRegister.company !== '' && this.formRegister.nit !== '') {
        this.axios.post(`${this.url}/auth/singup`, this.formRegister).then(
            (res) => {
              console.log(res.data);
              this.loginForm();
            }).catch((err) => {
              console.log(err);
            });
      }
    },
    login () {
      if (this.form.email !== '' && this.form.password !== '') {
        this.axios.post(`${this.url}/auth/singin`, this.form).then(
            (res) => {
              console.log(res.data);
              if (res.data.status === 1) {
                this.$router.push({path: '/home'});
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('company', res.data.user.companyId);
              }
            }).catch((err) => {
              console.log(err);
            });
      }
    }
  }
}
</script>

<style scoped>

</style>
