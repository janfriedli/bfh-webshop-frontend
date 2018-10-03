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
        <md-icon>loupe</md-icon>
        <span>{{item.quantity}} Available</span>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary md-raised">Add to Cart</md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
import ProductService from '../service/product-service'

export default {
  name: 'item',
  data: () => ({
    item: null
  }),
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
