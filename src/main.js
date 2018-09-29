import Vue from 'vue'
import App from './App.vue'
import item from './components/item'
import items from './components/items'
import cart from './components/cart'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { name: 'item', path: '/item/:id', component: item },
  { name: 'items', path: '/', component: items },
  { name: 'cart', path: '/cart', component: cart }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
