(function() {
    'use strict';

    var doc = document;

    var initial = function() {
        // checkbox
        var $$a = doc.querySelectorAll('a');
        var $$checkbox = Array.prototype.map.call($$a, function($a) {
            var link = $a.href;
            if (link.substr(-1) === '/') return;
            var $checkbox = doc.createElement('input');
            $checkbox.type = 'checkbox';
            $checkbox.checked = true;
            $checkbox.value = link;
            $a.parentNode.insertBefore($checkbox, $a);
            return $checkbox;
        }).filter(Boolean);

        // check all
        var $checkAll = doc.createElement('input');
        $checkAll.type = 'checkbox';
        $checkAll.checked = true;
        $checkAll.addEventListener('click', function() {
            $$checkbox.forEach(function($checkbox) {
                $checkbox.checked = $checkAll.checked;
            });
        });
        $$a[0].parentNode.insertBefore($checkAll, $$a[0]);

        // submit
        var $h1 = doc.querySelector('h1');
        var $btn = doc.createElement('button');
        $btn.innerHTML = 'submit';
        doc.body.insertBefore($btn, $h1);
        $btn.addEventListener('click', function() {
            var params = $$checkbox.filter(function($checkbox) {
                return $checkbox.checked;
            }).map(function($checkbox) {
                // return $checkbox.value;
                return {
                    jsonrpc: '2.0',
                    id: String(Date.now()),
                    method: 'aria2.addUri',
                    params: [[$checkbox.value]]
                };
            });
            if (params.length === 0) return;

            window.q = params.map((p) => p.params[0]).join('\n');

            var url = 'http://localhost:6800/jsonrpc';
            var data = JSON.stringify(params);

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState !== 4) return;
                if (xhr.responseText) {
                    console.log(JSON.parse(xhr.responseText));
                }
            };
            xhr.open('POST', url);
            xhr.send(data);
        });
    };

    var ready = function(fn) {
        if (doc.readyState === 'complete') {
            setTimeout(fn);
        } else {
            doc.addEventListener('DOMContentLoaded', fn);
        }
    };

    ready(initial);
})();
