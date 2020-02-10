<template>
  <div id="app">
    <Network v-if="showNetwork"/>

    <SingleLine 
      :author="testSentence(2, 2)"
      @authorClicked="unfoldNetwork"
      publishingData="13/03/2019"
      :line="englishSentence()"
      ref="single"
      v-for="index in 100" :key="index"
    />
  </div>
</template>

<script>
/* eslint-disable */

import anime from 'animejs';
import randomSentence from 'random-sentence';
const txtgen = require('txtgen');

import SingleLine from './components/SingleLine.vue'
import Network from './components/Network.vue'

export default {
  name: 'app',
  components: {
    SingleLine, Network
  },
  data: function() {
    return {
      showNetwork: false
    }
  },
  mounted() {
    console.log('mounted')

  },
  methods: {
    testSentence(mi, ma) {
      return randomSentence({min: mi, max: ma});
    },
    englishSentence() {
      return txtgen.sentence();
    },
    unfoldNetwork(value) {
      this.showNetwork = true;
      var dw = window.innerWidth,
          currentY = window.pageYOffset || document.documentElement.scrollTop,
          lineHeight = document.getElementsByClassName('singleLine__container')[0].offsetHeight,
          startAtItem = Math.floor(currentY/lineHeight),
          totalLength = startAtItem + 20;

      console.log(currentY);
      console.log(currentY/lineHeight);
      console.log(Math.floor(currentY/lineHeight));

      var i = 0;

      for (var startAtItem; startAtItem < totalLength; startAtItem++) {
        console.log(startAtItem);
        i++
        anime({
          targets: document.getElementsByClassName('singleLine__container')[startAtItem],
          translateX: function(i, n) {
            return dw/3 + 'px'
          },
          duration: 2000,
          delay: i * 100,
          ease: 'easeInQuad'
        });
      }

        // anime({
        //   targets: '.singleLine__container',
        //   translateX: function(i, n) {
        //     return dw/3 + 'px'
        //   },
        //   duration: 2000,
        //   delay: anime.stagger(100),
        //   ease: 'easeInQuad'
        // });
    }
  }
}
</script>

<style lang="scss">
@import 'styles/global';
@import 'styles/reset';

* {
  box-sizing: border-box;
}

@font-face {
  font-family: 'Feijoa-Medium';
  src: url('./assets/fonts/fe-temp.woff') format('woff'); /* Pretty Modern Browsers */
}

@font-face {
  font-family: 'Flaco-Mono';
  src: url('./assets/fonts/fl-mono.woff') format('woff'); /* Pretty Modern Browsers */
}

@font-face {
  font-family: 'DIN-Regular';
  src: url('./assets/fonts/DINNextLTPro-Regular.woff') format('woff'); /* Pretty Modern Browsers */
}

@font-face {
  font-family: 'DIN-Medium';
  src: url('./assets/fonts/DINNextLTPro-Medium.woff') format('woff'); /* Pretty Modern Browsers */
}

html {
  font-size: $base_size;
  background: white;
  overflow-x: hidden;
}

#app {
}
</style>
