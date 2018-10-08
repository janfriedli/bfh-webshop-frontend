<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <md-field :class="messageClass">
          <label>Title</label>
          <md-input v-model="product.title" required></md-input>
          <span class="md-error">API ERROR HERE</span>
        </md-field>

        <md-field>
          <label>Price</label>
          <md-input v-model="product.price" type="number" required></md-input>
          <md-icon>attach_money</md-icon>
        </md-field>

        <md-field>
          <label>Quantity</label>
          <md-input v-model="product.quantity" type="number" required></md-input>
        </md-field>

        <md-field :class="messageClass">
          <label>Description</label>
          <md-textarea v-model="product.description" required></md-textarea>
          <span class="md-error">API ERROR HERE</span>
        </md-field>

        <md-field :class="messageClass">
          <label>Image Url</label>
          <md-input v-model="product.img_url" required></md-input>
          <span class="md-error">API ERROR HERE</span>
        </md-field>

        <md-button v-on:click="createProduct(product)" v-if="!product.id" class="md-raised">Create</md-button>
        <md-button v-on:click="updateProduct(product)" v-if="product.id" class="md-raised">Update</md-button>
      </div>
    </div>
    <div v-if="product.id" class="md-layout md-gutter md-alignment-top-right">
        <md-button v-on:click="deleteProduct(product.id)" class="md-fab md-mini">
          <md-icon>delete</md-icon>
        </md-button>
    </div>
  </div>
</template>

<script>
// @todo implement validation
import ProductService from '../service/product-service'

export default {
  name: 'crudProduct',
  data: () => ({
    errors: null,
    product: {
      id: null,
      title: null,
      description: null,
      price: null,
      quantity: null,
      img_url: null
    }
  }),
  computed: {
    messageClass () {
      return {
        'md-invalid': this.errors
      }
    }
  },
  methods: {
    createProduct: function (product) {
      ProductService.createProduct(product)
        .then(response => {
          this.product = response.data
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
    }
  },
  created () {
    if (this.$route.params.id) {
      ProductService.getProduct(this.$route.params.id)
        .then(response => (this.product = response.data))
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>

<style scoped>

</style>