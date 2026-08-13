import { supabase } from '../supabase'

export const productsApi = {
  async getProducts(params) {
    let query = supabase.from('products').select(`
      *,
      product_color_variants!inner (
        id,
        image_url,
        colors!inner (id, name, hex),
        products_stock!inner (
          stock,
          sizes!inner (id, name)
        )
      ),
      brands (id, name)
    `)

    if (params.categoryIds && params.categoryIds.length > 0) {
      query = query.in('category_id', params.categoryIds)
    }

    if (params.minPrice) {
      query = query.gte('price', params.minPrice)
    }

    if (params.maxPrice) {
      const extendedMaxPrice = params.maxPrice + 0.99
      query = query.lte('price', extendedMaxPrice)
    }

    if (params.colors && params.colors.length > 0) {
      query = query.in('product_color_variants.colors.id', params.colors)
    }

    if (params.sizes && params.sizes.length > 0) {
      query = query.in(
        'product_color_variants.products_stock.sizes.id',
        params.sizes,
      )
    }

    query = query.gt('product_color_variants.products_stock.stock', 0)

    const { data, error, status } = await query

    if (error) throw error

    return data
  },

  async getAvailableFilters(categoryIds, search) {
    let query = supabase.from('products').select(
      `
      price,
      product_color_variants(
        colors (id, name, hex, base_color_id),
        products_stock (
          sizes (id, name)
        )
      )
    `,
    )

    if (categoryIds.length) {
      query = query.in('category_id', categoryIds)
    }

    if (search) {
      query = query.like('name', `%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    return data
  },

  async getColors() {
    const { data, error } = await supabase.from('colors').select('*')

    if (error) throw error

    return data
  },
}
