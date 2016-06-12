window.addEventListener('beforeunload', function(e) {
    e.returnValue = false;
    return false;
});
