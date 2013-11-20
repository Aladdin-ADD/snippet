// ==UserScript==
// @include http://pan.baidu.com/share/link*
// @include http://yun.baidu.com/share/link*
// @include http://pan.baidu.com/s/*
// ==/UserScript==

// thanks to https://userscripts.org/scripts/show/162138

(function() {
	"use strict";

	document.addEventListener("DOMContentLoaded", function() {
		var oldBtn = document.querySelector("#barAllCmdDownload") ||
			document.querySelector("#downFileButtom");
		var newBtn = oldBtn.cloneNode();
		newBtn.id += "x";
		newBtn.addEventListener("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			getUrl();
		}, true);
		oldBtn.parentNode.replaceChild(newBtn, oldBtn);
	});

	function getUrl() {
		var result = [];
		var xhr;
		var url = "http://pan.baidu.com/share/download?channel=chunlei&clienttype=0&web=1" +
			"&uk=" + FileUtils.share_uk +
			"&shareid=" + FileUtils.share_id;
		var data;
		var resp;

		if (FileUtils.fsId) {
			/*file*/
			xhr = new XMLHttpRequest();
			xhr.open("get", url + "&fid_list=%5B" + FileUtils.fsId + "%5D", false);
			xhr.send(null);
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
				resp = JSON.parse(xhr.responseText);
				console.log(resp);
				result.push([
					FileUtils.whiteListShareInfo,
					resp.dlink
				]);
			}
		} else {
			if (!window.location.hash) {
				/* one directory */
				var script = document.querySelectorAll("script:not([src])")[3];
				var content = script.textContent.split("applicationConfig,");
				var fileList = content[1].split("},{");
				fileList.map(function(e) {
					xhr = new XMLHttpRequest();
					var l = e.replace(/[[\]\\{}")]/g, "").split(",");
					for (var i = 0; i < l.length; i++) {
						if (/fs_id/.test(l[i])) {
							xhr.open("get", url + "&fid_list=%5B" + l[i].split(":")[1] + "%5D", false);
							xhr.send(null);
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
								resp = JSON.parse(xhr.responseText);
								console.log(resp);
							}
						} else if (/server_filename/.test(l[i])) {
							result.push([
								l[i].split(":")[1],
								resp.dlink
							]);
							break;
						}
					}
				});
			} else {
				/* sub directory */
				xhr = new XMLHttpRequest();
				var tmpurl = "http://pan.baidu.com/share/list?" +
					window.location.hash.replace("#dir/path=", "dir=") +
					"&uk=" + FileUtils.share_uk +
					"&shareid=" + FileUtils.share_id;
				xhr.open("get", tmpurl, false);
				xhr.send(null);
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
					var r = JSON.parse(xhr.responseText);
					r.list.forEach(function(elem) {
						data = "fid_list=%5B" + elem.fs_id + "%5D";
						xhr = new XMLHttpRequest();
						xhr.open("post", url, false);
						xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
						xhr.send(data);
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
							resp = JSON.parse(xhr.responseText);
							console.log(resp);
							result.push([elem.server_filename, resp.dlink]);
						}
					});
				}
			}
		}

		output(result);

		var addTasks = function(remote, filelist, pop) {
			/*use jsonrpc to add tasks*/
			if (filelist.length === 0) return;
			var conn = new WebSocket(remote);
			conn.onopen = function(e) {
				var data = [];
				filelist.forEach(function(elem) {
					data.push({
						jsonrpc: "2.0",
						id: "blah",
						method: "aria2.addUri",
						params: [
							[elem[1]], {
							"out": elem[0]
						}
						] /* url, name */
					});
				});
				conn.send(JSON.stringify(data));
			};
			conn.onerror = function(e) {
				pop.alert("No aria2 connection.");
			};
			conn.onmessage = function(e) {
				var data = JSON.parse(e.data);
				if (Array.isArray(data)) {
					pop.alert("ok.");
					conn.close();
				}
			};
		};

		function output(res) {
			var html = '<style>';
			html += 'form{margin:0}form input{font-size:100%;margin:0;vertical-align:baseline;line-height:normal}form input[type="text"]{width:30em;padding:.5em .6em;display:inline-block;border:1px solid #ccc;font-size:.8em;box-shadow:inset 0 1px 3px #ddd;border-radius:4px;transition:.3s linear border;box-sizing:border-box}form input[type="checkbox"]{margin:.5em}form input[type="text"]:focus,form input[type="checkbox"]:focus{outline:0;border-color:#129fea}form label{margin:.5em 1em .2em;font-size:90%}div{margin:.5em 0}div:hover{background-color:#ace}';
			html += '</style>';
			html += '<form>';
			html += '<label>JSON RPC path: ';
			html += '<input type="text" value="ws://localhost:6800/jsonrpc" id="remote" />';
			html += '</label>';
			res.forEach(function(elem) {
				html += '<div class="file">';
				html += '<input type="checkbox" checked />';
				html += '<label>filename: <input type="text" name="name" value="' + elem[0] + '" /></label>';
				html += '<a href="' + elem[1] + '">' + elem[0] + '</a>';
				html += '</div>';
			});
			html += '<input type="submit" value="add to aria2" id="submit" />';
			html += '</form>';

			var pop = window.open("", "content", "height=500, width=900, scrollbars=yes");
			var doc = pop.document;
			doc.body.innerHTML = html;

			var forEach = Array.prototype.forEach;
			var divs = doc.querySelectorAll("div.file");
			forEach.call(divs, function(el) {
				el.addEventListener("click", function(e) {
					if (e.target === this) {
						var box = this.querySelector("input[type=checkbox]");
						box.checked = box.checked ? false : true;
					}
				});
			});
			var submit = doc.querySelector("#submit");
			submit.addEventListener("click", function(e) {
				e.preventDefault();
				var remote = doc.querySelector("#remote").value;
				var filelist = [];
				forEach.call(divs, function(el) {
					if (el.querySelector("input[type=checkbox]").checked) {
						filelist.push([
							el.querySelector("input[type=text]").value,
							el.querySelector("a").href
						]);
					}
				});
				addTasks(remote, filelist, pop);
			});
		}
	}
})();
