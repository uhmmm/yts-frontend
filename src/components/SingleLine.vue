<template>
  <div class="singleLine__container">

    <p ref="singleLine">The candidates appeared in Liverpool for the hustings and had each 40 seconds to answer a pre-selected question</p>
    <div class="singleLine__thumbnail" v-bind:style="{ marginLeft: this.posX + 'px' }"></div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'SingleLine',
  data: function() {
    return {
      view: {
        showScreen: false
      },
      elWidth: 0,
      posX: 0,
      firstPercentage: 0,
      secondPercentage: 0
    }
  },
  mounted() {
    this.elWidth = this.$refs.singleLine.offsetWidth;

    this.$refs.singleLine.addEventListener("mousemove", this.mousePosition);

  },
  methods: {
    mousePosition(e) {
      e = e || window.event;
      this.posX = e.pageX - 80;

      var secondPosX = e.pageX + 80;

      this.$refs.singleLine.style.background = 'linear-gradient(90deg, rgba(255,255,255,1) ' + this.firstPercentage + '%,  rgba(0,0,0,1) ' + this.firstPercentage + '%, rgba(0,0,0,1) ' + this.secondPercentage + '%, rgba(255,255,255,1) ' + this.secondPercentage + '%, rgba(255,255,255,1) 100%)';
      this.$refs.singleLine.style.webkitBackgroundClip = 'text';


      this.firstPercentage = this.posX/this.elWidth*100;
      this.secondPercentage = secondPosX/this.elWidth*100;

      // console.log(this.posX/this.elWidth*100)



      console.log(this.posX);
    }
  }
}
</script>

<style scoped>
.singleLine__container {
  position: relative;
}

div p {
  font-family: 'Feijoa-Medium';
  font-size: 2.5rem;
  white-space: nowrap;
  color: white;
  line-height: 90px;
  z-index: 10;
  cursor: pointer;
  background: linear-gradient(90deg, rgba(255,255,255,1) 32%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 47%, rgba(255,255,255,1) 47%, rgba(255,255,255,1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.singleLine__thumbnail {
  width: 160px;
  height: 90px;
  background: white;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>