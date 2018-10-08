<template>
  <section>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
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
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <md-card class="md-primary" id="checkout-card">
          <md-card-area md-inset>
            <md-card-header>
              <h2 class="md-title">Overview</h2>
            </md-card-header>
          </md-card-area>

          <md-card-content class="md-layout">
            <span class="md-layout-item bold">Total: {{getCartTotal()}} BTC </span>
            <router-link to="/payment">
              <md-button class="md-bottom-right md-raised">Checkout</md-button>
            </router-link>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </section>
</template>

<script>
import CartService from '../service/cart-service'

export default {
  name: 'cart',
  data: () => ({
    cart: {}
  }),
  created () {
    this.cart = CartService.getCart()
  },
  methods: {
    getCartTotal: function () {
      let total = 0
      for (let cartItem in this.cart) {
        if (this.cart.hasOwnProperty(cartItem)) {
          total = total + parseInt(this.cart[cartItem].quantity) * parseInt(this.cart[cartItem].product.price)
        }
      }

      return total
    },
    updateCart: function (cartItem) {
      CartService.updateCart(cartItem.product, cartItem.quantity)
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
