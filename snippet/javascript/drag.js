// from OPERA browser

(function(global) {
	'use strict';

	var img = document.querySelector('img');

	img.draggable = false;

	var drag;
	img.addEventListener('mousedown', function(e) {
		if (e.button !== 0) return;
		drag = {
			screenX: e.screenX,
			screenY: e.screenY,
			scrollX: window.scrollX,
			scrollY: window.scrollY
		};
	});
	img.addEventListener('mouseup', function(e) {
		drag = undefined;
		img.style.cursor = '';
	});
	img.addEventListener('mousemove', function(e) {
		if (!drag) return;
		img.style.cursor = 'move';
		window.scrollTo(
			drag.scrollX + drag.screenX - e.screenX,
			drag.scrollY + drag.screenY - e.screenY
		);
	});
})(this);
