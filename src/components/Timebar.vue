<template>
  <div class="timebar">
    <div class="timebar__estheticsContainer">
      <div class="timebar__highlight"></div>
    </div>

    <div class="timebar__container">
      <div class="timebar__yearcontainer">
        <span class="timebar__year">2020</span>
      </div>
    </div>

  </div>
  
</template>

<script>
/* eslint-disable */

export default {
  name: 'timebar',
  mounted() {
    // console.log('mounteddddd')
  }
}
</script>

<style lang="scss" scoped>
.timebar {
  position: fixed;
  height: 100vh;
  width: 2rem;
  right: 0;
  background: #C4C4C4;
  z-index: 100;
  top: 0;
}

.timebar__estheticsContainer {
  height: 4rem;
  width: 100%;
  border-bottom: 1px solid black;
}

  .timebar__highlight {
    width: 100%;
    height: 1rem;
    background: rgba(100, 100, 100, 0.25);
  }

  .timebar__yearcontainer {
    margin-top: 1rem;
    height: calc(100vh / 10);
    border-bottom: 1px solid black;
  }

.timebar__year {
  font-family: 'DIN-Regular';
  font-size: 1rem;
  transform: rotate(-90deg);
  display: block;
}
</style>