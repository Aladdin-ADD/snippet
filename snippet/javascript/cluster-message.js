'use strict';

var cluster = require('cluster');

if (cluster.isMaster) {
    var worker = cluster.fork();
    worker.send({
        message: 'object to worker'
    });
    worker.on('message', function(obj) {
        console.log('message from worker: %j', obj);
    });

    //cluster.disconnect();
}

if (cluster.isWorker) {
    process.send({
        message: 'object to master'
    });
    process.on('message', function(obj) {
        console.log('message from master: %j', obj);
        cluster.worker.disconnect();
    });
}
