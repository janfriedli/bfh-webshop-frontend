import axios from 'axios'
import config from '../../config'

/**
 * HTTP service to get product data
 */
export default class ProductService {
  static BACKEND_URL = config.apiUrl

  /**
   * get All products
   * @returns {AxiosPromise<any>}
   */
  static getProducts () {
    return axios.get(this.BACKEND_URL + '/product')
  }

  /**
   * get a single product by its id
   * @param id
   * @returns {AxiosPromise<any>}
   */
  static getProduct (id) {
    return axios.get(this.BACKEND_URL + '/product/' + id)
  }

  /**
   * create a product
   * @param product
   * @returns {AxiosPromise<any>}
   */
  static createProduct (product) {
    return axios.post(this.BACKEND_URL + '/product', product)
  }

  /**
   * update a product
   * @param product
   * @returns {AxiosPromise<any>}
   */
  static updateProduct (product) {
    return axios.put(this.BACKEND_URL + '/product/' + product.id, product)
  }

  /**
   * remove a product
   * @param id
   * @returns {AxiosPromise}
   */
  static deleteProduct (id) {
    return axios.delete(this.BACKEND_URL + '/product/' + id)
  }
}
