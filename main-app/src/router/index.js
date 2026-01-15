// src/router/index.js
import Empty from '@/components/Empty.vue';
import { createRouter, createWebHistory } from 'vue-router'

// 主应用自己的页面（可选）
const Home = () => import('@/views/Home.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/micro-vue2',
    name: 'MicroVue2',
    meta: { isMicroApp: true },
    children: [
      {
        path: ':pathMatch(.*)*',
        component: Empty,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 确保 history.state 是一个对象，并包含必要字段
  if (!window.history.state || typeof window.history.state !== 'object') {
    window.history.replaceState(
      { current: to.fullPath, back: from.fullPath },
      '',
      to.fullPath
    );
  } else {
    if (window.history.state.current == null) {
      window.history.state.current = to.fullPath;
    }
    if (window.history.state.back == null) {
      window.history.state.back = from.fullPath;
    }
  }
  next();
});

export default router