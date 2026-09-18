export const adaptVariants = rawVariants => {
  return rawVariants.map(variant => ({
    id: variant.id,
    color: {
      id: variant.colors.id,
      hex: variant.colors.hex,
      name: variant.colors.name,
    },
    isAvailable: variant.products_stock.some(stock => stock.stock > 0),
  }))
}
