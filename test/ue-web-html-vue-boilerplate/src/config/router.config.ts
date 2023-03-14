import { Router } from '@/router/types';
import { UserLayout, BasicLayout, RouteView, BlankLayout } from '@/layouts';

export const asyncRouterMap: Router[] = [
  {
    path: '/syntax',
    name: 'Syntax',
    component: RouteView,
    redirect: '/syntax/route',
    meta: { title: '写前端步骤', icon: 'icon-code-box-line' },
    children: [
      {
        path: '/syntax/base',
        name: 'SyntaxBase',
        component: () => import('@/views/syntax/base.vue'),
        meta: { title: '创建.vue文件' }
      },
      {
        path: '/syntax/route',
        name: 'SyntaxRoute',
        component: () => import('@/views/syntax/route.vue'),
        meta: { title: '路由定义' }
      }
    ]
  },
  {
    path: '/public',
    name: 'Public',
    component: RouteView,
    redirect: '/public/search',
    meta: { title: '组件', icon: 'icon-code-box-line' },
    children: [
      {
        path: '/public/search',
        name: 'PublicSearch',
        component: () => import('@/views/public/search.vue'),
        meta: { title: '表单查询' }
      },
      {
        path: '/public/upload',
        name: 'PublicUpload',
        component: () => import('@/views/public/upload.vue'),
        meta: { title: '上传文件' }
      },
      {
        path: '/public/mixuse',
        name: 'PublicMixUse',
        component: () => import('@/views/public/mixuse.vue'),
        meta: { title: '混合input' }
      },
      {
        path: '/public/batchExcel',
        name: 'PublicBatchExcel',
        component: () => import('@/views/public/batchExcel.vue'),
        meta: { title: 'EXCEL批量编辑' }
      }
    ]
  },
  {
    path: '/copyTemp',
    name: 'CopyTemp',
    component: RouteView,
    redirect: '/copyTemp/baseList',
    meta: { title: '模板', icon: 'icon-code-box-line' },
    children: [
      {
        path: '/copyTemp/baseList',
        name: 'CopyTempBaseList',
        component: () => import('@/views/copyTemp/baseList/index.vue'),
        meta: { title: '基础列表' }
      },
      {
        path: '/copyTemp/modalList',
        name: 'CopyTempModalList',
        component: () => import('@/views/copyTemp/modalList/index.vue'),
        meta: { title: '基础列表带框' }
      },
      {
        path: '/copyTemp/editTable',
        name: 'CopyTempEditTable',
        component: () => import('@/views/copyTemp/editTable/index.vue'),
        meta: { title: '可编辑列表' }
      },
      {
        path: '/copyTemp/validate',
        name: 'TemplateValidate',
        component: () => import('@/views/template/validate.vue'),
        meta: { title: '逻辑校验提示' }
      }
    ]
    // },
    // {
    //   path: '/redirect',
    //   name: 'Redirect',
    //   component: RouteView,
    //   hidden: true,
    //   children: [
    //   ]
  }
];

/**
 * 基础路由
 * @type { Array<Router> }
 */
export const constantRouterMap: Router[] = [
  {
    path: '/',
    name: 'HomeMain',
    component: BasicLayout,
    flatMenu: true,
    meta: { title: '首页', hideInBreadcrumb: false },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'HomePage',
        hidden: true,
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: 'HomeOutlined' }
      }
    ]
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'UserLogin',
        meta: { title: '登录' },
        component: () => import('@/views/user/Login.vue')
      }
    ]
  },
  // {
  //   path: '/account/settings',
  //   name: 'settings',
  //   meta: { title: '个人中心', icon: 'file-text' },
  //   redirect: '/account/settings/basic',
  // //   hidden: true,
  // //   hideParentMenu: true,
  //   children: [
  //     {
  //       path: '/account/settings/basic',
  //       name: 'BasicSettings',
  //       component: () => import('@/views/account/settings/Basic'),
  //       meta: { title: '基本信息'}
  //     },
  //     {
  //       path: '/account/settings/security',
  //       name: 'SecuritySettings',
  //       component: () => import('@/views/account/settings/Security'),
  //       meta: { title: '修改密码' }
  //     }
  //   ]
  // },
  // {
  //   path: '/sso/login',
  //   hidden: true,
  //   component: () => import('@/views/sso/Login')
  // },
  // {
  //   path: '/sso/logout',
  //   hidden: true,
  //   component: () => import('@/views/sso/Login')
  // },
  {
    path: '/exception',
    name: 'Exception',
    component: BlankLayout,
    hidden: true,
    redirect: '/exception/403',
    meta: { title: '错误页', icon: 'icon-error-warning-line' },
    children: [
      {
        path: '/exception/403',
        name: '403',
        component: () => import('@/views/exception/403.vue'),
        meta: { title: '403', icon: 'SmileOutlined' }
      },
      {
        path: '/exception/404',
        name: '404',
        component: () => import('@/views/exception/404.vue'),
        meta: { title: '404', icon: 'SmileOutlined' }
      },
      {
        path: '/exception/500',
        name: '500',
        component: () => import('@/views/exception/500.vue'),
        meta: { title: '500', icon: 'SmileOutlined' }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    hidden: true,
    component: () => import('@/views/exception/404.vue')
  }
];
