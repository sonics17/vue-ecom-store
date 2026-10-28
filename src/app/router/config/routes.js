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
    path: '/sign-in',
    name: 'signIn',
    component: () => import('@/pages/sign-in'),
    meta: { layout: 'AuthLayout' },
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () => import('@/pages/sign-up'),
    meta: { layout: 'AuthLayout' },
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('@/pages/forgot-password'),
    meta: { layout: 'AuthLayout' },
  },
  {
    path: '/update-password',
    name: 'updatePassword',
    component: () => import('@/pages/update-password'),
    meta: { layout: 'AuthLayout' },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/account'),
    meta: { layout: 'MainLayout' },
  },
]
