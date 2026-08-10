export const formatPrice = value => {
  const price = Number(value)
  if (isNaN(price)) return '$0.00'
  return `$${price.toFixed(2)}`
}
