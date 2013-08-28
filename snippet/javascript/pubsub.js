(function(win) {
	"use strict";

	var channels = {};
	// { ch: [ {cid: x, callback: fn}, {cid: x, callback: fn} ] }

	var cid = 0;

	var pubsub = {
		publish: function(ch, msg) {
			if (channels[ch]) {
				var channel = channels[ch];
				for (var i = channel.length - 1; i >= 0; i--) {
					channel[i].callback(msg);
				}
			}
		},

		subscribe: function(ch, callback) {
			if (!channels[ch]) channels[ch] = [];
			channels[ch].push({
				cid: ++cid,
				callback: callback
			});
			return cid;
		},

		unsubscribe: function(ch, cid) {
			var channel = channels[ch];
			for (var i = channel.length - 1; i >= 0; i--) {
				if (channel[i].cid === cid)
					channel.splice(i, 1);
			}
		}
	};

	win.pubsub = pubsub;
})(this);
