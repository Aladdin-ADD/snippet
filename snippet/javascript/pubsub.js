(function(win) {
	"use strict";

	var channels = {};
	// { ch: [{cid: x, callback: fn}] }

	var cid = 0;

	var pubsub = {
		publish: function(ch, msg) {
			var chan = channels[ch];
			if (chan) {
				for (var i = chan.length - 1; i >= 0; --i) {
					chan[i].callback(msg);
				}
			}
		},

		subscribe: function(ch, callback) {
			var chan = channels[ch] || (channels[ch] = []);
			chan.push({
				cid: ++cid,
				callback: callback
			});
			return cid + " " + ch;
		},

		unsubscribe: function(token) {
			var index = token.indexOf(" ");
			var id = token.substring(0, index);
			var ch = token.substring(index + 1);
			var chan = channels[ch];
			if (chan) {
				for (var i = chan.length - 1; i >= 0; --i) {
					if (chan[i].cid === id) {
						chan.splice(i, 1);
						return;
					}
				}
			}
		}
	};

	win.pubsub = pubsub;
})(this);
