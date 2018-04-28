import {Minigolf} from './minigolf.js';
"use strict";

/* used intel:
main loop in js: https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
*/

window.onload = function() {
	let lastFrameTime = 0;
	let maxFPS = 60;
	let simulationStep = 1000 / 60; // 16.667ms
	let deltaPool = 0;
	
	// game loop
	(function loop(timeNow) {
	
		if (timeNow < lastFrameTime + (1000 / maxFPS)) {
			window.requestAnimationFrame(loop);			
			return;
		}

		// sammeln der zeit die noch nicht simmuliert wurde
		deltaPool += timeNow - lastFrameTime;		
		lastFrameTime = timeNow;

		// simulation mit immer festen timesteps für diskretes ergebnis
		while(deltaPool >= simulationStep) {
			Minigolf.update(simulationStep);
			deltaPool -= simulationStep;
		}

		Minigolf.render();
		window.requestAnimationFrame(loop);		
	})(0);
}

