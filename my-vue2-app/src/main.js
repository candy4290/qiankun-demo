import './pulbic-path';
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './router'
import VueRouter from 'vue-router'

Vue.use(ElementUI)
Vue.config.productionTip = false

let instance = null
let router = null

function render(props = {}) {
  const { container } = props
  router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/micro-vue2/' : '/',
    routes
  })
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 作为微应用暴露生命周期
export async function bootstrap() {
  console.log('Vue2 app bootstraped')
}

export async function mount(props) {
  console.log('Vue2 app mounted', props)
  render(props)
}

export async function unmount() {
  console.log('Vue2 app unmount')
  if (instance) {
    const noop = () => {};
    instance.$router.push = noop;
    instance.$router.replace = noop;
    instance.$router.go = noop;
    
    instance.$destroy()
    instance.$el.innerHTML = '';
    instance = null
  }
   if (router) {
      router.beforeEach(() => {});
      router.afterEach(() => {});
      router = null;
    }
}