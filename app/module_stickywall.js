/* standard wall module */

export let dependencies = ['wall'];
export let moduleName = 'stickywall';

export function create(world, engine) {

	let applyEffect = function(body) {
		let norm = Matter.Vector.normalise(body.velocity);
		Matter.Body.setVelocity(body, {
		  x: norm.x * 20 ,
		  y: norm.y * 20
		});		
	}

	Matter.Events.on(engine, 'collisionStart', function(event) {			
		var i, pair, length = event.pairs.length;			
		for (i = 0; i < length; i++) {
			pair = event.pairs[i];
			if ((pair.bodyA.label === 'ball' || pair.bodyB.label === 'ball') &&
				(pair.bodyA.label === 'stickywall' || pair.bodyB.label === 'stickywall') ) {
				//alert("STICKS WALL COLLISION");
				pair.bodyA.label === 'ball' ? applyEffect(pair.bodyA) : applyEffect(pair.bodyB);
			}
		}										
	});	
	
	return {
		// functions
		addBorder: function(data) {
			// register in physics engine
			var box = Matter.Bodies.rectangle(data.x + data.width * 0.5, data.y + data.height * 0.5, data.width, data.height, {
				isStatic:true, 
				friction:1,
				restitution:1
			});
			box.label = "stickywall";

			data.physicObject = box;
			world.addStaticObject(data);		
		}
	};
}
