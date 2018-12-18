<template>
    <div class="page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <router-link to="/"><span class="md-title">Shop</span></router-link>
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
                    <md-list-item v-if="isLoggedIn()">
                        <md-icon>add</md-icon>
                        <span class="md-list-item-text"><router-link to="/product">Add product</router-link></span>
                    </md-list-item>
                    <md-list-item v-if="isLoggedIn()">
                        <md-icon>open_in_new</md-icon>
                            <span @click="logout()" class="md-list-item-text">
                                <router-link to="#">Logout</router-link>
                            </span>
                    </md-list-item>
                    <md-list-item v-if="!isLoggedIn()">
                        <md-icon>input</md-icon>
                        <span class="md-list-item-text"><router-link to="/login">Login</router-link></span>
                    </md-list-item>
                    <md-list-item v-if="!isLoggedIn()">
                        <md-icon>add</md-icon>
                        <span class="md-list-item-text"><router-link to="/register">Register</router-link></span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <notifications group="notification" />
                <router-view></router-view>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import UserService from './service/user-service'

Vue.use(VueMaterial)

export default {
  name: 'app',
  components: {
  },
  data: () => ({
    menuVisible: false
  }),
  methods: {
    isLoggedIn: function () {
      return UserService.isLoggedIn()
    },
    logout: function () {
      UserService.logout()
    }
  }
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
