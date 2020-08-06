<template>
  <div>
    <b-container class="p-3">
      <b-form-group label="Filtro por categoria:" label-for="categories">
        <b-form-select v-model="option" class="mb-3" v-on:change="getProductsbyCat()" id="categories">
          <b-form-select-option :value="null">Por favor seleccione una categoria</b-form-select-option>
          <b-form-select-option
              v-for="item in dataC"
              :key="item.id"
              :value="item"
          >
            {{ item.descripcion }}
          </b-form-select-option>
        </b-form-select>
        <b-button variant="outline-dark" class="mb-3" v-on:click="getProducts">Mostrar Todos</b-button>
      </b-form-group>
      <div class="mt-2" v-if="option">Filtrando por: <strong>{{ option.descripcion }}</strong></div>
      <b-card-group columns class="p-3">
        <b-card v-for="item in data" :key="item.id"
                :title="item.nombre"
                :img-src="item.url_img"
                img-alt="image"
                img-top
        >
          <b-card-text>
            {{ item.descripcion }}
          </b-card-text>
          <h4 class="text-success">{{ item.valor }}</h4>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      data: [],
      dataC: [],
      option: null,
      url: 'http://localhost:4000/api'
    }
  },
  methods: {
    getProducts() {
      this.data = [];
      this.axios.get(`${this.url}/products`).then(
          (res) => {
            console.log(res.data);
            this.data = res.data.data;
            this.data = res.data.data;
          }).catch((err) => {
        console.log(err);
      });
    },
    getProductsbyCat() {
      this.data = [];
      if (this.option){
        this.axios.get(`${this.url}/products/${this.option.id}`).then(
            (res) => {
              console.log(res.data);
              this.data = res.data.data;
              this.data = res.data.data;
            }).catch((err) => {
          console.log(err);
        });
      }
    },
    getCategories() {
      this.axios.get(`${this.url}/categories`).then(
          (res) => {
            console.log(res.data);
            this.dataC = res.data.data;
          }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  }
}
</script>

<style scoped>

</style>
