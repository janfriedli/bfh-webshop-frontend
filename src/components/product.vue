<template>
    <md-card class="product-card">
      <md-card-header>
        <md-avatar>
          <img src="https://via.placeholder.com/350x150" alt="Avatar">
        </md-avatar>

        <div class="md-title">{{product.title}}</div>
        <div class="md-subhead">{{product.subtitle}}</div>
      </md-card-header>

      <md-card-media>
        <img src="https://via.placeholder.com/350x150" alt="People">
      </md-card-media>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-primary">Buy</md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: 'product',
  props: {
    product: Object
  }
}
</script>

<style scoped>
  .product-card {
    margin-bottom: 2rem;
  }
</style>
