import banner1 from '@/shared/assets/images/banners/banner-1.webp'
import banner2 from '@/shared/assets/images/banners/banner-2.webp'

export const slides = [
  {
    id: 1,
    title: 'Comfort First',
    category: 'Casual Wear',
    text: 'soft / relaxed / effortless',
    image: banner1,
    link: {
      name: 'catalog',
      params: { rootCategory: 'women', subCategory: 't-shirts' },
    },
    contentPosition: 'left',
  },
  {
    id: 2,
    title: 'Everyday Style',
    category: 'New Collection',
    text: 'simple / modern / essential',
    image: banner2,
    link: {
      name: 'catalog',
      params: { rootCategory: 'women', subCategory: 'dresses' },
    },
    contentPosition: 'right',
  },
]
