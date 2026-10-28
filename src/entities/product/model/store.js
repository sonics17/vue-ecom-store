import { ref } from 'vue'
import { defineStore } from 'pinia'
import { productsApi } from '../api/products-api'
import { adaptProductDetails } from './adaptProductDetails'
import { adaptProducts } from './adaptProducts'
import { adaptVariants } from './adaptVariants'

export const useProductStore = defineStore('productStore', () => {
  const products = ref([])
  const totalCount = ref(0)
  const isOutOfRange = ref(false)

  const currentProduct = ref(null)
  const productVariants = ref([])

  const isLoadingCatalog = ref(true)
  const isLoadingDetails = ref(true)
  const isLoadingVariants = ref(true)

  // const productsController = ref(null)

  const loadProducts = async (params, signal) => {
    // if (productsController.value) {
    //   productsController.value.abort()
    // }

    // productsController.value = new AbortController()
    // const timeoutSignal = AbortSignal.timeout(1000)
    // const controllerSignal = productsController.value.signal
    // const signal = AbortSignal.any([controllerSignal])

    isLoadingCatalog.value = true

    try {
      const result = await productsApi.getCatalogProducts(params, signal)
      products.value = adaptProducts(result.products)
      totalCount.value = result.totalCount
      isOutOfRange.value = result.isOutOfRange
    } catch (err) {
      console.error('Error:', err)
    } finally {
      if (!signal?.aborted) {
        isLoadingCatalog.value = false
      }
      // if (productsController.value?.signal === controllerSignal) {
      //   productsController.value = null
      //   isLoadingCatalog.value = false
      // }
    }
  }

  const loadProductDetails = async currentVariantId => {
    isLoadingDetails.value = true
    isLoadingVariants.value = true

    try {
      const rawProductData =
        await productsApi.getProductVariant(currentVariantId)
      let rawVariantsData = []
      if (rawProductData) {
        rawVariantsData = await productsApi.getProductVariants(
          rawProductData.product_id,
          currentVariantId,
        )
      }
      currentProduct.value = adaptProductDetails(rawProductData)
      productVariants.value = adaptVariants(rawVariantsData)
    } catch (err) {
      console.error('Error:', err)
      // currentProduct.value = null
      // productVariants.value = []
    } finally {
      isLoadingDetails.value = false
      isLoadingVariants.value = false
    }
  }

  return {
    products,
    totalCount,
    isOutOfRange,
    isLoadingCatalog,
    isLoadingDetails,
    isLoadingVariants,
    currentProduct,
    productVariants,
    loadProducts,
    loadProductDetails,
  }
})
