<template>
  <div class="networkCanvas"
    ref="networkCanvas">
  </div>
</template>

<script>
/* eslint-disable */
import vis from 'vis-network'

export default {
  name: 'Network',
  mounted() {
    // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 4121421,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/35.jpg', size: 48},
        {id: 2,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/2.jpg'},
        {id: 3,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/3.jpg'},
        {id: 4,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/5.jpg'},
        {id: 5,  shape: 'circularImage', image: 'https://randomuser.me/api/portraits/men/7.jpg'},
        {id: 6 },
        {id: 7 },
        {id: 8 },
        {id: 9 },
        {id: 10 },
        {id: 11 },
        {id: 12 },
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 4121421, to: 3, width: 5},
        {from: 4121421, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 10},
        {from: 4, to: 11},
        {from: 5, to: 4},
        {from: 2, to: 11},
        {from: 11, to: 12},
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

    // initialize your network!
    var network = new vis.Network(container, data, options);

    console.log(network.getPositions())

    // network.on("zoom",function(){
    //   console.log('zoom');
    //   var pos = [];
    //   pos = network.getViewPosition();

    //   if(network.getScale() <= 1 )
    //   {

    //     network.moveTo({
    //         position: {x:pos.x, y:pos.y},
    //         scale: 1,
    //       });
    //   }
    //   if(network.getScale() >= 1.00 ){

    //         network.moveTo({
    //         position: {x:pos.x, y:pos.y},
    //         scale: 1.00,
    //       });
    //     }
    //   });

  }
}
</script>

<style scoped>
.networkCanvas {
  margin-left: 0;
  height: 100vh;
  width: 33%;
  position: fixed;
}

</style>