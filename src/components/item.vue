<template>
  <div class="md-layout md-alignment-top-center">
    <md-card v-if="item" class="md-layout-item md-size-50 md-small-size-100">
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
        <span>{{item.quantity}} {{ $t("available") }}</span>
        <md-field :class="getValidationClass()">
          <label>{{ $t("quantity") }}</label>
          <md-input v-model.number="buyerQuantity" type="number"></md-input>
          <span class="md-error" v-if="quantityError">{{ $t("validation.wrongQuantity") }}</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="addToCart(item, buyerQuantity)" class="md-primary md-raised">
          {{ $t("button.addCart") }}
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import ProductService from '../service/product-service'
import CartService from '../service/cart-service'

export default {
  name: 'item',
  data: () => ({
    quantityError: false,
    item: null,
    buyerQuantity: 1
  }),
  methods: {
    addToCart: function (product, buyerQuantity) {
      if (buyerQuantity > 0 && buyerQuantity <= product.quantity) {
        this.quantityError = false
        CartService.addToCart(product, buyerQuantity)
        this.$notify({
          type: 'info',
          position: 'top right',
          group: 'notification',
          title: this.$i18n.t('notification.added'),
          text: product.title + ': ' + buyerQuantity
        })
      } else {
        this.quantityError = true
      }

    },
    getValidationClass: function () {
      if (this.quantityError) {
        return 'md-invalid'
      }
      return ''
    }
  },
  created () {
    ProductService.getProduct(this.$route.params.id)
      .then(response => (this.item = response.data))
      .catch(e => {
        this.$notify({
          type: 'warning',
          position: 'top right',
          group: 'notification',
          title: this.$i18n.t('error'),
          text: this.$i18n.t('notification.getProductFailed')
        })
      })
  }
}
</script>

<style scoped>

</style>
