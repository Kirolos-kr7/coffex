<template>
  <div class="home">
    <Navbar />
    <div class="header">
      <v-container class="">
        <v-row>
          <v-col class="mt-n16 align-self-center" xs="12" sm="4" md="5" lg="5">
            <h2>Life is much better with coffee</h2>
            <router-link to="store">
              <v-btn class="mt-4" small
                >To Store <span class="arrow">---></span></v-btn
              >
            </router-link>
          </v-col>
          <v-col xs="12" sm="8" md="7" lg="7">
            <v-img src="../assets/hero.png"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar,
  },
}
</script>

<style lang="scss" scoped>
.header {
  min-height: 100vh;
  background-image: radial-gradient(circle at 20% 50%, #cda875, #9e7b4c);
  display: flex;
  align-items: center;
  color: #000;
  padding: 55px 0 0;
  .container {
    h2 {
      font-size: 1.8rem;
      text-transform: uppercase;
    }
    .arrow {
      white-space: pre;
      letter-spacing: -5px;
      font-family: monospace;
      margin-right: 5px;
      font-size: 16px;
    }
  }
}
</style>
