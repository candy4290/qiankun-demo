<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="jump">跳转</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  mounted() {
    console.error('mini', window._x);
    localStorage.setItem('y', 123);
    // this.jump();
  },
  methods: {
    jump() {
      this.$router.push('/about')
    }
  }
}
</script>
