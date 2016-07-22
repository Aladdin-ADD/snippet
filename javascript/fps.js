// https://github.com/mathieuancelin/js-repaint-perfs/blob/gh-pages/lib/monitor.js

function FPS() {
    var bucketSize = 20;
    var bucket = [];
    var lastTime = Date.now();
    this.ping = function() {
        var start = lastTime;
        var stop = Date.now();
        var rate = 1000 / (stop - start);
        bucket.push(rate);
        if (bucket.length > bucketSize) bucket.shift();
        var sum = 0;
        for (var i = 0; i < bucket.length; i++) sum = sum + bucket[i];
        var fps = sum / bucket.length;
        lastTime = stop;
        return fps;
    };
}

(function() {
    var fps = new FPS();
    requestAnimationFrame(function loop() {
        console.log(Math.round(fps.ping()));
        requestAnimationFrame(loop);
    });
})();
