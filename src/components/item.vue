<template>
    <md-card class="md-card-example">
      <md-card-area md-inset>
        <md-card-media md-ratio="16:9">
          <img src="https://via.placeholder.com/1500x1500" alt="Product">
        </md-card-media>

        <md-card-header>
          <h2 class="md-title">Some Product</h2>
          <div class="md-subhead">
            <md-icon>attach_money</md-icon>
            <span>200 CHF</span>
          </div>
        </md-card-header>

        <md-card-content>
          Illy Coffee served with a complimentary Leonidas Belgian Chocolate with all beverages.
        </md-card-content>
      </md-card-area>

      <md-card-content>
        <h3 class="md-subheading">Today's availability</h3>
        <md-icon>loupe</md-icon>
        <span>14 Available</span>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary md-raised">Add to Cart</md-button>
      </md-card-actions>
    </md-card>

</template>

<script>
export default {
  name: 'item',
  data: () => ({
    orderQuantity: 0,
  })
}
</script>

<style scoped>

</style>
