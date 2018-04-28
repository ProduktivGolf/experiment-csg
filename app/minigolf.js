import * as Rendering from './renderer.js';

var velocityScale = 0.00005;

export var Minigolf = (function(){

	// callback function for player input which is given from our visuals
	let handleUserInput = function(evt) {	
			// shooting event
			if (evt.type === 1) {
			Matter.Body.applyForce(playerBall.physicObject,{
				x:playerBall.physicObject.position.x,
				y:playerBall.physicObject.position.y},{
					x:evt.data.x * velocityScale,
					y:evt.data.y * velocityScale
					});
			}
	}

	let visualSetup = {
		inputCallback: handleUserInput
	};
	
	let renderer = Rendering.CreateRenderer(visualSetup);

	// init matter.js
	let engine = Matter.Engine.create();
	engine.world.gravity.y = 0;
	
	let playerBall = null;

	// world defintion with objects
	let myWorld = {
		staticObjects: [],
		balls: [],
		addBorder: function(data) {
			this.staticObjects.push(data);
			// register in physics engine
			var box = Matter.Bodies.rectangle(data.x + data.width * 0.5, data.y + data.height * 0.5, data.width, data.height, {
				isStatic:true,
				friction:0,
				restitution:0
			});
			Matter.World.add(engine.world, [box]);
			data.physicObject = box;
		},
		addPlayerBall: function(data) {
			this.balls.push(data);		
			// register in physics engine
			var sphere = Matter.Bodies.circle(data.x, data.y, data.radius);
			Matter.World.add(engine.world, [sphere]);
			data.physicObject = sphere;	
			sphere.frictionAir = 0.02;
			sphere.friction = 0;
			sphere.restitution = 1;
			playerBall = data; // hacky for now!
		}
	};
	// public functions and variables
	return {
		world:myWorld,
		update: function(delta) {
			Matter.Engine.update(engine, delta);		
			/// update all positions? Does matter has callbacks for this?
			for (var ball of this.world.balls) {
				ball.x = ball.physicObject.position.x;
				ball.y = ball.physicObject.position.y;		
			}
		},
		render: function() {		
			renderer.beginFrame();
			renderer.drawStatic(this.world.staticObjects);	
			renderer.drawBalls(this.world.balls);
			renderer.endFrame();			
		}
	}
})();