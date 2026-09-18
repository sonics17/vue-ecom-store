export const adaptProducts = rawProducts => {
  console.log(rawProducts)
  return rawProducts.map(product => {
    return {
      id: product.id,
      name: product.products.name,
      price: product.products.price,
      images: product.image_url,
      brand: {
        id: product.products.brands.id,
        name: product.products.brands.name,
      },
      color: {
        id: product.colors.id,
        hex: product.colors.hex,
        name: product.colors.name,
      },
      sizes: product.products_stock.map(size => {
        return {
          id: size.sizes.id,
          name: size.sizes.name,
          stock: size.stock,
        }
      }),
    }
  })
}
