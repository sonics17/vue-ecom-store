export const adaptProductDetails = rawVariant => {
  return {
    id: rawVariant.id,
    name: rawVariant.products.name,
    description: rawVariant.products.description,
    features: rawVariant.products.features,
    brand: {
      id: rawVariant.products.brands.id,
      name: rawVariant.products.brands.name,
    },
    price: rawVariant.products.price,
    images: rawVariant.image_url,
    color: {
      id: rawVariant.colors.id,
      name: rawVariant.colors.name,
      hex: rawVariant.colors.hex,
    },
    sizes: rawVariant.products_stock.map(size => ({
      id: size.sizes.id,
      name: size.sizes.name,
      stock: size.sizes.stock,
      position: size.sizes.position,
      isSizeAvailable: size.stock > 0,
    })),
    isAvailable: rawVariant.products_stock.some(stock => stock.stock > 0),
  }
}
