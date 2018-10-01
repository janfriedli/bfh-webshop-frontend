<template>
    <div id="items" class="md-layout md-gutter">
        <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 md-xlarge-size-25" v-for="item in items" v-bind:key="item.id" >
            <product v-bind:product="item"></product>
        </div>
    </div>
</template>

<script>
import Product from './product'
import ProductService from '../service/product-service'

export default {
  name: 'items',
  components: { Product },
  data: () => ({
    items: []
  }),
  created () {
    let service = new ProductService()
    service.getProducts()
      .then(response => (this.items = response.data))
      .catch(e => {
        console.error(e)
      })
  }
}
</script>

<style scoped>

</style>
