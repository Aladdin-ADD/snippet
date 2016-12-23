// https://www.webreflection.co.uk/blog/2016/12/23/javascript-proto-state

export class State {
    constructor(setup) {
        Object.assign(this, setup);
    }
    static next(state, setup) {
        return Object.setPrototypeOf(new State(setup), state);
    }
    static prev(state) {
        const previous = Object.getPrototypeOf(state);
        return (previous === State.prototype ? null : previous);
    }
    static keys(state) {
        const keys = [];
        for (const k in state) keys.push(k);
        return keys;
    }
    static diff(curr, prev) {
        const keys = [];
        while (curr !== prev) {
            keys.push(...Object.keys(curr));
            curr = Object.getPrototypeOf(curr);
        }
        return new Set(keys).values();
    }
}

export class ImmutabeState extends State {
    constructor(setup) {
        super(setup);
        Object.freeze(this);
    }
    static next(state, setup) {
        const s = super.next(state, setup);
        return Object.freeze(s);
    }
}
