<template>
  <div id="app">
    <MainVue/>
  </div>
</template>

<script>
import MainVue from './components/MainVue.vue'
export default {
  name: 'App',
  components: {
    MainVue
  }
}
</script>

<style>
button {
  cursor: pointer;
}
</style>
