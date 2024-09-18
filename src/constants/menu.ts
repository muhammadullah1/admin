import type { MenuList } from '@/interface/layout/menu.interface';

export const mockMenuList: MenuList = [
  {
    code: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'product',
    label: 'Product',
    icon: 'product',
    path: '/products',
  },
  {
    code: 'guide',
    label: 'Guide',
    icon: 'guide',
    path: '/guide',
  },
  {
    code: 'permission',
    label: 'Permission',
    icon: 'permission',
    path: '/permission',
    children: [
      {
        code: 'routePermission',
        label: 'Route Permission',
        path: '/permission/route',
      },
      {
        code: 'notFound',
        label: '404',
        path: '/permission/404',
      },
    ],
  },
  {
    code: 'component',
    label: 'Component',
    icon: 'permission',
    path: '/component',
    children: [
      {
        code: 'componentForm',
        label: 'Form',
        path: '/component/form',
      },
      {
        code: 'componentTable',
        label: 'Table',
        path: '/component/table',
      },
      {
        code: 'componentSearch',
        label: 'Search',
        path: '/component/search',
      },
      {
        code: 'componentAside',
        label: 'Aside',
        path: '/component/aside',
      },
      {
        code: 'componentTabs',
        label: 'Tabs',
        path: '/component/tabs',
      },
      {
        code: 'componentRadioCards',
        label: 'Radio Cards',
        path: '/component/radio-cards',
      },
    ],
  },
  {
    code: 'business',
    label: 'Business',
    icon: 'permission',
    path: '/business',
    children: [
      {
        code: 'basic',
        label: 'Basic',
        path: '/business/basic',
      },
      {
        code: 'withSearch',
        label: 'WithSearch',
        path: '/business/with-search',
      },
      {
        code: 'withAside',
        label: 'WithAside',
        path: '/business/with-aside',
      },
      {
        code: 'withRadioCard',
        label: 'With Nav Tabs',
        path: '/business/with-radio-cards',
      },
      {
        code: 'withTabs',
        label: 'With Tabs',
        path: '/business/with-tabs',
      },
    ],
  },
];