import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import { VueShowdown } from 'vue-showdown'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cart: [],
    cartCount: 0,
  },
  mutations: {
    getCart(state) {
      if (
        localStorage.getItem('cart') === null ||
        localStorage.getItem('cart') === '' ||
        localStorage.getItem('cart') === 'undefined'
      ) {
        localStorage.setItem('cart', JSON.stringify([]))
      }
      state.cartCount = JSON.parse(localStorage.getItem('cart')).length
    },
    updateCart(state, cart) {
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(cart))
      state.cartCount = JSON.parse(localStorage.getItem('cart')).length
    },
  },
})

Vue.component('VueShowdown', VueShowdown)
Vue.use(firestorePlugin)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store: store,
  render: (h) => h(App),
}).$mount('#app')
