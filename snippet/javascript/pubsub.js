(function(win) {
	"use strict";

	var channels = {}; // { ch:[fn,fn,fn], ch:[], ch:[] }

	var pubsub = {
		publish: function(ch, msg) {
			var chan = channels[ch];
			if (chan) {
				var i = chan.length;
				while (i--) {
					chan[i](msg);
				}
			}
		},

		subscribe: function(ch, callback) {
			var chan = channels[ch] || (channels[ch] = []);
			chan.push(callback);
		},

		unsubscribe: function(ch, callback) {
			var chan = channels[ch];
			if (chan) {
				if (callback) {
					var i = chan.length;
					while (i--) {
						if (chan[i] === callback)
							chan.splice(i, 1);
					}
				} else {
					delete channels[ch];
				}
			}
		}
	};

	win.pubsub = pubsub;
})(this);
