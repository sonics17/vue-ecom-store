export const SORT_OPTIONS = [
  { label: 'Recommended', value: 'default' },
  { label: 'Price low to high', value: 'price_asc' },
  { label: 'Price high to low', value: 'price_desc' },
]

export const DEFAULT_SORT_OPTION = 'default'

export const VALID_SORT_VALUES = SORT_OPTIONS.map(option => option.value)
