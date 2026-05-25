export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home'),
    meta: { layout: 'MainLayout' },
  },
  {
    path: '/catalog/:rootCategory?/:subCategory?/:subSubCategory?',
    name: 'catalog',
    component: () => import('@/pages/catalog'),
    meta: {layout: 'MainLayout'},
  },
];
