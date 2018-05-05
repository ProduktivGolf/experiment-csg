/* standard wall module */

export let dependencies = [];
export let moduleName = 'wall';

export function create(world, engine) {

	// variables
	
	return {
		addBorder: function(data) {
			// register in physics engine
			var box = Matter.Bodies.rectangle(data.x + data.width * 0.5, data.y + data.height * 0.5, data.width, data.height, {
				isStatic:true, 
				friction:0,
				restitution:0
			});
			box.label = "wall";

			data.physicObject = box;
			world.addStaticObject(data);		
		}
	};
}
