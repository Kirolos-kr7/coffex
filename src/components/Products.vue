<template>
  <div class="product">
    <v-row>
      <v-col v-for="product in products" :key="product.id" md="4" sm="6">
        <v-card class="ma-6 mx-auto" max-width="300">
          <v-img
            v-if="product.productImage === null"
            src="../assets/ImageNotAvalabile.png"
            height="300"
          ></v-img>
          <v-img v-else :src="product.productImage"></v-img>
          <h4 class="mx-5 my-1 text-decoration-underline">
            <router-link :to="{ name: 'Product', params: { id: product.id } }">
              {{ product.productName }}
            </router-link>
          </h4>
          <v-card-text class="description px-5 mb-4">
            {{ product.description }}
          </v-card-text>
          <div class="d-flex justify-space-between align-center mx-5 mb-1">
            <span
              style="
                color: #fff;
                background: #333;
                padding: 3px 9px;
                font-size: 12px;
                border-radius: 15px;
              "
              >Stock: {{ product.stock }}</span
            >
            <span v-if="!product.discount > 0">{{ product.price + '$' }}</span>
            <div v-else>
              <span>{{
                (
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2) +
                '$' +
                ' '
              }}</span>
              <span
                style="
                  text-decoration: line-through;
                  font-size: 12px;
                  color: crimson;
                "
                >{{ product.price + '$' }}</span
              >
            </div>
          </div>
          <v-card-actions class="py-4">
            <v-btn dark class="mx-auto" @click="addToCart(product)">
              <v-icon left>add</v-icon>
              <span> Add To Cart </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      fixed
      bottom
      right
      rounded="pill"
      :timeout="1500"
      width="120px"
    >
      <div class="content mx-auto text-center" @click="snackbar = false">
        <v-icon dark left>check</v-icon>
        <span>{{ snackbarText }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: '',
    }
  },
  props: ['products'],
  methods: {
    shortDescription(str) {
      return str.slice(0, 80) + ' ...'
    },
    addToCart(product) {
      let cart,
        newProduct = {}

      if (
        localStorage.getItem('cart') === null ||
        localStorage.getItem('cart') === ''
      ) {
        localStorage.setItem('cart', JSON.stringify([]))
      }
      newProduct.quantity = 1
      cart = JSON.parse(localStorage.getItem('cart'))

      let isInCart = false

      cart.forEach((productInCart) => {
        if (productInCart.id === product.id) {
          isInCart = true
        }
      })

      if (!isInCart) {
        newProduct.id = product.id
        cart.push(newProduct)
        this.$store.state.cartCount++
      } else {
        cart.forEach((productInCart) => {
          if (productInCart.id === product.id) {
            productInCart.quantity++
          }
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      this.snackbar = true
      this.snackbarText = 'Added To Cart'
    },
  },
}
</script>

<style scoped>
.description {
  height: 6.2em;
  overflow: hidden;
  position: relative;
}

.description::after {
  content: '';
  position: absolute;
  width: 70%;
  height: calc(6.2em / 3);
  bottom: 0;
  right: 0;
  background-image: linear-gradient(270deg, #fff 15%, #ff000000);
}
</style>