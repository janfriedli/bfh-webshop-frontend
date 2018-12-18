<template>
  <div>
    <div class="md-layout md-gutter">
      <form novalidate @submit.prevent="validateProduct()" class="md-layout-item md-size-100">
        <md-field :class="getValidationClass('title')">
          <label>Title</label>
          <md-input v-model="form.title" required></md-input>
          <span class="md-error" v-if="!$v.form.title.required">Required</span>
          <span class="md-error" v-else-if="!$v.form.title.maxLength">Max 25 characters</span>
        </md-field>

        <md-field :class="getValidationClass('price')">
          <label>Price</label>
          <md-input v-model="form.price" type="number" required></md-input>
          <md-icon>attach_money</md-icon>
          <span class="md-error" v-if="!$v.form.price.required">Required</span>
          <span class="md-error" v-else-if="!$v.form.price.minValue">Min 0</span>
          <span class="md-error" v-else-if="!$v.form.price.maxValue">Max 16'700'000</span>
        </md-field>

        <md-field :class="getValidationClass('quantity')">
          <label>Quantity</label>
          <md-input v-model="form.quantity" type="number" required></md-input>
          <span class="md-error" v-if="!$v.form.quantity.minValue">Min 1</span>
          <span class="md-error" v-else-if="!$v.form.quantity.required">Required</span>
        </md-field>

        <md-field :class="getValidationClass('description')">
          <label>Description</label>
          <md-textarea v-model="form.description" required></md-textarea>
          <span class="md-error" v-if="!$v.form.description.required">Required</span>
          <span class="md-error" v-else-if="!$v.form.description.maxLength">Max 255 characters</span>
        </md-field>

        <md-field :class="getValidationClass('img_url')">
          <label>Image Url</label>
          <md-input v-model="form.img_url" required></md-input>
          <span class="md-error" v-if="!$v.form.img_url.required">Required</span>
          <span class="md-error" v-else-if="!$v.form.img_url.url">Not a valid url</span>
        </md-field>

        <md-button type="submit" v-if="!form.id" class="md-dense md-bottom-right md-raised md-primary">Create</md-button>
        <md-button type="submit" v-if="form.id" class="md-dense md-bottom-right md-raised md-primary">Update</md-button>
      </form>
    </div>
    <div v-if="form.id" class="md-layout md-gutter md-alignment-top-right">
        <md-button v-on:click="deleteProduct(form.id)" class="md-fab md-mini">
          <md-icon>delete</md-icon>
        </md-button>
    </div>
  </div>
</template>

<script>
import ProductService from '../service/product-service'
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  url,
  minValue,
  maxValue
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  name: 'crudProduct',
  data: () => ({
    errors: null,
    form: {
      id: null,
      title: null,
      description: null,
      price: null,
      quantity: null,
      img_url: null
    }
  }),
  methods: {
    createProduct: function (product) {
      ProductService.createProduct(product)
        .then(response => {
          this.form = response.data
          this.$notify({
            type: 'success',
            position: 'top right',
            group: 'notification',
            title: 'Product',
            text: 'The new product has been created'
          })
        })
        .catch(e => {
          this.$notify({
            type: 'warn',
            position: 'top right',
            group: 'notification',
            title: 'Error',
            text: 'Could not create Product'
          })
        })
    },
    updateProduct: function (product) {
      ProductService.updateProduct(product)
        .then(response => {
          this.$notify({
            type: 'success',
            position: 'top right',
            group: 'notification',
            title: 'Product',
            text: 'The product has been updated'
          })
        })
        .catch(e => {
          this.$notify({
            type: 'warn',
            position: 'top right',
            group: 'notification',
            title: 'Error',
            text: 'Could not update Product'
          })
        })
    },
    deleteProduct: function (id) {
      ProductService.deleteProduct(id)
        .then(response => {
          this.$notify({
            type: 'success',
            position: 'top right',
            group: 'notification',
            title: 'Product',
            text: 'Product has been deleted'
          })
          this.$router.push({ path: '/' })
        })
        .catch(e => {
          this.$notify({
            type: 'warn',
            position: 'top right',
            group: 'notification',
            title: 'Error',
            text: 'Could not delete Product'
          })
        })
    },
    created () {
      if (this.$route.params.id) {
        ProductService.getProduct(this.$route.params.id)
          .then(response => (this.form = response.data))
          .catch(e => {
            console.error(e)
          })
      }
    },
    validateProduct () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        if (this.form.id) {
          this.updateProduct(this.form)
        } else {
          this.createProduct(this.form)
        }
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(25)
      },
      description: {
        required,
        maxLength: maxLength(255)
      },
      price: {
        required,
        minValue: minValue(0),
        // max nr of bitcoins ;) if you read this you're doing your job :P
        maxValue: maxValue(16700000)
      },
      quantity: {
        required,
        minValue: minValue(1)
      },
      img_url: {
        url,
        required
      }
    }
  }
}
</script>

<style scoped>

</style>
