// https://github.com/tj/deferred.js/blob/master/index.js

export default function Deferred() {
    const p = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
    });
    this.then = p.then.bind(p);
    this.catch = p.catch.bind(p);
}
