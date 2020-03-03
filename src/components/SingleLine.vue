<template>
  <div class="singleLine__container" 
      ref="singleContainer"
      v-bind:class="{ 'singleLine__container--active': context.show }" >

    <div class="sidebar">
      <div class="sidebar__box"></div>
      <Lines @click.native="showContext(id)" />
    </div>

    <div class="content__container"
        @mouseover="view.showScreen = true"
        @mouseleave="view.showScreen = false; mouseLeaver()">

      <span class="content__author" 
        ref="containerAuthor"
        v-bind:class="{ 'content__author--active': network.active }" 
        @click="showNetwork(author)">
          {{ author }} / 3 sep 2018
      </span>
      
      <p ref="singleLine">{{ line }}</p>
        <div class="singleLine_bg">
      </div>

    <div class="singleLine__thumbnail" 
      v-bind:class="{ 'singeLine__thumbnail--inactive': !view.showScreen }" 
      v-if="view.showScreen" 
      v-bind:style="{ marginLeft: this.posX + 'px' }">
    </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Lines from './SingleLine/Lines.vue';
import anime from 'animejs';
import { uuid } from 'vue-uuid';

import { mapState } from 'vuex'

export default {
  name: 'SingleLine',
  data: function() {
    return {
      view: {
        showScreen: false
      },
      network: { // network en context mergen
        active: false 
      }, 
      context: { 
        show: false 
      }, 
      elemUuid: uuid.v1(),
      id: 43242342, // Uit db trekken
      elWidth: 0,
      posX: 0,
      firstPercentage: 0, // lokaal blijven
      secondPercentage: 0,
      hoverAnimation: {
        width: 0,
        marginLeft: 0
      }
    }
  },
  props: [
    'author', 'line'
  ],
  components: {
    Lines
  },
  computed: {
    networkVisible() {
      return this.$store.state.router.results.showNetwork
    },
    ...mapState(['layoutPositions.oneThird'])
  },
  created() { //https://dev.to/viniciuskneves/watch-for-vuex-state-changes-2mgj
    this.$store.watch(
      (state, getters) => getters.contextElem,
      (newUuid, oldUuid) => {
        if (newUuid === this.elemUuid) {
          this.context.show = true;
          this.contextAnim();
        } else if (oldUuid === this.elemUuid) {
          this.context.show = false;
        }
      },
    );

    this.$store.watch(
      (state, getters) => getters.resultsElem,
      (newUuid, oldUuid) => {
        if (newUuid === this.elemUuid) {
          this.network.active = true;
        } else if (oldUuid === this.elemUuid) {
          this.network.active = false;
        }
      },
    );
  },
  mounted() {
    this.elWidth = this.$refs.singleLine.offsetWidth;
    this.$refs.singleLine.addEventListener("mousemove", this.mousePosition);

    this.hoverAnimation.width = this.$refs.containerAuthor.clientWidth;
    this.hoverAnimation.marginLeft = this.$refs.containerAuthor.clientWidth;
    // this.hoverAnimation.marginLeft = this.$refs.containerAuthor.getBoundingClientRect().width (4*16) + 8;
  },
  methods: {
    updateWidth(el) {
      this.hoverAnimation.width = el.toElement.offsetWidth;
    },
    mouseLeaver() {
      this.$refs.singleLine.style.webkitTextFillColor = 'white';
    },
    mousePosition(e) {
      e = e || window.event;

      var xOffset = this.$refs.singleContainer.getBoundingClientRect().x;

      if (this.view.showScreen) {
        this.posX = (e.pageX - xOffset) - (61.5384615);
        var secondPosX = (e.pageX - xOffset) + (61.5384615);

        this.$refs.singleLine.style.background = 'linear-gradient(90deg, rgba(255,255,255,1) ' + this.firstPercentage + '%,  rgba(0,0,0,1) ' + this.firstPercentage + '%, rgba(0,0,0,1) ' + this.secondPercentage + '%, rgba(255,255,255,1) ' + this.secondPercentage + '%, rgba(255,255,255,1) 100%)';
        this.$refs.singleLine.style.webkitBackgroundClip = 'text';
        this.$refs.singleLine.style.webkitTextFillColor = 'transparent';

        this.firstPercentage = this.posX/this.elWidth*100;
        this.secondPercentage = secondPosX/this.elWidth*100;
      }
    },
    showNetwork(author) {

      var payload = {
        elemUuid: this.elemUuid,
        elem: this.$refs.containerAuthor
      }

      console.log('_____payload');
      console.log(payload.elem);
      this.network.active = true; // ONDERZOEKEN OF DIT WEG KAN

      this.$store.dispatch('openNetwork', payload);
      this.$emit('authorClicked', payload.elem); 
    },

    showContext(id) {
      var elemPositions = this.$refs.singleLine.getBoundingClientRect();

      var payload = {
        unfold: true,
        elemUuid: this.elemUuid,
        elemPositions: elemPositions,
        id: id,
        elem: this.$refs.singleContainer
      }

      this.$store.dispatch('openContext', payload);
    },
    contextAnim() {
      anime({
        targets: this.$refs.singleContainer,
        translateX: 0,
        duration: 2000,
        ease: 'easeInQuad'
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar__box {
  height: 7rem;
  width: 1rem;
  background: rgba(199, 199, 199, 0.25);
  position: absolute;
  border-right: 1px solid #373737;
}

.singleLine__container {
  position: relative;
  border-bottom: 1px solid #B8B8B8;
  background: $background_color;
}

.singleLine__container--active {
  /* margin-left: -2rem; */
}

.singleLine--active {
  margin-left: 2rem;
}

.content__author {
  margin-top: 1rem;
  position: absolute;
  color: #D8D8D8;
  font-family: 'Flaco-mono';
  font-size: .8rem;
  cursor: pointer;
  padding-right: .5rem;
}

.content__author--active {
  color: $background_color;
  background: #f6fd7d;
  height: 15px;
  margin-left: -4rem;
  padding-left: 4rem;
  padding-top: 3px;
  padding-bottom: 5px;
}

div p {
  font-family: 'DIN-regular';
  font-size: 2.25rem;
  white-space: nowrap;
  color: white;
  line-height: 7rem;
  z-index: 10;
  cursor: pointer;
  margin: 0;
}

.content__container {
  margin-left: 4rem;
}

.singleLine_bg {
  position: absolute;
  z-index: -2;
  background: $background-text;
  width: 100vw;
  height: 1.5rem;
  top: 2.5rem;
  margin-left: -4rem;
  border-top: 1px solid $highlight_background_text;
  border-bottom: 1px solid $highlight_background_text;
}

.singleLine__thumbnail {
  width: 123.076923px;
  height: 69.2307692px;
  background: white;
  background-image: url('../assets/dummy/footage2.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  margin-top: 20px;
  z-index: -1;
	-webkit-animation: slide-top 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	        animation: slide-top 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(10px);
            transform: translateY(10px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
            opacity: 1;
  }
}

.singleLine__thumbnail--inactive {
  width: 160px;
  height: 90px;
  background: white;
  background-image: url('../assets/dummy/footage.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  z-index: -1;
	-webkit-animation: slide-down 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	        animation: slide-down 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

@keyframes slide-down {
  0% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
            opacity: 1;
  }
  100% {
    -webkit-transform: translateY(10px);
            transform: translateY(10px);
            opacity: 0;
  }
}

</style>