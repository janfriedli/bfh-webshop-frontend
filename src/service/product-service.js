import axios from 'axios'

/**
 * HTTP service to get product data
 */
export default class ProductService {
  BACKEND_URL = 'https://bfh-webshop-backend.herokuapp.com/v1/'

  /**
   * get All products
   * @returns {AxiosPromise<any>}
   */
  getProducts () {
    return axios.get(this.BACKEND_URL + 'product')
  }

  /**
   * get a single product by its id
   * @param id
   * @returns {AxiosPromise<any>}
   */
  getProduct (id) {
    return axios.get(this.BACKEND_URL + 'product/' + id)
  }
}
