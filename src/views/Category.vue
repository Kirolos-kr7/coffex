<template>
  <div class="beans page">
    <Navbar />
    <v-container
      class="d-flex justify-center align-center"
      style="height: 85vh"
      v-if="!loaded"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-container>
    <v-container v-else>
      <div class="top-bar d-flex justify-space-between align-center flex-wrap">
        <h3 class="mt-4 mx-auto mb-2 text-capitalize">
          {{ cat + 's (' + products.length + ')' }}
        </h3>
      </div>
      <Products :products="products" />
      <v-btn
        dark
        class="mx-auto d-block mb-4"
        v-if="moreBtn"
        @click="
          getMoreProducts()
          loadingBtn = true
        "
        :loading="loadingBtn"
      >
        <span> More Products </span>
      </v-btn>
      <span v-else class="mx-auto d-block my-6 text-center"
        >Go Away, Nothing to see here.</span
      >
    </v-container>
  </div>
</template>

<script>
import { db } from '../firebase'
import Navbar from '../components/Navbar'
import Products from '../components/Products'

export default {
  name: 'Beans',
  data() {
    return {
      products: [],
      loaded: true,
      lastVisible: undefined,
      maxDocs: 0,
      loadingBtn: false,
    }
  },
  components: {
    Navbar,
    Products,
  },
  methods: {
    getMoreProducts() {
      db.collection('products')
        .startAfter(this.lastVisible)
        .limit(6)
        .where('type', '==', this.cat)
        .get()
        .then((querySnapshot) => {
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
          querySnapshot.docs.forEach((doc) => {
            let product = doc.data()
            product.id = doc.id
            this.products.push(product)
          })
          this.loadingBtn = false
        })
    },
    loadProducts() {
      this.products = []
      this.loaded = true
      this.lastVisible = undefined
      this.maxDocs = 0
      this.loadingBtn = false
      db.collection('products')
        .limit(2)
        .where('type', '==', this.cat)
        .get()
        .then((querySnapshot) => {
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
          querySnapshot.docs.forEach((doc) => {
            let product = doc.data()
            product.id = doc.id
            this.products.push(product)
          })
          this.products.sort(() => Math.random() - 0.5)
          this.loaded = true
        })

      db.collection('products')
        .where('type', '==', this.cat)
        .get()
        .then((snapshot) => (this.maxDocs = snapshot.size))
    },
  },
  computed: {
    moreBtn() {
      return this.products.length < this.maxDocs
    },
    cat() {
      return this.$route.params.cat
    },
  },
  watch: {
    cat() {
      this.loadProducts()
    },
  },
  mounted() {
    this.loadProducts()
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 105px 0 0 0;
}
</style>
