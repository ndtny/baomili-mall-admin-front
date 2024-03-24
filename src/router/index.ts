import { createRouter, createWebHistory } from 'vue-router'; // createWebHashHistory, createWebHistory
import type { Router, RouteRecordRaw, RouteComponent } from 'vue-router';

const Layout = ():RouteComponent => import('@/layout/index.vue');

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const constantRoutes:RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const asyncRoutes:RouteRecordRaw[] = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'form' },
    children: [
      {
        path: 'order-list',
        component: () => import('@/views/order/order-list/index.vue'),
        name: 'OrderList',
        meta: { title: '订单列表', icon: 'form', noCache: true }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/product-list',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'form' },
    children: [
      {
        path: 'product-list',
        component: () => import('@/views/product/product-list/index.vue'),
        name: 'ProductList',
        meta: { title: '商品列表', icon: 'form', noCache: true }
      },
      {
        path: 'product-brand',
        component: () => import('@/views/product/product-brand/index.vue'),
        name: 'ProductBrand',
        meta: { title: '商品品牌', icon: 'form', noCache: true }
      },
      {
        path: 'product-attribute',
        component: () => import('@/views/product/product-attribute/index.vue'),
        name: 'ProductAttribute',
        meta: { title: '商品属性', icon: 'form', noCache: true }
      },
      {
        path: 'product-category',
        component: () => import('@/views/product/product-category/index.vue'),
        name: 'ProductCategory',
        meta: { title: '商品分类', icon: 'form', noCache: true }
      },
      {
        path: 'product-stock',
        component: () => import('@/views/product/product-stock/index.vue'),
        name: 'ProductStock',
        meta: { title: '商品库存', icon: 'form', noCache: true }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: '会员管理',
    redirect: '/member/member-list',
    meta: { title: '会员管理', icon: 'form' },
    children: [
      {
        path: '/member-list',
        component: () => import('@/views/member/member-list/index.vue'),
        name: 'MemberList',
        meta: { title: '会员列表', icon: 'form', noCache: true }
      },
      {
        path: '/member-address',
        component: () => import('@/views/member/member-address/index.vue'),
        name: 'MemberAddress',
        meta: { title: '收获地址', icon: 'form', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true }}
];

const createTheRouter = ():Router => createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  // 注意，如果要配置 HTML5 模式，则需要修改nginx配置，参考资料：
  // https://router.vuejs.org/zh/guide/essentials/history-mode.html
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
});

interface RouterPro extends Router {
  matcher: unknown;
}

const router = createTheRouter() as RouterPro;

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createTheRouter() as RouterPro;
  router.matcher = newRouter.matcher; // reset router
}

export default router;
