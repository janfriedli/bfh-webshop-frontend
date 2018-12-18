<template>
  <section>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <h2>Products</h2>
        <div v-if="Object.keys(cart).length === 0">
          <md-empty-state
                  md-icon="note_add"
                  md-label="Add something to your cart">
            <md-button :to="{ name: 'items' }" class="md-primary md-raised">Go to items</md-button>
          </md-empty-state>
        </div>
        <md-card v-for="cartItem in cart" :key="cartItem.id" class="cart-card">
          <md-card-area md-inset>
            <md-card-header>
              <h2 class="md-title">{{cartItem.product.title}}</h2>
              <div class="md-subhead">
                <md-icon>attach_money</md-icon>
                <span>{{cartItem.product.price}} BTC</span>
              </div>
            </md-card-header>
          </md-card-area>

          <md-card-content>
            <span>{{cartItem.product.quantity}} Available</span>
            <md-field>
              <label>Quantity</label>
              <md-input v-on:change="updateCart(cartItem)" v-model.number="cartItem.quantity" type="number"></md-input>
            </md-field>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div v-if="Object.keys(cart).length !== 0" class="md-layout md-gutter">
      <form novalidate @submit.prevent="validateCart()" class="md-layout-item md-size-100">
        <h2>Checkout</h2>
        <md-card class="cart-card">
          <md-card-area md-inset>
            <md-card-header>
              <h2 class="md-title">Shipping Information</h2>
            </md-card-header>
          </md-card-area>

          <md-card-content class="md-layout">
            <md-field :class="getValidationClass('fullname')">
              <label>Full name</label>
              <md-input v-model="form.fullname"></md-input>
              <span class="md-error" v-if="!$v.form.fullname.required">Required</span>
            </md-field>

            <md-field :class="getValidationClass('street')">
              <label>Street</label>
              <md-input v-model="form.street"></md-input>
              <span class="md-error" v-if="!$v.form.street.required">Required</span>
            </md-field>

            <md-field :class="getValidationClass('zip')">
              <label>Zip</label>
              <md-input v-model="form.zip"></md-input>
              <span class="md-error" v-if="!$v.form.zip.required">Required</span>
            </md-field>

            <md-field :class="getValidationClass('country')">
              <label>Country</label>
              <md-input v-model="form.country"></md-input>
              <span class="md-error" v-if="!$v.form.country.required">Required</span>
            </md-field>
          </md-card-content>
        </md-card>

        <md-card class="md-primary cart-card" id="checkout-card">
          <md-card-area md-inset>
            <md-card-header>
              <h2 class="md-title">Overview</h2>
            </md-card-header>
          </md-card-area>

          <md-card-content class="md-layout">
            <span class="md-layout-item bold">Total: {{total}} BTC </span>
            <md-button type="submit" class="md-bottom-right md-raised md-primary">Checkout</md-button>
          </md-card-content>
        </md-card>
      </form>
    </div>
  </section>
</template>

<script>
import CartService from '../service/cart-service'
import OrderService from '../service/order-service'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'cart',
  mixins: [validationMixin],
  data: () => ({
    cart: {},
    total: 0,
    form: {
      fullname: '',
      zip: null,
      street: '',
      country: '',
      paid: false,
      details: []
    }
  }),
  created () {
    this.cart = CartService.getCart()
    this.total = CartService.getTotal()
  },
  methods: {
    updateCart: function (cartItem) {
      CartService.updateCart(cartItem.product, cartItem.quantity)
      this.total = CartService.getTotal()
    },
    postOrder: function () {
      this.form.details = []
      const cart = CartService.getCart()
      for (let cartKey in cart) {
        if (cart.hasOwnProperty(cartKey)) {
          this.form.details.push({
            product: cart[cartKey].product,
            quantity: cart[cartKey].quantity
          })
        }
      }
      OrderService.createOrder(this.form)
        .then(response => {
          CartService.saveOrderInProgress(response.data)
          this.$router.push('payment')
        })
        .catch(e => {
          this.$notify({
            type: 'warn',
            position: 'top right',
            group: 'notification',
            title: 'Error',
            text: 'Could store order'
          })
        })
    },
    validateCart () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.postOrder()
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
      fullname: {
        required
      },
      zip: {
        required
      },
      street: {
        required
      },
      country: {
        required
      }
    }
  }
}
</script>

<style scoped>
  .cart-card {
    margin-bottom: 2rem;
  }

  .bold {
    font-weight: bold;
  }
</style>
