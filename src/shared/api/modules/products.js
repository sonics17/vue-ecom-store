import { supabase } from '../supabase'

const SORT_MAP = {
  price_asc: { column: 'price', ascending: true },
  price_desc: { column: 'price', ascending: false },
}

export const LIMIT = 12

export const productsApi = {
  getCatalogProducts: async params => {
    let query = supabase.from('product_color_variants').select(
      `
      id,
      product_id,
      image_url,
      colors!inner (id, name, hex),
      products_stock!inner (
        stock,
        sizes!inner (id, name)
      ),
      products!inner (
        id, name, price, category_id, brands (id, name)
      )
    `,
      { count: 'exact' },
    )

    if (params.categoryIds && params.categoryIds.length > 0) {
      query = query.in('products.category_id', params.categoryIds)
    }

    if (params.minPrice !== null && params.minPrice !== undefined) {
      query = query.gte('products.price', params.minPrice)
    }

    if (params.maxPrice !== null && params.maxPrice !== undefined) {
      const extendedMaxPrice = params.maxPrice + 0.99
      query = query.lte('products.price', extendedMaxPrice)
    }

    if (params.colors && params.colors.length > 0) {
      query = query.in('colors.id', params.colors)
    }

    if (params.sizes && params.sizes.length > 0) {
      query = query.in('products_stock.sizes.id', params.sizes)
    }

    query = query.gt('products_stock.stock', 0)

    if (params.sort && params.sort !== 'default') {
      query = query.order(`products(${SORT_MAP[params.sort].column})`, {
        ascending: SORT_MAP[params.sort].ascending,
      })
    } else {
      query = query.order('id', { ascending: true })
    }

    const page = params.page || 1
    const from = LIMIT * (page - 1)
    const to = LIMIT * page - 1
    query = query.range(from, to)

    const { data, count, error, status } = await query

    if (error && status === 416) {
      return {
        products: [],
        totalCount: count,
        isOutOfRange: true,
      }
    }

    if (error) throw error

    return {
      products: data,
      totalCount: count,
      isOutOfRange: false,
    }
  },

  getAvailableFilters: async categoryIds => {
    let query = supabase.from('products').select(
      `
      price,
      product_color_variants(
        colors (id, name, hex, base_color_id),
        products_stock (
          sizes (id, name, position)
        )
      )
    `,
    )

    if (categoryIds.length) {
      query = query.in('category_id', categoryIds)
    }

    const { data, error } = await query

    if (error) throw error

    return data
  },

  getColors: async () => {
    const { data, error } = await supabase.from('colors').select('*')

    if (error) throw error

    return data
  },

  getProductVariant: async variantId => {
    const { data, error } = await supabase
      .from('product_color_variants')
      .select(
        `
        id, product_id, image_url, 
        products(
          id, name, price, description, features,
          brands (id, name)
        ), 
        colors (id, name, hex), 
        products_stock (
          stock, 
          sizes (id, name, position)
        )`,
      )
      .eq('id', variantId)
      .order('sizes(position)', {
        referencedTable: 'products_stock',
        ascending: true,
      })
      .single()

    if (error) throw error

    return data
  },

  getProductVariants: async (productId, currentVariantId) => {
    const { data, error } = await supabase
      .from('product_color_variants')
      .select(
        `
        id,
        product_id,
        colors (id, name, hex), 
        products_stock (
          stock, 
          sizes (id, name)
        )
      `,
      )
      .eq('product_id', productId)
      .neq('id', currentVariantId)

    if (error) throw error

    return data
  },
}
