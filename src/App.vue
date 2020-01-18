<template>
  <div id="app">
    <SingleLine msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import SingleLine from './components/SingleLine.vue'

export default {
  name: 'app',
  components: {
    SingleLine
  }
}
</script>

<style>
@font-face {
  font-family: 'Feijoa-Medium';
  src: url('./assets/fonts/fe-temp.woff') format('woff'); /* Pretty Modern Browsers */
}

html {
  font-size: 16px;
  background: black;
}

#app {
  margin-top: 8rem;
}
</style>
