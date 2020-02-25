<template>
  <div class="searchbar__close" @click="closeWindow()">
    <div class="searchbar__topfirstbox searchbar__box"></div>
    <div class="searchbar__bottomsecondbox searchbar__box"></div>

    <div class="searchbar__bottomfirstbox searchbar__box"></div>
    <div class="searchbar__topsecondbox searchbar__box"></div>
    <div class="searchbar__bottomfourthbox searchbar__box"></div>

    <div class="searchbar__topthirdbox searchbar__box"></div>
    <div class="searchbar__topfifthbox searchbar__box"></div>
    <div class="searchbar__topfourthbox searchbar__box"></div>
    <div class="searchbar__bottomfifthbox searchbar__box"></div>
  </div>
  
</template>

<script>
/* eslint-disable */

import anime from 'animejs';

export default {
  name: 'close',
  props: {
    delay: Number,
  },
  mounted() {
    var _this = this;

    anime({
      targets: '.searchbar__box',
      duration: 750,
      delay: function(el, i) { return (i * 50) + _this.delay; },
      opacity: 1,
      easing: 'easeInOutQuart'
    });
  },
  methods: {
    closeWindow() {
      this.$emit('closeWindow')
    }
  }
}
</script>

<style lang="scss" scoped>

.searchbar__close {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 2.75rem;
  right: 4rem;
  cursor: pointer;
}

.searchbar__box {
  width: .5rem;
  height: .5rem;
  background: white;
  position: absolute;
  opacity: 0;
}

.searchbar__topsecondbox {
  margin-left: .5rem;
  margin-top: .5rem;
}

.searchbar__topthirdbox {
  margin-left: 1rem;
  margin-top: 1rem;
}

.searchbar__topfourthbox {
  margin-left: 1.5rem;
  margin-top: .5rem;
}

.searchbar__topfifthbox {
  margin-left: 2rem;
  margin-top: 0rem;
}

.searchbar__bottomfirstbox {
  margin-left: 0rem;
  margin-top: 2rem;
}

.searchbar__bottomsecondbox {
  margin-left: .5rem;
  margin-top: 1.5rem;
}

.searchbar__bottomfourthbox {
  margin-left: 1.5rem;
  margin-top: 1.5rem;
}

.searchbar__bottomfifthbox {
  margin-left: 2rem;
  margin-top: 2rem;
}
</style>