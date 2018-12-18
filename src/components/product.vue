<template>
    <md-card class="product-card">
      <md-card-header>
        <div class="md-title">{{product.title}}</div>
        <div class="md-subhead">{{product.price}} BTC</div>
      </md-card-header>

      <md-card-media>
        <img v-bind:src="product.img_url" alt="Product">
      </md-card-media>

      <md-card-content>
        {{product.description | truncate(150) }}
      </md-card-content>

      <md-card-actions>
        <router-link v-if="isLoggedIn()" :to="{ name: 'product', params: { id: product.id }}">
          <md-button class="md-raised md-secondary">{{ $t("button.edit") }}</md-button>
        </router-link>
        <router-link :to="{ name: 'item', params: { id: product.id }}">
          <md-button class="md-raised md-primary">{{ $t("button.buy") }}</md-button>
        </router-link>
      </md-card-actions>
    </md-card>
</template>

<script>
import UserService from '../service/user-service'

export default {
  name: 'product',
  props: {
    product: Object
  },
  methods: {
    isLoggedIn: function () {
      return UserService.isLoggedIn()
    }
  }
}
</script>

<style scoped>
  .product-card {
    margin-bottom: 2rem;
  }
</style>
