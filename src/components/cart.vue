<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Cart Overview</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>Article</md-table-head>
        <md-table-head md-numeric>Quantity</md-table-head>
        <md-table-head md-numeric>Price</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-head>Headset</md-table-head>
        <md-table-head md-numeric>5</md-table-head>
        <md-table-head md-numeric>35 CHF</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-head>Screen</md-table-head>
        <md-table-head md-numeric>1</md-table-head>
        <md-table-head md-numeric>400 CHF</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head md-numeric></md-table-head>
        <md-table-head md-numeric class="bold">Total: 1400 CHF</md-table-head>
      </md-table-row>
    </md-table>
    <md-card-actions>
      <router-link to="/pay"><md-button class="md-raised md-primary">Pay</md-button></router-link>
    </md-card-actions>
  </div>
</template>

<script>
export default {
  name: 'cart'
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
