<template>
  <div 
    class="context"
    ref="thisContext">
    <p>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      a<br/>
      b</p>
  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs';

export default {
  name: 'context',
  mounted() {
    var container = this.$refs.thisContext;

    anime({
      targets: container,
      translateX: 0,
      opacity: 1,
      delay: 1000,
      duration: 1000,
      ease: 'easeInQuad'
    });

    container.scrollTop = 1000;

  }
}
</script>

<style lang="scss" scoped>
.context {
  height: 100vh;
  width: 100vw;
  background: black;
  position: fixed;
  z-index: 100;
  overflow-y: scroll;
  opacity: 0;
}

p { color: white;}

</style>