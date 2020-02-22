<template>
  <div class="searchbar">
    <div class="searchbar__topbar">
      <div class="searchbar__left">
        <div class="searchbar__topleft"></div>
      </div>
    </div>

    <Close 
      :delay=1500
      v-if="window" />


    <div class="searchbar__content">
      <div class="searchbar__search">
        <input class="searchbar__form topnav" v-model="message" placeholder="Search">
      </div>

      <div class="searchbar__community">
        <span class="topnav" @click="openWindow()">Communities (1)</span>
      </div>

      <div class="searchbar__community">
        <span class="topnav" @click="animatePianoKeys()">Settings</span>
      </div>

    </div>
    
    <div 
      class="window"
      v-if="window">

      <div class="window__content">
        <div class="window__contentSearch window__column">
          <h2 class="window__title">Search</h2>
          <span class="window__search window__column">Pizza</span>
        </div>
        <div class="window__contentCommunities">
          <h2 class="window__title">Communities (1)</h2>
          
          <div class="window__column">
            <ul>
              <li class="bullet">Alt-right</li>
              <li class="bullet--inactive">Anti vaccination</li>
              <li class="bullet--inactive">Flat earthers</li>
            </ul>
          </div>

        </div> 
        <div class="window__contentSettings">
          <h2 class="window__title">Settings</h2>

          <div class="window__column">
            <h3>Sort</h3>
            <ul>
              <li class="bullet">Newest first</li>
              <li class="bullet--inactive">Oldest first</li>
              <li class="bullet--inactive">Most popular first</li>
            </ul>

            <h3>Visualization type</h3>
            <ul>
              <li class="bullet">Search entries</li>
              <li class="bullet--inactive">Search and network</li>
              <li class="bullet--inactive">Community</li>
            </ul>
          </div>
        </div>         

      </div>
      <div
        class="window__bar"
        :ref="'single_' + index"
        v-for="index in 120" 
        :key="index">
        <div v-if="window" class="window__barwhitefill"></div>
      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs';

import Close from './Searchbar/Close.vue';

export default {
  name: 'searchbar',
  data: function() {
    return {
      window: false,
      search: {
        communities: {
          array: ['altright']
        }
      }
    }
  },
  components: {
    Close
  },
  methods: {
    openWindow() {
      this.window = !this.window;

      this.$nextTick(function () {
        var _this = this;

        anime({
          targets: '.topnav',
          translateY: 10,
          duration: 500,
          delay: 200,
          opacity: 0,
          easing: 'easeInQuart'
        });

        anime({
          targets: '.window__bar',
          height: function() { return 400 + anime.random(0, 100); },
          duration: 2000,
          delay: function(el, i) { return i * 7; },
        });

        this.animatePianoKeys(); 
        this.showBoxes(); 
      })   
    },
    showBoxes() {
      anime({
        targets: '.window__title',
        translateY: 10,
        duration: 500,
        delay: 900,
        opacity: 1,
        easing: 'easeOutQuart'
      });

      anime({
        targets: '.window__column',
        opacity: 1,
        easing: 'linear',
        duration: 1000,
        delay: function(el, i) { return (i * 300) + 500; },
      });
    },
    animatePianoKeys() {
      anime({
        targets: '.window__barwhitefill',
        height: function(el, i) { 
          var a = i / 180 * Math.PI;
          var x = Math.cos(a);
          var y = Math.sin(a);
          var d = Math.sqrt((1-x) ** 2 + y**2);

          return d * 20 
        },
        opacity: function(el, i) {
          var n = anime.random(-2, 1);
          if (n < 0) {
            return 0
          } else {
            return 1
          }
        },
        duration: 3000,
        delay: function(el, i) { return i * 7; },
        ease: 'easeInOutQuad'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.searchbar {
  position: fixed;
  height: 4rem;
  background: black;
  width: 100vw;
  z-index: 100;
  top: 0;
  border-bottom: 1px solid white;
}

.searchbar__topbar {
  height: 1rem;
  width: 100%;
  background: rgba(199, 199, 199, 0.25);
  position: absolute;
  border-right: 1px solid #373737;
}

.searchbar__topleft {
  height: 1rem;
  width: 1rem;
  background: #575757;
  border-right: 1px solid #5B5B5B;
}

.searchbar__left {
  height: 4rem;
  width: 1rem;
  background: rgba(199, 199, 199, 0.25);
}

.searchbar__content {
  margin: 1rem 4rem 0 4rem;
  display: flex;
}

.searchbar__form {
  outline: none; 
  -webkit-appearance: none;
  box-shadow: none;
  font-family: 'DIN-Regular';
  background: none;
  color: white;
  font-size: 1rem;
  padding: 0;
  border: 0;
  width: 90%;
  line-height: 3rem;
}

.searchbar__search {
  width: 14rem;
}

.searchbar__community {
  border-left: 1px solid white;
  line-height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 12rem;
}

.searchbar__community span {
  font-family: 'DIN-Regular';
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.window {
  width: 100vw;
  height: 500px;
  padding-left: 1rem;
  display: flex;
}

.window__bar {
  width: 1rem;
  // margin-left: 1rem;
  height: 0%;
  // background: #191919;
  background: black;
  display: flex;
}

.window__barwhitefill {
  background: white;
  width: 100%;
  height: 0;
  align-self: flex-end;
}

.window__content {
  position: fixed;
  width: calc(100% - 4rem);;
  margin: 3rem 4rem 2rem 3rem;
  display: flex;
}

.window__contentSearch {
  width: 14rem;
}

.window__contentCommunities, .window__contentSettings {
  width: 12rem;
  padding-left: 1rem;
}

h2 {
  font-family: 'DIN-Medium';
  font-size: 1rem;
  color: #A9A9A9;
  font-weight: 100;
  margin-bottom: 2rem;
}

h3 {
  font-family: 'DIN-Regular';
  font-size: 1rem;
  color: #A9A9A9;
  margin-bottom: 1rem;
}

ul {
  margin-bottom: 2rem;
}

ul li {
  font-family: 'DIN-Regular';
  color: white;
  font-size: 1rem;
  margin-bottom: .5rem;
}

.bullet::before {
  display: block;
  content: ' ';
  background-image: url('../assets/icons/circle_active.svg');
  background-size: .7rem .7rem;
  background-position: left center;
  background-repeat: no-repeat;
  height: 1rem;
  width: 1rem;
  float: left;
  margin-right: .6rem;
}

.bullet--inactive {
  color: #999999;
}

.bullet--inactive::before {
  display: block;
  content: ' ';
  background-image: url('../assets/icons/circle_inactive.svg');
  background-size: .7rem .7rem;
  background-position: left center;
  background-repeat: no-repeat;
  height: 1rem;
  width: 1rem;
  float: left;
  margin-right: .6rem;
}

.window__search {
  font-family: 'DIN-Regular';
  color: white;
  font-size: 3rem;
}

// Stuff for animation
.window__column {
  opacity: 0;
}

.topnav {
  display: block;
}

.window__title {
  margin-top: -10px;
  opacity: 0;
}


</style>