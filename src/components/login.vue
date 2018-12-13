<template>
  <div>
    <section class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="username"/>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" autocomplete="password" v-model="password"/>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" @click="login(username, password)" class="md-primary">Login</md-button>
        </md-card-actions>
      </md-card>
    </section>
  </div>
</template>

<script>
import UserService from '../service/user-service'

export default {
  name: 'item',
  data: () => ({
    username: null,
    password: null
  }),
  methods: {
    login: function () {
      UserService.login(this.username, this.password).then(() => {
        this.$router.push({ name: 'items' })
      }).catch(() => {
        this.$notify({
          type: 'warn',
          position: 'top right',
          group: 'notification',
          title: 'Error',
          text: 'Login  Failed'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
