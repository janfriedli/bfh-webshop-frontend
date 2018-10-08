<template>
    <section>
        <div v-if="items && items.length > 0" id="items" class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 md-xlarge-size-25" v-for="item in items" v-bind:key="item.id" >
                <product v-bind:product="item"></product>
            </div>
        </div>
        <div v-if="items && items.length === 0">
            <md-empty-state
                    md-icon="shopping_basket"
                    md-label="Create your first product">
                <md-button :to="{ name: 'product' }" class="md-primary md-raised">Create first product</md-button>
            </md-empty-state>
        </div>
    </section>
</template>

<script>
import Product from './product'
import ProductService from '../service/product-service'

export default {
  name: 'items',
  components: { Product },
  data: () => ({
    items: null
  }),
  created () {
    ProductService.getProducts()
      .then(response => (this.items = response.data))
      .catch(e => {
        console.error(e)
      })
  }
}
</script>

<style scoped>

</style>
