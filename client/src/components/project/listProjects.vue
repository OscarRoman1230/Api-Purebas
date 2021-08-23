<template>
  <section>
    <v-card color="deep-grey lighten-4">
      <v-row>
        <v-col v-for="(item, index) in items" :key="index"></v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'listProjects',
  data: () => ({
    items: [],
    url: '/api',
    companyId: localStorage.getItem('company')
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
    }
  }
}
</script>

<style scoped>

</style>
