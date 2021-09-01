<template>
  <section>
    <v-container>
      <form @submit.prevent="createPublication">
        <v-text-field
            v-model="form.link"
            outlined
            dense
            hide-details
            label="Url Imagen"
            type="text"
        />
        <v-textarea
            v-model="form.description"
            maxlength="1000"
            class="my-2"
            outlined
            dense
            hide-details
            label="descripción"
            auto-grow
            counter
            clearable
            required
        />
        <v-btn right color="primary" fab dark type="submit">
          <v-icon dark>
            mdi-send
          </v-icon>
        </v-btn>
      </form>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "createPublication",
  data: () => ({
    form: {
      link: '',
      description: '',
      userId: ''
    },
    url: '/api'
  }),
  methods: {
    createPublication () {
      if (this.form.description !== '') {
        const user = JSON.parse(localStorage.getItem('user'));
        this.form.userId = user.id;
        this.axios.post(`${this.url}/publications/create`, this.form).then(
            (res) => {
              console.log(res.data);
              this.form.description = ''
              this.form.link = ''
              this.$emit('update-data', 1)
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
