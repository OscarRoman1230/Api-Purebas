<template>
  <section>
    <v-card color="deep-grey lighten-4" flat>
      <v-container>
        <create-publication class="mx-auto my-2" @update-data="updateData" />
        <v-row justify="center">
          <v-col v-for="(item, index) in items" :key="index" md="5">
            <v-card
                class="mx-auto"
            >
              <v-img
                  v-if="item.link"
                  :src="item.link"
                  height="200px"
              ></v-img>

              <v-card-title>
                {{ item.fullName }}
              </v-card-title>
              <v-card-text v-html="item.description" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
import createPublication from "./createPublication";
export default {
  name: 'ListPublications',
  components: {
    createPublication
  },
  data: () => ({
    items: [],
    url: '/api',
  }),
  mounted() {
    this.getPublications()
  },
  methods: {
    getPublications () {
      this.axios.get(`${this.url}/publications`).then(
          (res) => {
            console.log(res.data);
            this.items = res.data.data;
          }).catch((err) => {
        console.log(err);
      });
    },
    updateData (e) {
      if (e === 1) {
        this.getPublications()
      }
    }
  }
}


</script>

<style scoped>

</style>
