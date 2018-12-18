<template>
  <div>
    <form novalidate @submit.prevent="validateRegister()" class="md-layout md-alignment-top-center">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="form.username"
                          :disabled="registrationProcessing"/>
                <span class="md-error" v-if="!$v.form.username.required">A username is required</span>
                <span class="md-error" v-else-if="!$v.form.username.maxLength">Too long</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" autocomplete="password"
                          v-model="form.password"/>
                <span class="md-error" v-if="!$v.form.password.minLength">Min length 8</span>
                <span class="md-error" v-else-if="!$v.form.password.required">Required</span>
                <span class="md-error" v-else-if="!$v.form.password.maxLength">Too long</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('passwordRepeat')">
                <label for="passwordRepeat">Password Repeat</label>
                <md-input type="password" name="passwordRepeat" id="passwordRepeat" autocomplete="password"
                          v-model="form.passwordRepeat"/>
                <span class="md-error" v-if="!$v.form.passwordRepeat.sameAs">Passwords not equal</span>
                <span class="md-error" v-else-if="!$v.form.password.required">Required</span>
                <span class="md-error" v-else-if="!$v.form.password.minLength">Min 8 characters</span>
                <span class="md-error"
                      v-else-if="!$v.form.password.maxLength">Sorry, max 64 chars :( DB restriction</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input name="email" id="email" autocomplete="email" v-model="form.email"/>
                <span class="md-error" v-if="!$v.form.email.email">Not a valid email</span>
                <span class="md-error" v-else-if="!$v.form.email.required">Required</span>
              </md-field>
            </div>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="registrationProcessing" />
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" v-if="!registrationProcessing" class="md-dense md-raised md-primary">Register</md-button>
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
  maxLength,
  sameAs,
  email
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  name: 'register',
  data: () => ({
    registrationProcessing: false,
    form: {
      username: null,
      password: null,
      passwordRepeat: null,
      email: null
    }
  }),
  methods: {
    register: function () {
      this.registrationProcessing = true
      UserService.register(this.form).then(() => {
        this.$router.push({ name: 'login' })
      }).catch(() => {
        this.$notify({
          type: 'warn',
          position: 'top right',
          group: 'notification',
          title: 'Error',
          text: 'Registration  Failed'
        })
      }).finally(() => {
        this.registrationProcessing = false
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
    validateRegister () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.register()
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
        required: required,
        minLength: minLength(8),
        maxLength: maxLength(64)
      },
      passwordRepeat: {
        required: required,
        minLength: minLength(8),
        maxLength: maxLength(64),
        sameAs: sameAs('password')
      },
      email: {
        required,
        email: email
      }
    }
  }
}
</script>

<style scoped>

</style>
