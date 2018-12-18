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

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Notifications)
Vue.use(VueTruncate)
Vue.use(VueI18n)

const messages = {
  en: {
    login: 'Login',
    error: 'Error',
    products: 'Products',
    product: 'Product',
    quantity: 'Quantity',
    available: 'Available',
    checkout: 'Checkout',
    total: 'Total',
    shippingInformation: 'Shipping Information',
    overview: 'Overview',
    password: 'Password',
    button: {
      goToItems: 'Go to items',
      create: 'Create',
      update: 'Update',
      addCart: 'Add to Cart'
    },
    form: {
      username: 'Username',
      fullName: 'Full Name',
      street: 'Street',
      form: 'Zip',
      country: 'Country',
      title: 'Title',
      price: 'Price',
      quantity: 'Quantity',
      description: 'Description',
      imgUrl: 'Image Url'
    },
    validation: {
      required: 'Required',
      maxLength: 'Max {maxChars} characters',
      minVal: 'Min {min}',
      minLength: 'Min length: {minChars}',
      maxVal: 'Max {max}',
      noUrl: 'Not a valid URL'
    },
    notification: {
      error: 'Error',
      loginFailed: 'Login Failed',
      errorStoringOrder: 'Failed storing order',
      productCreated: 'The new product has been created',
      productNotCreated: 'Could not create Product',
      productUpdated: 'The product has been updated',
      productNotUpdated: 'Could not update Product',
      productDeleted: 'Product has been deleted',
      productNotDeleted: 'Failed deleting  product',
      added: 'Added',
      getProductFailed: 'Could not fetch the product'
    }
  },
  de: {
    login: 'Einloggen'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

const routes = [
  { name: 'item', path: '/item/:id', component: item },
  { name: 'items', path: '/', component: items },
  { name: 'login', path: '/login', component: login },
  { name: 'cart', path: '/cart', component: cart },
  { name: 'product', path: '/product', component: crudProduct },
  { name: 'product', path: '/product/:id', component: crudProduct },
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
