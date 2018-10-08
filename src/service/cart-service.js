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
      console.log(parseInt(cart[product.id].quantity), parseInt(buyerQuantity))
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
}
