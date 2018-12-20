import Vue from 'vue'
import App from './App.vue'
import item from './components/item'
import items from './components/items'
import login from './components/login'
import cart from './components/cart'
import crudProduct from './components/crud-product'
import Payment from './components/payment'
import register from './components/register'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import VueTruncate from 'vue-truncate-filter'
import VueI18n from 'vue-i18n'
import { messages } from './i18n/messages'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Notifications)
Vue.use(VueTruncate)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const routes = [
  { name: 'item', path: '/item/:id', component: item },
  { name: 'items', path: '/', component: items },
  { name: 'login', path: '/login', component: login },
  { name: 'cart', path: '/cart', component: cart },
  { name: 'product', path: '/product/:id', component: crudProduct },
  { name: 'product-edit', path: '/product', component: crudProduct },
  { name: 'payment', path: '/payment', component: Payment },
  { name: 'register', path: '/register', component: register }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
  i18n
}).$mount('#app')
