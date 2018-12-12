import Vue from 'vue'
import App from './App.vue'
import item from './components/item'
import items from './components/items'
import login from './components/login'
import cart from './components/cart'
import crudProduct from './components/crud-product'
import Payment from './components/payment'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import VueTruncate from 'vue-truncate-filter'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Notifications)
Vue.use(VueTruncate)

const routes = [
  { name: 'item', path: '/item/:id', component: item },
  { name: 'items', path: '/', component: items },
  { name: 'login', path: '/login', component: login },
  { name: 'cart', path: '/cart', component: cart },
  { name: 'product', path: '/product', component: crudProduct },
  { name: 'product', path: '/product/:id', component: crudProduct },
  { name: 'payment', path: '/payment', component: Payment }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
