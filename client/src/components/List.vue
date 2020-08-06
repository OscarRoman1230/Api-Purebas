<template>
  <div>
    <div class="p-3">
      <b-form-group label="Filtro por categoria:" label-for="categories" class="container">
        <div class="row">
          <div class="col-md-5">
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
          </div>
          <div class="col-md-5">
            <b-button variant="primary" class="mb-3" v-on:click="getProducts">Mostrar Todos</b-button>
          </div>
        </div>
        <div class="mt-2" v-if="option">Filtrando por: <strong>{{ option.descripcion }}</strong></div>
      </b-form-group>
      <div class="row">
        <div class="col">
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
              <div class="row">
                <div class="col">
                  <h4 class="text-success">{{ item.valor }}</h4>
                </div>
                <div class="col ml-auto">
                  <b-button variant="success" v-on:click="addCart(item)">Comprar</b-button>
                </div>
              </div>
            </b-card>
          </b-card-group>
        </div>
        <div class="col ml-auto">
          <table class="table table-hover table-striped table-responsive-md">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.length">
                <td>{{item.product['nombre']}}</td>
                <td>
                  <div class="row">
                    <div class="col-5">
                      <b-button :disabled="item.cantidad <=1" variant="primary" @click="decrecrement(item.product['id'])" class="mr-2">-</b-button>
                    </div>
                    <div class="col-2">
                      <h4>{{item.cantidad}}</h4>
                    </div>
                    <div class="col-5">
                      <b-button variant="primary" @click="increment(item.product['id'])" class="mr-2">+</b-button>
                    </div>
                  </div>
                </td>
                <td>{{item.product['valor']}}</td>
              </tr>
            </tbody>
          </table>
          <div class="row ml-auto">
            <div class="col-1 p-2">
              <b-button variant="warning" v-b-modal.my-modal class="text-dark" @click="precio"><i class="fas fa-shopping-cart"></i></b-button>
            </div>
            <div class="col p-2">
              <b-button variant="danger" @click="clean">borrar lista</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal cosas en el carrito   -->
    <b-modal
        id="my-modal"
        hide-backdrop
        hide-header-close
        no-close-on-esc
        no-close-on-backdrop
    >
      <template slot="modal-footer">
        <b-button variant="dark" @click="close">Cerrar</b-button>
        <b-button variant="primary" @click="saveSale">Comprar</b-button>
      </template>
      <div class="overflow-auto">
        <h5>Productos: </h5>
        <ul v-for="item in cart" :key="item.length">
          <li>Producto: {{item.product['nombre']}}</li>
          <li>Cantidad: {{item.cantidad}}</li>
          <li>Precio: {{item.product['valor']}}</li>
        </ul>
      </div>
      <h4 class="text-success">mi total es: ${{valorT}}</h4>
      </b-modal>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      data: [],
      dataC: [],
      option: null,
      cart: [],
      valorT: 0,
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
      } else {
        this.getProducts();
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
    },
    addCart(product) {
      const producto = {
        product: product,
        cantidad: 1
      };
      this.cart.push(producto);
    },
    increment(id){
      for (let index = 0; index < this.cart.length; index ++) {
        if (this.cart[index].product['id'] === id) {
          this.cart[index].cantidad = this.cart[index].cantidad + 1;
        }
      }
    },
    decrecrement(id){
      for (let index = 0; index < this.cart.length; index ++) {
        if (this.cart[index].product['id'] === id) {
          this.cart[index].cantidad = this.cart[index].cantidad - 1;
        }
      }
    },
    precio(){
      let total = 0;
      for (let i = 0; i < this.cart.length; i ++){
        total = total + (this.cart[i].product['valor2'] * this.cart[i].cantidad);
      }
      this.valorT = total;
    },
    clean() {
      this.cart = [];
    },
    saveSale(){
      if (this.cart.length){
        this.axios.post(`${this.url}/sale/save`, {
          data: this.cart
        }).then( res => {
          console.log(res);
          this.$bvModal.hide('my-modal')
        }).catch( err => {
          console.log(err);
        })
      }
    },
    close() {
      this.$bvModal.hide('my-modal')
    }

  },
  mounted() {
    this.getProducts();
    this.getCategories();
  }
}
</script>

<style scoped>
img {
  width: 200px; /* You can set the dimensions to whatever you want */
  height: 200px;
  object-fit: cover;
}
</style>
