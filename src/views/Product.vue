<template>
  <div class="product page">
    <Navbar />
    <v-container>
      <v-row style="min-height: calc(100vh - 105px)">
        <v-col
          style="
            border-left: 4px dashed #e4e4e4;
            border-right: 4px dashed #e4e4e4;
            max-width: 450px;
          "
        >
          <v-img :src="product.productImage" max-width="450"></v-img>
        </v-col>
        <v-col class="mt-8">
          <h2 class="mb-1">{{ product.productName }}</h2>
          <div class="icons">
            <div class="icon d-inline-flex align-center">
              <v-img src="../assets/beans.svg" width="22" height="22"></v-img>
              <span
                class="ml-3 overline"
                style="
                  font-family: 'Lexend Mega', sans-serif !important;
                  color: rosybrown;
                  font-size: 10px !important;
                "
                >{{ product.roast }}</span
              >
            </div>
            <br />
            <div class="icon d-inline-flex align-center mt-n2">
              <v-img src="../assets/scales.svg" width="22" height="22"></v-img>

              <span
                class="ml-3 overline"
                style="
                  font-family: 'Lexend Mega', sans-serif !important;
                  color: rosybrown;
                  font-size: 10px !important;
                "
                >{{ product.size }}</span
              >
            </div>
          </div>
          <p class="paragraph mt-3">{{ product.description }}</p>
          <h3 class="mb-3" v-if="product.discount > 0">
            <span>{{ product.price }}</span
            >$
          </h3>
          <h3 class="mb-3" v-else>
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
          </h3>
          <v-btn @click="addToCart(product)">Add To cart</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { db } from '../firebase'

export default {
  name: 'Product',
  data() {
    return {
      product: {},
    }
  },
  components: {
    Navbar,
  },
  props: ['id'],
  methods: {
    addToCart(product) {
      this.snackbar = true
      this.snackbarText = 'Added To Cart'
      let cart

      if (localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', JSON.stringify([]))
      }
      product.quantity = 1
      cart = JSON.parse(localStorage.getItem('cart'))

      let isInCart = false

      cart.forEach((productInCart) => {
        if (productInCart.id === product.id) {
          isInCart = true
        }
      })

      if (!isInCart) {
        cart.push(product)
      } else {
        cart.forEach((productInCart) => {
          if (productInCart.id === product.id) {
            productInCart.quantity++
          }
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
    },
  },
  mounted() {
    db.collection('products')
      .doc(this.$route.params.id)
      .get()
      .then((snapshot) => {
        this.product = snapshot.data()
      })
  },
}
</script>

<style lang="scss" scoped>
.page {
  margin: 105px 0 0 0;
}
.v-progress-circular {
  margin: 1rem;
}
.paragraph {
  color: darkcyan;
}
</style>