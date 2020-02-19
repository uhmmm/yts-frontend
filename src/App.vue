<template>
  <div id="app">
    <Network v-if="networkStore.showNetwork"
      :mainPosition="networkStore.activeNode" />

    <SingleLine 
      :author="testSentence(2, 2)"
      @authorClicked="unfoldNetwork"
      publishingData="13/03/2019"
      :line="englishSentence()"
      :ref="'single_' + index"
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
  computed: {
    networkStore() {
      console.log('network store')
      return this.$store.state.router.results
    }
  },
  watch: {
    networkStore: function(val) {
      console.log('NETWORK STORE TRIGGER')
      this.simpleTest(val)
    }
  },
  data: function() {
    return {
      results: {
        totalItems: 100
      },
      network: {
        show: false, // KAN WEG NAAR STORE
        layoutSettings: {
          width: 0,
        },
        mainNode: {}
      }
    }
  },
  mounted() {
    this.setThird();
  },
  methods: {
    testSentence(mi, ma) {
      return randomSentence({min: mi, max: ma});
    },
    englishSentence() {
      return txtgen.sentence();
    },
    setThird() {
      this.network.layoutSettings.width = window.innerWidth / 3;
      this.$store.dispatch('setThird', window.innerWidth / 3);
    },
    unfoldNetwork() {
      // this.network.show = true;
      this.network.mainNode = this.networkStore.activeNode;

      var currentY = window.pageYOffset || document.documentElement.scrollTop,
          lineHeight = document.getElementsByClassName('singleLine__container')[0].offsetHeight,
          startAtItem = Math.floor(currentY/lineHeight);

          console.log(startAtItem)

      this.bounceAnimation(startAtItem);

      if (startAtItem === 0) { // trigger vanaf een
        console.log('vanaf begin')
        // trigger reeks na

      } else {
        this.setWidthOtherElem(startAtItem+20, this.results.totalItems, 0, startAtItem);
      }
    },
    bounceAnimation(startAtItem) {
      var startAtItem = startAtItem,
          totalLength = startAtItem + 20,
          i = 0;


      for (var startAtItem; startAtItem < totalLength; startAtItem++) {
        var _this = this;
        i++
        anime({
          targets: document.getElementsByClassName('singleLine__container')[startAtItem],
          translateX: function(i, n) {
            return _this.network.layoutSettings.width + 'px'
          },
          duration: 2000,
          delay: i * 100,
          ease: 'easeInQuad'
        });
      }
    },
    setWidthOtherElem(nAfter, nLast, nBegin, nBeginEnd) {
      if (nBegin === 0) {
        var i = nBegin;
        for (i; i < nBeginEnd; i++) {
          document.getElementsByClassName('singleLine__container')[i].style = "transform: translateX(" + this.network.layoutSettings.width + "px)"
        }
      } 
      
      if (nAfter) {
        var i = nAfter;
        for (i; i < nLast; i++) {
          document.getElementsByClassName('singleLine__container')[i].style = "transform: translateX(" + this.network.layoutSettings.width + "px)"
        }
      }
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
