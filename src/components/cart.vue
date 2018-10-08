<template>
  <section>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <h2>Products</h2>
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
        <h2>Checkout</h2>
        <md-card class="cart-card">
          <md-card-area md-inset>
            <md-card-header>
              <h2 class="md-title">Shipping Information</h2>
            </md-card-header>
          </md-card-area>

          <md-card-content class="md-layout">
            <md-field>
              <label>Full name</label>
              <md-input v-model="order.fullname" required></md-input>
            </md-field>

            <md-field>
              <label>Street</label>
              <md-input v-model="order.street" required></md-input>
            </md-field>

            <md-field>
              <label>Zip</label>
              <md-input v-model="order.zip" required></md-input>
            </md-field>

            <md-field>
              <label>Country</label>
              <md-input v-model="order.country" required></md-input>
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
            <md-button @click="postOrder()" class="md-bottom-right md-raised">Checkout</md-button>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </section>
</template>

<script>
import CartService from '../service/cart-service'
import OrderService from '../service/order-service'

export default {
  name: 'cart',
  data: () => ({
    cart: {},
    total: 0,
    order: {
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
      this.order.details = []
      const cart = CartService.getCart()
      for (let cartKey in cart) {
        if (cart.hasOwnProperty(cartKey)) {
          this.order.details.push({
            product: cart[cartKey].product,
            quantity: cart[cartKey].quantity
          })
        }
      }
      OrderService.createOrder(this.order)
        .then(response => {
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
