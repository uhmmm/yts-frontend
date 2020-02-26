<template>
  <div id="app">
    <Searchbar ref="searchbar" />
    <Context v-if="contextVisible" />

    <Timebar />

    <Network 
      v-if="view === 'listnetwork'"
      :mainPosition="networkStore.activeNode" />

    <Discourse
      v-if="view === 'discourse'" />

    <div 
      class="singlelines"
      v-if="view === 'list' || view === 'listnetwork'">

      <SingleLine 
        author="PragerU"
        @authorClicked="unfoldNetwork"
        publishingData="13/02/2020"
        :line="line.text"
        :ref="'single_' + index"
        v-for="line in results.lines" :key="line.start"
        />
    </div>

  </div>
</template>

<script>
/* eslint-disable */

// Just for testing
const txtgen = require('txtgen');
import lines from './components/dummy/test.json'

import anime from 'animejs';

// COMPONENTS
import SingleLine from './components/SingleLine.vue'
import Network from './components/Network.vue'
import Context from './components/Context.vue'
import Searchbar from './components/Searchbar.vue'
import Timebar from './components/Timebar.vue'
import Discourse from './components/Discourse.vue'

export default {
  name: 'app',
  components: {
    Searchbar, SingleLine, Network, Context, Timebar, Discourse
  },
  computed: {
    networkStore() { return this.$store.state.router.results },
    contextVisible() { return this.$store.state.router.context.showContext },
    view () {
      return this.$store.state.router.view
    }
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
  created() {
    this.$store.watch(
      (state, getters) => getters.viewChanged,
      (newView, oldView) => {
        this.changeView(newView, oldView)
      },
    );
  },
  methods: {
    changeView(newView, oldView) {
      console.log(newView + ' ' + oldView)
      this.$nextTick(function () {
        if (this.view === 'list' && oldView === 'listnetwork') {
          this.unfoldNetwork('moveLeft');

          // this.$store.dispatch('openNetwork', {unfold: false});


        } else if (this.view === 'listnetwork') {
          console.log('hit');
          this.$store.dispatch('openNetwork', {unfold: true});
          this.unfoldNetwork('moveRight');
        } else if (this.view === 'discourse') {
          console.log('discourse')
        }
      })

    },
    englishSentence() {
      return txtgen.sentence();
    },
    setThird() {
      this.network.layoutSettings.width = window.innerWidth / 3;
      this.$store.dispatch('setThird', window.innerWidth / 3);
    },
    unfoldNetwork(way) {
      this.network.mainNode = this.networkStore.activeNode;

      var currentY = window.pageYOffset || document.documentElement.scrollTop,
          lineHeight = document.getElementsByClassName('singleLine__container')[0].offsetHeight,
          startAtItem = Math.floor(currentY/lineHeight);

      this.moveSearchbar(way);
      this.bounceAnimation(startAtItem, way);

      if (startAtItem === 0) { // trigger vanaf een
        console.log('vanaf begin')
      } else {
        this.setWidthOtherElem(startAtItem+20, this.results.totalItems, 0, startAtItem);
      }
    },
    moveSearchbar(way) {
      var _this = this,
          direction = 0;
      
      if (way === 'moveRight') {
        direction = this.network.layoutSettings.width;
      } else if (way === 'moveLeft') {
        direction = 16
      }

      anime({
        targets: _this.$refs.searchbar.$el,
        translateX: function(i, n) {
          return direction - 16 + 'px'
        },
        duration: 1000,
        delay: 0,
        easing: 'easeInOutQuart'
      });
    },
    bounceAnimation(startAtItem, way) {
      var startAtItem = startAtItem,
          direction = 0,
          totalLength = startAtItem + 20,
          i = 0;

      if (way === 'moveRight') {
        direction = this.network.layoutSettings.width;
      } else if (way === 'moveLeft') {
        direction = 0
      }

      for (var startAtItem; startAtItem < totalLength; startAtItem++) {
        var _this = this;
        i++;

        anime({
          targets: document.getElementsByClassName('singleLine__container')[startAtItem],
          translateX: function(i, n) {
            return direction + 'px'
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
