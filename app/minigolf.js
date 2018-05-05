import * as Rendering from './renderer.js';

//// Modules ////
import * as module_wall from './module_wall.js';
import * as module_stickywall from './module_stickywall.js';
/////////////////

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
	
	let modules = {};
	
	// function for registering new functionality
	let registerGameModule = function(moduleSetup) {
		console.log("activating module '" + moduleSetup.moduleName + "'");		  
		// check for dependencies first
		if (!Array.isArray(moduleSetup.dependencies) || !moduleSetup.dependencies.length) {
			/// ...
		}		
		// all types of checks: module already used?	
		modules[moduleSetup.moduleName] = moduleSetup.create(myWorld, engine);	
	}

	let visualSetup = {
		inputCallback: handleUserInput
	};
	
	let renderer = Rendering.CreateRenderer(visualSetup);

	// init matter.js
	let engine = Matter.Engine.create();
	engine.world.gravity.y = 0;
	
	let playerBall = null;
	

	// world defintion with objects, should get its own file
	let myWorld = {
		staticObjects: [],
		balls: [],
		addStaticObject: function(object) {
			this.staticObjects.push(object);	
			Matter.World.add(engine.world, [object.physicObject]);			
		},
		addBorder: function(data) {
			this.staticObjects.push(data);
			// register in physics engine
			var box = Matter.Bodies.rectangle(data.x + data.width * 0.5, data.y + data.height * 0.5, data.width, data.height, {
				isStatic:true,
				friction:0,
				restitution:0
			});
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
			sphere.label = "ball";
			playerBall = data; // hacky for now!
		}
	};
	
	// register all modules	
	registerGameModule(module_wall);
	registerGameModule(module_stickywall);	
	
	// debug: create playfield
	modules["stickywall"].addBorder({x:50,y:50, width: 210, height:10});
	modules["stickywall"].addBorder({x:260,y:30, width: 10, height:150});
	
	modules["wall"].addBorder({x:0,y:0, width: 500, height:10});	
	modules["wall"].addBorder({x:0,y:290, width: 500, height:10});		
	modules["wall"].addBorder({x:0,y:0, width: 10, height:300});
	modules["wall"].addBorder({x:490,y:0, width: 10, height:300});

	myWorld.addPlayerBall({x:50,y:150, radius:10});	
	//	

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