import { supabase } from "../supabase";

export const productsApi = {
  async getProducts(filters) {
    let query = supabase
    .from('products')
    .select(`
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
    `);
    
    if (filters.categoryId && filters.categoryId.length > 0) {
      query = query.in('category_id', filters.categoryId)
    }

    if (filters.priceFrom) {
      query = query.gte('price', filters.priceFrom)
    }

    if (filters.priceTo) {
      query = query.lte('price', filters.priceTo)
    }

    if (filters.colors && filters.colors.length > 0) {
      query = query.in('product_color_variants.colors.id', filters.colors)
    }

    if (filters.sizes && filters.sizes.length > 0) {
      query = query.in('product_color_variants.products_stock.sizes.id', filters.sizes)
    }

    query = query.gt('product_color_variants.products_stock.stock', 0)

    const {data, error, status} = await query;
    
    if (error) throw error

    return data;
  },

  async getFilersByCategory(categoryId) {
    const {data, error} = await supabase
    .from('products')
    .select(`
      price,
      product_color_variants(
        colors (id, name, hex, base_color_id),
        products_stock (
          sizes (id, name)
        )
      )
    `)
    .in('category_id', categoryId)

    if (error) throw error

    return data
  },

  async getColors() {
    const {data, error} = await supabase
    .from('colors')
    .select('*')

    if (error) throw error

    return data
  }

}