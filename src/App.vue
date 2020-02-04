<template>
  <div id="app">
    <SingleLine line="The candidates appeared in Liverpool for the hustings and had each 40 seconds to answer a pre-selected question"/>
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
  margin-top: 16rem;
}
</style>
