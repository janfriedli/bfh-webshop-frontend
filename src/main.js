import Vue from 'vue'
import App from './App.vue'
import item from './components/item'
import items from './components/items'
import cart from './components/cart'
import crudProduct from './components/crud-product'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Notifications)

const routes = [
  { name: 'item', path: '/item/:id', component: item },
  { name: 'items', path: '/', component: items },
  { name: 'cart', path: '/cart', component: cart },
  { name: 'product', path: '/product', component: crudProduct },
  { name: 'product', path: '/product/:id', component: crudProduct }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
