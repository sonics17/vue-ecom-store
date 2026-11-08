export const adaptAvailableFilters = (productsData, allColors) => {
  const prices = productsData.map(product => product.price)
  const minPrice = prices.length ? Math.min(...prices) : 0
  const maxPrice = prices.length ? Math.max(...prices) : 0

  const availableColorsIds = new Set(
    productsData.flatMap(product => {
      return product.product_color_variants.map(variant => variant.colors.id)
    }),
  )

  const getColorIds = baseColorId => {
    return allColors
      .filter(
        color =>
          color.id === baseColorId || color.base_color_id === baseColorId,
      )
      .map(color => color.id)
  }

  const availableBaseColors = allColors
    .filter(color => color.base_color_id === null)
    .map(baseColor => {
      const colorIds = getColorIds(baseColor.id)
      const isAvailable = colorIds.some(id => availableColorsIds.has(id))

      if (!isAvailable) return null

      return {
        ...baseColor,
        colorIds,
      }
    })
    .filter(Boolean)

  const allSizes = productsData
    .flatMap(product => {
      return product.product_color_variants.flatMap(variant =>
        variant.products_stock.map(ps => ps.sizes),
      )
    })
    .filter(Boolean)

  const uniqueSizes = Array.from(
    new Map(allSizes.map(size => [size.id, size])).values(),
  ).sort((a, b) => a.position - b.position)

  return {
    minPrice: Math.floor(minPrice),
    maxPrice: Math.round(maxPrice),
    colors: availableBaseColors,
    sizes: uniqueSizes,
  }
}
