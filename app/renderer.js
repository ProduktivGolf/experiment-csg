/* renderer.js exports a simple Factory function for our rendering engine */

export function CreateRenderer(setup) {

	// init visuals
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");				
	canvas.width = 500;					
	canvas.height = 300;				
	document.body.appendChild(canvas);	 
	
	// variables
	
	return {
		// functions
		beginFrame:function(objects) {		
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.beginPath();
			ctx.rect(0,0,canvas.width, canvas.height);	
			ctx.stroke(); 						
		},
		endFrame:function() {
			
		},
		drawBalls:function(objects) {
			for (var obj of objects) {
				ctx.beginPath();
				ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.stroke();	
				ctx.closePath();
			}		  
		},			
		drawStatic:function(objects) {		
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.beginPath();
			ctx.strokeStyle = '#000000';			
			ctx.rect(0,0,canvas.width, canvas.height);	
			ctx.stroke(); 	
			for (var obj of objects) {
				ctx.fillRect(obj.x, obj.y, obj.width, obj.height);				  
			}	
			ctx.closePath();
		}	
	};
}