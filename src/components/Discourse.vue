<template>
  <div class="discourse">
    <div class="sidebar">
    </div>

    <div class="discourse__container">
      <div class="discourse__period" ref="container">
        <h2 ref="date">17.01.19</h2>
        <canvas id="firstPeriod" ref="firstPeriod"></canvas>
      </div>
      <div class="discourse__period"></div>
      <div class="discourse__period"></div>
      <div class="discourse__period"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import anime from 'animejs';

export default {
  name: "discourse",
  mounted() {
    this.animateDate();

    Matter.use(
      'matter-attractors' // PLUGIN_NAME
    );

    var Example = Example || {};

    // module aliases
    var Engine = Matter.Engine,
        Events = Matter.Events,
        Runner = Matter.Runner,
        Render = Matter.Render,
        World = Matter.World,
        Body = Matter.Body,
        Mouse = Matter.Mouse,
        Common = Matter.Common,
        Bodies = Matter.Bodies;

      // create engine
      var engine = Engine.create();

      // create renderer
      var render = Render.create({
        canvas: this.$refs.firstPeriod,
        engine: engine,
        options: {
          width: this.$refs.container.offsetWidth,
          height: this.$refs.container.offsetHeight - (4 * 16),
          wireframes: false
        }
      });

      // create runner
      var runner = Runner.create();
      
      Runner.run(runner, engine);
      Render.run(render);

      var world = engine.world;
      world.gravity.scale = 0;

      // create a body with an attractor
      var attractiveBody = Bodies.circle(
        render.options.width / 2,
        render.options.height / 2,
        50, 
        {
        render: {
          fillStyle: 'none'
        },
        isStatic: true,

        // example of an attractor function that 
        // returns a force vector that applies to bodyB
        plugin: {
          attractors: [
            function(bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              };
            }
          ]
        }
      });

      World.add(world, attractiveBody);

      // #fcde9c,#faa476,#f0746e,#e34f6f,#dc3977,#b9257a,#7c1d6f

      for (var i = 0; i < 20; i += 1) {
        var body = Bodies.polygon(
          Common.random(0, render.options.width), 
          Common.random(0, render.options.height),
          Common.random(1, 2),
          Common.random() > 0.9 ? Common.random(15, 10) : Common.random(5, 10),
          { 
            id: "_" + Math.random().toString(36).substr(2, 9),
            render: {
              fillStyle: '#fcde9c'
            }
          }
          );

        World.add(world, body);
      }

      for (var i = 0; i < 20; i += 1) {
        var body = Bodies.polygon(
          Common.random(0, render.options.width), 
          Common.random(0, render.options.height),
          Common.random(1, 2),
          Common.random() > 0.9 ? Common.random(15, 10) : Common.random(5, 10),
          { 
            id: "_" + Math.random().toString(36).substr(2, 9),
            render: {
              fillStyle: '#faa476'
            }
          }
          );

        World.add(world, body);
      }


      for (var i = 0; i < 20; i += 1) {
      var body = Bodies.polygon(
        Common.random(0, render.options.width), 
        Common.random(0, render.options.height),
        Common.random(1, 2),
        Common.random() > 0.9 ? Common.random(15, 10) : Common.random(5, 10),
        { 
          id: "_" + Math.random().toString(36).substr(2, 9),
          render: {
            fillStyle: '#7c1d6f'
          }
        }
        );

      World.add(world, body);
    }
    
    var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
      element: this.$refs.firstPeriod,
      constraint: {
      render: {
        visible: false
      },
      stiffness:0.8
      }
    });
    Matter.World.add(world, mouseConstraint);

    // add mouse control
    // var mouse = Mouse.create(render.canvas);


    // Events.on(engine, 'afterUpdate', function() {
        // if (!mouse.position.x) {
          // return;
        // }

  // console.log((attractiveBody.position.x));
  //       Body.translate(attractiveBody, {
  //           x: (mouse.position.x - attractiveBody.position.x) * 0.25,
  //           y: (mouse.position.y - attractiveBody.position.y) * 0.25
  //       });
    // });

      return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
          Matter.Render.stop(render);
          Matter.Runner.stop(runner);
        }
      };

  },
  methods: {
    animateDate() {
      anime({
        targets: this.$refs.date,
        opacity: 1,
        duration: 1000,
        delay: 500,
        easing: 'easeInQuad'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.discourse {
  width: 100vw;
  height: 100vh;
  background:rgba(199, 199, 199, 0.25);
  margin-top: 4rem;
}

.sidebar {
  height: 100vh;
  width: 1rem;
  background: rgba(199, 199, 199, 0.25);
  position: absolute;
  border-right: 1px solid #373737;
}

.discourse__container {
  width: calc(100vw - 3rem);
  margin-left: 1rem;
  height: 100vh;
  display: flex;
  // background: orange;
}

.discourse__period {
  width: 25%;
  height: 100vh;
  border-right: 1px solid blue;
}

h2 {
  position: relative;
  color: white;
  font-family: 'DIN-regular';
  top: 48%;
  left: 50%;
  opacity: 0;;
  transform: translate(-50%, -48%);
  width: 200px;
  text-align: center;
  pointer-events: none;
}
</style>