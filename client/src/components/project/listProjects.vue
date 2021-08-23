<template>
  <section>
    <v-card color="deep-grey lighten-4">
      <v-card-title>
        <v-col md="4" class="pt-2">
          <v-text-field
              v-model="form.name"
              label="Proyecto"
              outlined
              dense
          />
          <v-btn v-if="!edit" color="green" dark @click="createProject()">Crear</v-btn>
          <v-btn v-if="edit" color="orange" @click="uploadProject()">Editar</v-btn>
        </v-col>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in items" :key="index" md="4">
            <v-card
                class="mx-auto"
            >
              <v-card-text>
                <p class="text-h4 text--primary">
                  {{ item.name }}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                    text
                    color="deep-purple accent-4"
                    @click="editProject(item)"
                >
                  Editar
                </v-btn>
                <v-btn
                    text
                    color="deep-purple accent-4"
                >
                  Gestionar Tickets
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'listProjects',
  data: () => ({
    items: [],
    edit: false,
    url: '/api',
    companyId: localStorage.getItem('company'),
    form: {
      id: '',
      name: '',
      companyId: ''
    }
  }),
  mounted() {
    this.getProjects()
  },
  methods: {
    getProjects () {
      this.axios.get(`${this.url}/projects/${this.companyId}`).then(
          (res) => {
            console.log(res.data);
            this.items = res.data.data;
          }).catch((err) => {
        console.log(err);
      });
    },
    editProject (project) {
      this.edit = true
      this.form.companyId = project.companyId
      this.form.name = project.name
      this.form.id = project.id
    },
    createProject () {
      this.form.companyId = this.companyId
      if (this.form.name !== '') {
        this.axios.post(`${this.url}/projects/create`, this.form).then(
            (res) => {
              console.log(res.data)
              this.form.name = ''
              this.form.id = ''
              this.getProjects();
            }
        ).catch((err) => {
          console.log(err);
        })
      }
    },
    uploadProject () {
      if (this.form.name !== '') {
        this.axios.put(`${this.url}/projects/update`, this.form).then(
            (res) => {
              console.log(res.data)
              this.getProjects();
              this.form.id = ''
              this.form.name = ''
              this.form.companyId = ''
              this.edit = false
            }
        ).catch((err) => {
          console.log(err);
        })
      }
    }
  }
}


</script>

<style scoped>

</style>
