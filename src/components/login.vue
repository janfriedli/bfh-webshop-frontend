<template>
  <div>
    <form novalidate @submit.prevent="validateLogin()" class="md-layout md-alignment-top-center">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ $t("login") }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">{{ $t("form.username") }}</label>
                <md-input  name="username" id="username"
                           autocomplete="given-name" v-model="form.username" :disabled="loginProcessing"/>
                <span class="md-error" v-if="!$v.form.username.required">{{ $t("validation.required") }}</span>
                <span class="md-error" v-else-if="!$v.form.username.maxLength">
                  {{ $t("validation.maxLength", { maxChars: 25 }) }}
                </span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">{{ $t("password") }}</label>
                <md-input type="password" name="password" id="password"
                          autocomplete="password" v-model="form.password"/>
                <span class="md-error" v-if="!$v.form.password.minLength">
                  {{ $t("validation.minLength", { minChars: 8 }) }}
                </span>
                <span class="md-error" v-else-if="!$v.form.password.maxLength">
                  {{ $t("validation.maxLength", { maxChars: 64 }) }}
                </span>
              </md-field>
            </div>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="loginProcessing" />
        </md-card-content>

        <md-card-actions>
          <md-button  type="submit" v-if="!loginProcessing" class="md-dense md-raised md-primary">
            {{ $t("login") }}
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import UserService from '../service/user-service'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  name: 'item',
  data: () => ({
    loginProcessing: false,
    form: {
      username: null,
      password: null
    }
  }),
  methods: {
    login: function () {
      this.loginProcessing = true
      UserService.login(this.form.username, this.form.password).then(() => {
        this.$router.push({ name: 'items' })
      }).catch(() => {
        this.$notify({
          type: 'warn',
          position: 'top right',
          group: 'notification',
          title: this.$i18n.t('notification.error'),
          text: this.$i18n.t('notification.loginFailed')
        })
      }).finally(() => {
        this.loginProcessing = false
      })
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateLogin () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.login()
      }
    }
  },
  validations: {
    form: {
      username: {
        required,
        maxLength: maxLength(25)
      },
      password: {
        minLength: minLength(8),
        maxLength: maxLength(64)
      }
    }
  }
}
</script>

<style scoped>

</style>
