<template>
  <div>
    <form novalidate @submit.prevent="validateRegister()" class="md-layout md-alignment-top-center">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ $t("register") }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">{{ $t("form.username") }}</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="form.username"
                          :disabled="registrationProcessing"/>
                <span class="md-error" v-if="!$v.form.username.required">{{ $t("validation.required") }}</span>
                <span class="md-error" v-else-if="!$v.form.username.maxLength">
                  {{ $t("validation.maxVal", { max: 25 }) }}
                </span>
                <span class="md-error" v-else-if="!$v.form.username.minLength">
                   {{ $t("validation.minVal", { min: 5 }) }}
                </span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">{{ $t("form.password") }}</label>
                <md-input type="password" name="password" id="password" autocomplete="password"
                          v-model="form.password"/>
                <span class="md-error" v-if="!$v.form.password.minLength">
                   {{ $t("validation.minVal", { min: 8 }) }}
                </span>
                <span class="md-error" v-else-if="!$v.form.password.required">{{ $t("validation.required") }}</span>
                <span class="md-error" v-else-if="!$v.form.password.maxLength">
                  {{ $t("validation.maxVal", { max: '64 chars. Sorry :( DB restriction' }) }}
                </span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('passwordRepeat')">
                <label for="passwordRepeat">{{ $t("form.passwordRepeat") }}</label>
                <md-input type="password" name="passwordRepeat" id="passwordRepeat" autocomplete="password"
                          v-model="form.passwordRepeat"/>
                <span class="md-error" v-if="!$v.form.passwordRepeat.sameAs">{{ $t("validation.notEqual") }}</span>
                <span class="md-error" v-else-if="!$v.form.password.required">
                  {{ $t("validation.required") }}
                </span>
                <span class="md-error" v-else-if="!$v.form.password.minLength">
                   {{ $t("validation.minVal", { min: 8 }) }}
                </span>
                <span class="md-error" v-else-if="!$v.form.password.maxLength">
                  {{ $t("validation.maxVal", { max: '64 chars. Sorry :( DB restriction' }) }}
                </span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('register_token')">
                <label for="token">{{ $t("form.registerToken") }}</label>
                <md-input name="token" id="token" autocomplete="token" v-model="form.register_token"/>
                <span class="md-error" v-if="!$v.form.register_token.required">{{ $t("validation.required") }}</span>
              </md-field>
            </div>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="registrationProcessing" />
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" v-if="!registrationProcessing" class="md-dense md-raised md-primary">
            {{ $t("button.register") }}
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
  maxLength,
  sameAs
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
      register_token: null
    }
  }),
  methods: {
    register: function () {
      this.registrationProcessing = true
      UserService.register(this.form)
        .then(() => {
          this.$router.push({ name: 'login' })
        }).catch((data) => {
          this.$notify({
            type: 'warn',
            position: 'top right',
            group: 'notification',
            title: this.$i18n.t('error'),
            text: data.response.data.message
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
        minLength: minLength(5),
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
      register_token: {
        required
      }
    }
  }
}
</script>

<style scoped>

</style>
