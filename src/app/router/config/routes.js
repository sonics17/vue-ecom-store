export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home'),
    meta: { layout: 'MainLayout' },
  },
  {
    path: '/catalog/:rootCategory?/:subCategory?',
    name: 'catalog',
    component: () => import('@/pages/catalog'),
    meta: { layout: 'MainLayout' },
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/pages/product-details'),
    meta: { layout: 'MainLayout' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth-login'),
    meta: { layout: 'AuthLayout' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/auth-register'),
    meta: { layout: 'AuthLayout' },
  },
]
