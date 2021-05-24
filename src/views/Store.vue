<template>
  <div class="beans page">
    <Navbar />
    <v-img src="../assets/Coffee.jpg" height="350px"></v-img>
    <div class="boxShadow">
      <div class="textShow text-center">
        <h2 class="mt-4 mx-auto mb-2 text-uppercase">All Our Products</h2>
      </div>
    </div>
    <div class="dirt">
      <p class="text-center mx-auto" style="width: 50%">
        We've been developing and improving our classic blends for over 60
        years. Choose from our locally roasted beans, ground coffee or pod
        varieties.
      </p>
    </div>
    <v-container
      class="d-flex justify-center align-center"
      style="height: 85vh"
      v-if="!loaded"
    >
    </v-container>
    <v-container v-else>
      <div
        class="top-bar d-flex justify-space-between align-center flex-wrap"
      ></div>
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
  name: 'Store',
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
  },
  computed: {
    moreBtn() {
      return this.products.length < this.maxDocs
    },
  },
  mounted() {
    db.collection('products')
      .limit(3)
      .get()
      .then((querySnapshot) => {
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        querySnapshot.docs.forEach((doc) => {
          let product = doc.data()
          product.id = doc.id
          this.products.push(product)
        })
        this.loaded = true
      })

    db.collection('products')
      .get()
      .then((snapshot) => (this.maxDocs = snapshot.size))
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 105px 0 0 0;
}

.boxShadow {
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
  .textShow {
    background: #fff;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -50px;
    z-index: 4;
    position: relative;
    clip-path: polygon(0 0, 79% 0, 78% 100%, 0% 100%);
  }
}

.dirt {
  margin-top: -50px;
  background: url('../assets/ex.jpg') center center;
  padding: 144px 0 94px;
  background-color: #e4e4e4;
  background-blend-mode: overlay;
}

@media screen and (max-width: 830px) {
  .textShow {
    clip-path: polygon(0 0, 89% 0, 88% 100%, 0% 100%) !important;
  }
}

@media screen and (max-width: 600px) {
  h2 {
    font-size: 22px;
  }
}

@media screen and (max-width: 500px) {
  .textShow {
    clip-path: none !important;
  }

  p {
    width: 80% !important;
  }
}
</style>
