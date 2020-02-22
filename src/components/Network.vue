<template>
  <div>
    <div class="svgContainer" ref="svgContainer"></div>

    <div class="networkCanvas"
      ref="networkCanvas">
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs';
import vis from 'vis-network'
import SVG from "rabbit-ear-svg"

export default {
  name: 'Network',
  data: function() {
    return {
      networkVis: {},
      svgSettings: {
        width: 0,
        height: 0
      },
      svgElement: {},
      mainLine: {}
    }
  },
  props: [
    'mainPosition'
  ],
  created() {
    this.$store.watch(
      (state, getters) => getters.activeNodeResults,
      (newLine, oldLine) => {
        this.redrawMainline(newLine, oldLine)
      },
    );
  },
  mounted() {
    console.log(this.mainPosition);
    console.log(document.getElementsByClassName('content__author'));

    // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 'x4121421',  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/35.jpg', size: 48},
        {id: 2,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/2.jpg'},
        {id: 3,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/3.jpg'},
        {id: 4,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/5.jpg'},
        {id: 5,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/7.jpg'},
        {id: 6, borderWidth: 0 },
        {id: 7, borderWidth: 0 },
        {id: 8,  borderWidth: 0 },
        {id: 9,  borderWidth: 0 },
        {id: 10, borderWidth: 0 },
        {id: 11, borderWidth: 0 },
        {id: 12, borderWidth: 0 },
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 'x4121421', to: 3, width: 5},
        {from: 'x4121421', to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 10},
        {from: 4, to: 11},
        {from: 5, to: 4},
        {from: 2, to: 11},
        {from: 11, to: 12},
        {from: 3, to: 2},
        {from: 10, to: 11},
        {from: 8, to: 5},
        {from: 6, to: 8},
        {from: 7, to: 3},
        {from: 9, to: 3}
    ]);

    // create a network
    var container = this.$refs.networkCanvas;

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
      nodes: {
        borderWidth: 2,
        size: 16*2,
      color: {
          border: '#222222',
          background: '#C4C4C4',
          hover: {
            border: '#FF9B9B'
          }
        },
        font:{color:'#eeeeee'}
      },
      interaction: {
        hover: true,
        selectable: false,
        zoomView: false
      },
      edges: {
        color: 'lightgray'
      }
    };

    this.networkVis = new vis.Network(container, data, options);
    setTimeout(() => this.drawSvg(), 250); 
  },
  methods: {
    setupSvg() {
      this.svgSettings.width = this.$refs.networkCanvas.offsetWidth;
      this.svgSettings.height = this.$refs.networkCanvas.offsetHeight;
    },
    drawSvg() {
      this.setupSvg();
      console.log(this.mainPosition.getBoundingClientRect().y);
      console.log(this.networkVis.getPositions('4121421'));

      var positions = this.networkVis.canvasToDOM(this.networkVis.getPositions('x4121421').x4121421);

      var containerWidth = this.svgSettings.width;
      var containerHeight = this.svgSettings.height;
      var labelPos = this.mainPosition.getBoundingClientRect().y + 5;

      this.svgElement = SVG(containerWidth, containerHeight, '.svgContainer');

      console.log(this.svgElement)
      this.mainLine = this.svgElement.bezier(containerWidth, labelPos, containerWidth - 30, labelPos + 30, positions.x + 20, positions.y, positions.x, positions.y)
        .fill("none")
        .stroke("black")
        .strokeWidth(1)
        .strokeDasharray("5 3")

      this.$refs.svgContainer.appendChild(this.svgElement)

      let didScroll = false;
      window.onscroll = () => didScroll = true;

      setInterval(() => {
        if ( didScroll ) {
          didScroll = false;
          labelPos = this.mainPosition.getBoundingClientRect().y + 5;

        // path().moveTo(3,4).curveTo(1,2,3,4,5,6).lineTo(100,200)
        // svg.removeChildren();

          this.mainLine.setBezier(containerWidth, labelPos, containerWidth - 100, labelPos -100, positions.x + 100, positions.y + 100, positions.x, positions.y)
          .opacity(this.opacity(labelPos))
        }
      }, 100); 
    },
    redrawMainline(newElem, oldElem) {
      var positions = this.networkVis.canvasToDOM(this.networkVis.getPositions('x4121421').x4121421);
      var labelPos = newElem.getBoundingClientRect().y + 5;
      var labelPosOld = oldElem.getBoundingClientRect().y + 5;


      var animationPositions = {
        y: labelPosOld
      };

      var _this = this;

      anime({
        targets: animationPositions,
        y: labelPos,
        round: 1,
        duration: 500,
        easing: 'easeInOutExpo',
        update: function() {
          _this.mainLine.setBezier(_this.svgSettings.width, animationPositions.y, _this.svgSettings.width - 100, animationPositions.y -100, positions.x + 100, positions.y + 100, positions.x, positions.y).opacity(1);
        }
      });
    },
    opacity(val) {
      var currentVal = 0;
      // console.log(val);
      if (val < 99) {
        currentVal = '.' + String(val);
        console.log(currentVal)
        if (val < 0) {
        return 0
        }
        return currentVal
      } else {
        return 1
      }
    }
  }
}
</script>

<style scoped>
.networkCanvas {
  margin-left: 0;
  height: 100vh;
  width: 33.33%;
  position: fixed;
}

.svgContainer {
  margin-left: 0;
  height: 100vh;
  width: 33.33%;
  position: fixed;
}

</style>