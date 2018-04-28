/* renderer.js exports a simple Factory function for our rendering engine */

export function CreateRenderer(setup) {

	// init visuals
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");	
	let mousePos = null;
	canvas.width = 500;					
	canvas.height = 300;				
	document.body.appendChild(canvas);	 
	let playerBall = null;
	
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}	
	window.addEventListener('mousemove', function(evt) {	
		mousePos = null;
	}, true);		
	canvas.addEventListener('mousemove', function(evt) {	
		mousePos = getMousePos(canvas, evt);
	}, false);	

	
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
			/// draw shooting line
			if (mousePos && playerBall) {
				ctx.beginPath();
				ctx.moveTo(playerBall.x, playerBall.y);
				ctx.lineTo(mousePos.x, mousePos.y);
				ctx.stroke();
			}
		},
		drawBalls:function(objects) {
			playerBall = objects[0];
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