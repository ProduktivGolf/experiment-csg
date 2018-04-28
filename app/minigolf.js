import * as Rendering from './renderer.js';

export var Minigolf = (function(){
	// vars
	let renderer = Rendering.CreateRenderer();	
	return {
		update: function(delta) {

		},
		render: function() {
			renderer.drawAll();
		}
	}
})();