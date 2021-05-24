<template>
  <div class="cart page">
    <Navbar />
    <v-container v-if="$store.state.cartCount == 0">
      <h3 class="mt-4 mx-auto mb-9 text-center">Empty Cart</h3>
      <router-link to="/store"
        ><v-btn class="mx-auto d-block">Back To Store</v-btn></router-link
      >
    </v-container>
    <v-container v-else>
      <h3 class="mt-4 mx-auto mb-9 text-center">
        Cart ({{ $store.state.cartCount }})
      </h3>
      <div class="top-bar d-flex justify-space-between align-center flex-wrap">
        <v-row>
          <v-col md="8" sm="12" cols="12">
            <v-card
              v-for="product in cartProducts"
              :key="product.id"
              class="d-flex cardBx justify-center mb-5"
              elevation=""
              min-height="200px"
            >
              <v-img
                v-if="product.productImage === null"
                src="../assets/ImageNotAvalabile.png"
                width="200px"
              ></v-img>
              <v-img v-else :src="product.productImage" width="200px"></v-img>
              <v-row class="px-3">
                <v-col sm="12" cols="12" class="pb-0">
                  <v-card-title class="px-4 pb-0 d-block">
                    {{ product.productName }}
                    <div class="titleLine">---------</div>
                  </v-card-title>
                </v-col>
                <v-col sm="12" cols="12">
                  <div class="qtyBx px-4">
                    <span class="mr-3">Qty:</span>
                    <v-btn
                      elevation="0"
                      small
                      dark
                      @click="incremantProductQuantity(product)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <input type="unmber" v-model="product.quantity" disabled />
                    <v-btn
                      elevation="0"
                      small
                      dark
                      @click="decremantProductQuantity(product)"
                      width="20px"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </div>
                </v-col>
                <v-col>
                  <h3 class="price px-4" v-if="product.quantity === 1">
                    {{ product.price + '$' }}
                  </h3>
                  <h3 class="price px-4 text-no-wrap" v-else>
                    {{ fixedPrice(product.price * product.quantity) + '$' }}
                    <span class="priceEach">
                      {{ '(' + product.price + '$ each)' }}
                    </span>
                  </h3>
                </v-col>
                <v-col>
                  <v-btn
                    class="ml-auto d-block mb-4"
                    color="red"
                    text
                    @click="removeProduct(product)"
                    >Remove Product</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" sm="12" cols="12">
            <v-card>
              <v-card-title
                class="text-center d-block"
                style="font-weight: 600; font-size: 18px"
              >
                Checkout
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div class="text--primary d-flex justify-space-between">
                  <span>Sub Total</span> <span>{{ subTotal + '$' }}</span>
                </div>
                <div class="text--primary d-flex justify-space-between">
                  <span>Shipping</span> <span>50$</span>
                </div>
                <p class="my-0 text-center">
                  Free shiping for orders over 150$
                </p>
                <div
                  class="text--primary d-flex justify-space-between"
                  v-if="subTotal > 150"
                >
                  <span>Free Shipping</span> <span>- 50$</span>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title
                class="text-center d-block"
                style="font-weight: 600; font-size: 18px"
              >
                Payment Method
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="py-0">
                <v-radio-group dense v-model="payment">
                  <v-radio label="Cash On Delivery" value="cod"></v-radio>
                  <v-radio label="Visa / MasterCard" value="visa"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <div class="text--primary d-flex justify-space-between">
                  <span style="width: 50%"
                    >Total + Shipping (including VAT)
                  </span>
                  <span>{{ this.subTotal + '$' }}</span>
                </div>
                <div class="text--primary d-flex justify-space-between"></div>
              </v-card-text>
              <v-card-actions>
                <v-btn dark left class="mx-auto mb-2"> Order Now </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { db } from '../firebase'
export default {
  name: 'cart',
  data() {
    return {
      cartProducts: [],
      payment: '',
    }
  },
  components: {
    Navbar,
  },
  methods: {
    incremantProductQuantity(product) {
      this.cartProducts.forEach((productInCart) => {
        if (productInCart.id === product.id) {
          productInCart.quantity++
          this.$store.commit('updateCart', this.cartProducts)
        }
      })
    },
    decremantProductQuantity(product) {
      this.cartProducts.forEach((productInCart) => {
        if (productInCart.id === product.id && product.quantity > 1) {
          productInCart.quantity--
          this.$store.commit('updateCart', this.cartProducts)
        }
      })
    },
    fixedPrice(price) {
      return price.toFixed(2)
    },
    removeProduct(product) {
      let index = this.cartProducts.indexOf(product)
      this.cartProducts.splice(index, 1)
      this.$store.commit('updateCart', this.cartProducts)
    },
  },
  computed: {
    subTotal() {
      let subTotal = 0
      this.cartProducts.forEach((product) => {
        subTotal += product.quantity * product.price
      })
      return subTotal.toFixed(2)
    },
  },
  mounted() {
    let productsInCart = JSON.parse(localStorage.getItem('cart'))
    productsInCart.forEach((product) => {
      db.collection('products')
        .doc(product.id)
        .get()
        .then((res) => {
          let newProduct = res.data()
          newProduct.quantity = product.quantity
          newProduct.id = res.id
          this.cartProducts.push(newProduct)
        })
    })
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 105px 0 0 0;
}

.qtyBx {
  display: flex;
  width: 165px;
  input {
    min-width: 35px;
    height: 28px;
    text-align: center;
  }
  button {
    max-width: 15px !important;
    max-width: 15px !important;
    width: 15px !important;
  }
}

.titleLine {
  letter-spacing: -5px;
  margin-top: -8px;
  &::selection {
    background: none;
  }
}

.priceEach {
  font-size: 12px;
  font-weight: 200;
  color: #555;
}

@media screen and (max-width: 570px) {
  .cardBx {
    flex-wrap: wrap;
  }
}
</style>