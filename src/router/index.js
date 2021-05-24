import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Cart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
import Store from '../views/Store.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/cart',
    name: 'Cart',

    component: Cart,
  },
  {
    path: '/admin',
    name: 'Admin',

    component: Admin,
  },
  {
    path: '/store',
    name: 'Store',

    component: Store,
  },
  {
    path: '/cat/:cat',
    name: 'Category',
    component: Category,
  },
  {
    path: '/s/:search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
