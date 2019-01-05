<template>
  <section class="md-layout md-alignment-top-center">
    <div class="md-layout md-gutter md-layout-item md-size-50 md-small-size-100">
      <div class="md-layout-item md-size-100">
        <md-card class="cart-card">
          <md-card-area md-inset>
            <md-card-header>
              <h2 class="md-title">{{ $t("payment") }}</h2>
            </md-card-header>
          </md-card-area>

          <md-card-content class="center">
            <div v-if="countdownSeconds > 45">
              <md-card-media>
                <img id="qr-code" src="https://i.imgur.com/VpiJHvY.png" alt="QR Code">
              </md-card-media>
              <p>
                {{ $t("send") }} <b>{{total}} BTC</b> {{ $t("to") }}: 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX
              </p>

              <p>
                <time class="accentuated">
                  {{countdownSeconds}} {{ $t("seconds") }}
                </time>
              </p>
            </div>

            <transition name="fade">
              <div v-if="countdownSeconds <= 45">
                <md-card-media >
                  <img src="https://media.giphy.com/media/SsTcO55LJDBsI/giphy.gif">
                </md-card-media>
                <p>
                  <span class="accentuated">{{ $t("paymentReceived") }}</span>
                </p>
              </div>
            </transition >
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
  name: 'Payment',
  data: () => ({
    cart: {},
    countdownSeconds: 60,
    total: 0
  }),
  created () {
    this.total = CartService.getTotal()

    let downloadTimer = setInterval(function () {
      this.countdownSeconds -= 1

      if (this.countdownSeconds === 55) {
        let orderInProgress = CartService.getOrderInProgress()
        // well -> fake payment
        orderInProgress.paid = true
        OrderService.updateOrder(orderInProgress)
          .then(() => {
            CartService.clear()
          })
          .catch(e => {
            this.$notify({
              type: 'error',
              position: 'top right',
              group: 'notification',
              title: this.$i18n.t('error'),
              text: this.$i18n.t('notification.paymentFailed')
            })
          })
      }

      if (this.countdownSeconds < 45) {
        CartService.clear()
      }
      if (this.countdownSeconds <= 0) {
        clearInterval(downloadTimer)
      }
    }.bind(this), 1000)
  },
  methods: {

  }
}
</script>

<style scoped>
  #qr-code {
    width: 30rem;
  }

  .accentuated {
    font-size: 2rem;
    font-weight: bold;
  }

  .center {
    text-align: center
  }
</style>
