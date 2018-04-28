import * as Rendering from './renderer.js';

export var Minigolf = (function(){

	let renderer = Rendering.CreateRenderer();	
	
	// world defintion with objects
	let myWorld = {
		staticObjects: [],
		addBorder: function(data) {
			this.staticObjects.push(data);
		}
	};
	// public functions and variables
	return {
		world:myWorld,
		update: function(delta) {
			// update game with constant delta ...
		},
		render: function() {		
			renderer.drawAll(this.world.staticObjects);	
		}
	}
})();