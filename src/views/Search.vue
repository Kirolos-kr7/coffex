<template>
  <div class="search page">
    <Navbar />
    <v-container>
      <div class="top-bar d-flex justify-space-between align-center flex-wrap">
        <h3 class="mt-4 mx-auto mb-2" v-if="filteredProducts.length > 0">
          You Searched For "{{ $route.params.search }}"
        </h3>
        <h3 class="mt-4 mx-auto mb-2" v-else>
          No Results For "{{ $route.params.search }}"
        </h3>
      </div>
      <Products :products="filteredProducts" />
      <span class="mx-auto d-block my-6 text-center"
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
  name: 'Search',
  data() {
    return {
      products: [],
      filteredProducts: [],
    }
  },
  components: {
    Navbar,
    Products,
  },
  computed: {},
  mounted() {
    db.collection('products')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let product = doc.data()
          product.id = doc.id
          this.products.push(product)
        })
      })
      .then(() => {
        this.products.filter((product) => {
          if (
            product.productName.includes(this.$route.params.search) ||
            product.type.includes(this.$route.params.search) ||
            product.description.includes(this.$route.params.search)
          ) {
            this.filteredProducts.push(product)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
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
