import * as Rendering from './renderer.js';

export var Minigolf = (function(){

	let renderer = Rendering.CreateRenderer();	
	
	// world defintion with objects
	let myWorld = {
		staticObjects: [],
		balls: [],
		addBorder: function(data) {
			this.staticObjects.push(data);
		},
		addPlayerBall: function(data) {
			this.balls.push(data);			
		}
	};
	// public functions and variables
	return {
		world:myWorld,
		update: function(delta) {
			// update game with constant delta ...
		},
		render: function() {		
			renderer.beginFrame();
			renderer.drawStatic(this.world.staticObjects);	
			renderer.drawBalls(this.world.balls);
			renderer.endFrame();			
		}
	}
})();