<template>
    <div class="page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">My Title</span>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon>move_to_inbox</md-icon>
                        <span class="md-list-item-text">Inbox</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>send</md-icon>
                        <span class="md-list-item-text">Sent Mail</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>delete</md-icon>
                        <span class="md-list-item-text">Trash</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>error</md-icon>
                        <span class="md-list-item-text">Spam</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <md-card v-for="item in items">
                    <md-card-header>
                        <md-avatar>
                            <img src="https://via.placeholder.com/350x150" alt="Avatar">
                        </md-avatar>

                        <div class="md-title">{{item.title}}</div>
                        <div class="md-subhead">{{item.subtitle}}</div>
                    </md-card-header>

                    <md-card-media>
                        <img src="https://via.placeholder.com/350x150" alt="People">
                    </md-card-media>

                    <md-card-content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
                    </md-card-content>

                    <md-card-actions>
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                    </md-card-actions>
                </md-card>
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
    menuVisible: false,
    items: [
      { title: 'Foo', subtitle: "sub 1" },
      { title: 'Bar', subtitle: "sub 2" },
      { title: 'Pea', subtitle: "sub 3" },
      { title: 'lol', subtitle: "sub 4" },
      { title: 'miau', subtitle: "sub 5" },
      ],
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
