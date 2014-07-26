(function() {
    "use strict";

    // alert.hide();
    // alert.info("info");
    // alert.success("info");
    // alert.warning("warning");
    // alert.danger("danger");
    var alert = {
        _el: null,
        _initial: function() {
            var style = document.createElement("style");
            style.innerHTML = "#_alert{font-size:20px;position:fixed;text-align:center;top:30px;width:100%}._alert{border-radius:4px;border:1px solid transparent;box-sizing:border-box;display:inline-block;padding:.5em 1em}._alert a{font-weight:700}._alert--success{background-color:#dff0d8;border-color:#d6e9c6;color:#3c763d}._alert--success a{color:#2b542c}._alert--info{background-color:#d9edf7;border-color:#bce8f1;color:#31708f}._alert--info a{color:#245269}._alert--warning{background-color:#fcf8e3;border-color:#faebcc;color:#8a6d3b}._alert--warning a{color:#66512c}._alert--danger{background-color:#f2dede;border-color:#ebccd1;color:#a94442}._alert--danger a{color:#843534}";
            document.head.appendChild(style);
            var el = document.createElement("div");
            el.id = "_alert";
            document.body.appendChild(el);
            this._el = el;
        },
        _show: function(className, message) {
            if (!this._el) this._initial();
            var el = this._el;
            el.innerHTML = "<div class='_alert "+ className + "'>" + message + "</div>";
            el.style.display = "block";
        },
        hide: function() { this._el && (this._el.style.display = "none"); },
        success: function(message) { this._show("_alert--success", message); },
        info: function(message) { this._show("_alert--info", message); },
        warning: function(message) { this._show("_alert--warning", message); },
        danger: function(message) { this._show("_alert--danger", message); },
    };

    window.dialog = {
        alert: alert
    };
})();
