<template>
  <el-container style="height: 100vh">
    <!-- 左侧菜单 -->
    <el-aside width="200px" style="background: #f5f7fa">
      <el-menu
        :default-active="$route.path"
        @select="handleMenuSelect"
        mode="vertical"
      >
        <el-menu-item index="/">
          <span>主应用首页</span>
        </el-menu-item>
        <el-menu-item index="/micro-vue2">
          <span>Vue2 微应用</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-main>
      <!-- 主应用自己的页面 -->
      <router-view v-show="!isMicroRoute" />
      <!-- 微应用容器 -->
      <div v-show="isMicroRoute" id="micro-app-container"></div>
    </el-main>
  </el-container>
</template>

<script>
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isMicroRoute = ref(false);

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()
    const router = useRouter()

    // 判断当前路由是否为微应用

    // 菜单点击处理
    const handleMenuSelect = (key) => {
      console.error(key);
      router.push(key)
  //     .catch((error) => {
  //   // 忽略已知的无害错误
  //   if (
  //     error.name === 'NavigationDuplicated' ||
  //     error.message?.includes('not a valid URL') ||
  //     error.message?.includes('undefined')
  //   ) {
  //     console.warn('Ignored harmless router error:', error.message);
  //     return;
  //   }
  //   // 其他错误正常抛出
  //   console.error('Unexpected router error:', error);
  // });
    }

    onMounted(() => {
      localStorage.setItem('x', 123);
      window._x = 123;
      // 注册微应用
      registerMicroApps([
        {
          name: 'micro-vue2',
          entry: '//localhost:8081',
          container: '#micro-app-container',
          activeRule: '/micro-vue2' // 与路由 path 一致
        }
      ])

      start({
        sandbox: { experimentalStyleIsolation: true }
      })

      // 设置默认子应用（可选）
      // setDefaultMountApp('/')
    })

    return {
      isMicroRoute,
      handleMenuSelect
    }
  },

  // 监听路由变化，自动触发微应用加载/卸载
  watch: {
    $route(to) {
      isMicroRoute.value = to.path.startsWith('/micro-vue2');
    }
  }
})
</script>