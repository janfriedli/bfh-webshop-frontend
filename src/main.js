import Vue from 'vue'
import App from './App.vue'
import item from './components/item'
import items from './components/items'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
    { path: '/item/:id', component: item },
    { path: '/items' , component: items }
]


const router = new VueRouter({
    routes
})


const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

