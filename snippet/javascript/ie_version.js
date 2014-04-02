// from knockout.js

(function() {
    "use strict";
    function getIEVersion() {
        var version = 3;
        var div = document.createElement("div");
        var iElems = div.getElementsByTagName("i");

        while (true) {
            div.innerHTML = "<!--[if gt IE " + (++version) + "]><i></i><![endif]-->";
            // iElems will update after div changed.
            if (! iElems[0])
                break;
        }
        return version > 4 ? version : undefined;
    }
})();
