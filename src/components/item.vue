<template>
    <md-card v-if="item" class="md-card-example">
      <md-card-area md-inset>
        <md-card-media md-ratio="16:9">
          <img v-bind:src="item.img_url" :alt="item.title">
        </md-card-media>

        <md-card-header>
          <h2 class="md-title">{{item.title}}</h2>
          <div class="md-subhead">
            <md-icon>attach_money</md-icon>
            <span>{{item.price}} BTC</span>
          </div>
        </md-card-header>

        <md-card-content>
          {{item.description}}
        </md-card-content>
      </md-card-area>

      <md-card-content>
        <span>{{item.quantity}} Available</span>
        <md-field>
          <label>Quantity</label>
          <md-input v-model="buyerQuantity" type="number"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="addToCart(item, buyerQuantity)" class="md-primary md-raised">Add to Cart</md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
import ProductService from '../service/product-service'

export default {
  name: 'item',
  data: () => ({
    item: null,
    buyerQuantity: 1
  }),
  methods: {
    addToCart: function (product, buyerQuantity) {
      let cart = JSON.parse(localStorage.getItem('cart'))

      if (cart === null) {
        cart = {}
      }

      if (cart[product.id]) {
        cart[product.id].quantity = parseInt(cart[product.id].quantity) + parseInt(buyerQuantity)
      } else {
        cart[product.id] = {
          product: product,
          quantity: buyerQuantity
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart))
    }
  },
  created () {
    let service = new ProductService()
    service.getProduct(this.$route.params.id)
      .then(response => (this.item = response.data))
      .catch(e => {
        console.error(e)
      })
  }
}
</script>

<style scoped>

</style>
