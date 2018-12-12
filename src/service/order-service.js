import axios from 'axios'

/**
 * HTTP service to get order data
 */
export default class OrderService {
  static BACKEND_URL = 'http://localhost:8000/v1/'

  /**
   * get All orders
   * @returns {AxiosPromise<any>}
   */
  static getOrders () {
    return axios.get(this.BACKEND_URL + 'order')
  }

  /**
   * get a single order by its id
   * @param id
   * @returns {AxiosPromise<any>}
   */
  static getOrder (id) {
    return axios.get(this.BACKEND_URL + 'order/' + id)
  }

  /**
   * create a order
   * @param order
   * @returns {AxiosPromise<any>}
   */
  static createOrder (order) {
    return axios.post(this.BACKEND_URL + 'order', order)
  }

  /**
   * update a order
   * @param order
   * @returns {AxiosPromise<any>}
   */
  static updateOrder (order) {
    return axios.put(this.BACKEND_URL + 'order/' + order.id, order)
  }

  /**
   * remove a order
   * @param id
   * @returns {AxiosPromise}
   */
  static deleteOrder (id) {
    return axios.delete(this.BACKEND_URL + 'order/' + id)
  }
}
