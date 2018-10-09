/**
 * Service to manage the cart stored in local storage
 */
export default class CartService {
  /**
   * add a product to the cart and save it in the local storage
   * @param product
   * @param buyerQuantity
   * @returns {object}
   */
  static addToCart (product, buyerQuantity) {
    let cart = this.getCart()

    if (cart[product.id]) {
      cart[product.id].quantity = parseInt(cart[product.id].quantity) + parseInt(buyerQuantity)
    } else {
      cart[product.id] = {
        product: product,
        quantity: parseInt(buyerQuantity)
      }
    }

    return this.save(cart)
  }

  /**
   * return the parsed cart
   * @returns {object}
   */
  static getCart () {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart === null) {
      cart = {}
    }

    return cart
  }

  /**
   * updated a product - simplify the api
   * @param product
   * @param buyerQuantity
   */
  static updateCart (product, buyerQuantity) {
    let cart = this.getCart()
    cart[product.id] = {
      product: product,
      quantity: parseInt(buyerQuantity)
    }

    this.save(cart)
  }

  /**
   * save a cart into local storage
   * @param cart
   * @returns {Object}
   */
  static save (cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
    return this.getCart()
  }

  /**
   * calculated the sum of the order
   * @returns {number}
   */
  static getTotal () {
    let total = 0
    let cart = this.getCart()
    for (let cartItem in cart) {
      if (cart.hasOwnProperty(cartItem)) {
        total = total + parseInt(cart[cartItem].quantity) * parseInt(cart[cartItem].product.price)
      }
    }

    return total
  }

  /**
   * save the most recent order
   * @param order
   */
  static saveOrderInProgress(order) {
    localStorage.setItem('orderInProgress', JSON.stringify(order))
  }

  /**
   * get the order in progress
   * @returns {any}
   */
  static getOrderInProgress() {
    return JSON.parse(localStorage.getItem('orderInProgress'));
  }

  /**
   * empty cart
   */
  static clear () {
    localStorage.setItem('cart', JSON.stringify({}))
  }
}
