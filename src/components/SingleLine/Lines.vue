<template>
  <div 
    class="sidebar__context" 
    @mouseenter="contextHover()"
    @mouseleave="contextLeave()" >
      <svg  class="sidebar__icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            x="0px" y="0px"
            viewBox="0 0 48 48" 
            style="enable-background:new 0 0 48 48;" 
            xml:space="preserve">

      <g class="context" ref="firstSvg">
        <path class="line" d="M16,0H0v1.1h16V0z" />
        <path class="line" d="M11.8,4.9H0v1.1h11.8V4.9z" />
        <path class="line" d="M16,9.9H0V11h16V9.9z" />
      </g>

      <g class="lines">
        <path class="left st0" ref="secondSvg" style="transform: translateY(-48px);" d="M1.1,48V0H0v48H1.1z"/>
        <path class="bottom st0" ref="thirdSvg" style="transform: translateX(-48px);" d="M48,46.9H0V48h48V46.9z"/>
      </g>

      </svg>
      <div class="sidebar__contextText" ref="text" v-show="showText">See complete transcript</div>
  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs';

export default {
  name: 'SvgLine',
  data: function() {
    return {
      showText: false
    }
  },
  methods: {
    contextHover() {
      console.log(this.$refs);

      this.showText = true;
      anime({
        targets: this.$refs.firstSvg.childNodes,
        translateX: -16,
        duration: 500,
        delay: anime.stagger(100)
      });

      anime({
        targets: this.$refs.secondSvg,
        translateY: '0px',
        duration: 1000,
        delay: 300,
        ease: 'easeInQuad'
      });

      anime({
        targets: this.$refs.thirdSvg,
        translateX: -10,
        duration: 1000,
        delay: 500,
        ease: 'easeInQuad'

      });

      anime({
        targets: this.$refs.text,
        opacity: 1,
        duration: 1000,
        delay: 600

      });
    },
    contextLeave() {
      anime({
        targets: this.$refs.text,
        opacity: 0,
        duration: 500
      });

      anime({
        targets: this.$refs.thirdSvg,
        translateX: '-48px',
        duration: 1000
      });

      anime({
        targets: this.$refs.secondSvg,
        translateY: '-48px',
        duration: 1000,
        delay: 300
      });

      anime({
        targets: this.$refs.firstSvg.childNodes,
        translateX: 0,
        duration: 500,
        delay: anime.stagger(100)
      });

      this.showText = false;
      


    }
  }
}
</script>

<style scoped>
.sidebar__context {
  position: absolute;
  margin-left: 1rem;
  width: 1rem;
  height: 7rem;
  border-right: 1px solid #373737;
  cursor: pointer;
}

.sidebar__context:hover {
  cursor: pointer;
  background: #333;
}

.sidebar__contextText {
  top: 5rem;
  font-family: 'Flaco-mono';
  color: white;
  font-size: .75rem;
  width: 200px;
  position: absolute;
  margin-left: 3rem;
  opacity: 0;
}

.sidebar__context svg {
  margin-top: 2.5rem;
  position: absolute;
}

.sidebar__icon {
  width: 3rem;
  height: 3rem;
  position: absolute;
}

.line, .st0 {
  fill:#FFFFFF;
}
</style>