<template>
  <div id="app">
    <Searchbar ref="searchbar" />
    <Context 
      v-if="contextVisible"
    />

    <Timebar />

    <Network 
      v-if="networkStore.showNetwork"
      :mainPosition="networkStore.activeNode" />

    <div class="singlelines">

    <SingleLine 
      author="PragerU"
      @authorClicked="unfoldNetwork"
      publishingData="13/03/2019"
      :line="line.text"
      :ref="'single_' + index"
      v-for="line in results.lines" :key="line.start"
      />

            <!-- v-for="index in 100" :key="index"  -->

    </div>

  </div>
</template>

<script>
/* eslint-disable */

// Just for testing
import randomSentence from 'random-sentence';
const txtgen = require('txtgen');
import lines from './components/dummy/test.json'

import anime from 'animejs';

// COMPONENTS
import SingleLine from './components/SingleLine.vue'
import Network from './components/Network.vue'
import Context from './components/Context.vue'
import Searchbar from './components/Searchbar.vue'
import Timebar from './components/Timebar.vue'


export default {
  name: 'app',
  components: {
    Searchbar, SingleLine, Network, Context, Timebar
  },
  computed: {
    networkStore() { return this.$store.state.router.results },
    contextVisible() { return this.$store.state.router.context.showContext }
  },
  data: function() {
    return {
      results: {
        totalItems: 100,
        lines: lines
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
    console.log(lines);
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
      this.network.mainNode = this.networkStore.activeNode;

      var currentY = window.pageYOffset || document.documentElement.scrollTop,
          lineHeight = document.getElementsByClassName('singleLine__container')[0].offsetHeight,
          startAtItem = Math.floor(currentY/lineHeight);

          console.log(startAtItem)

      this.moveSearchbar();
      this.bounceAnimation(startAtItem);

      if (startAtItem === 0) { // trigger vanaf een
        console.log('vanaf begin')
        // trigger reeks na

      } else {
        this.setWidthOtherElem(startAtItem+20, this.results.totalItems, 0, startAtItem);
      }
    },
    moveSearchbar() {
      var _this = this;
      console.log(_this.$refs.searchbar);

      anime({
        targets: _this.$refs.searchbar.$el,
        translateX: function(i, n) {
          return _this.network.layoutSettings.width - 16 + 'px'
        },
        duration: 1000,
        delay: 0,
        easing: 'easeInOutQuart'
      });
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

<style lang="scss" global>
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
  background: #f3f3f3;
  overflow-x: hidden;
}

.singlelines {
  margin-top: 4rem;
}
</style>
