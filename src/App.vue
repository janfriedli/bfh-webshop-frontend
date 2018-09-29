<template>
    <div class="page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">Shop</span>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <md-toolbar id="navigation-header" class="md-transparent" md-elevation="0">Navigation</md-toolbar>
                <md-list>
                    <md-list-item>
                        <md-icon>home</md-icon>
                        <span class="md-list-item-text"><router-link to="/">Home</router-link></span>
                    </md-list-item>
                    <md-list-item>
                        <md-icon>shopping_cart</md-icon>
                        <span class="md-list-item-text"><router-link to="/cart">Cart</router-link></span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <router-view></router-view>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'

Vue.use(VueMaterial)

export default {
  name: 'app',
  components: {
  },
  data: () => ({
    menuVisible: false
  })
}
</script>

<style>
.md-app {
     height: 100vh;
 }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#navigation-header {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
