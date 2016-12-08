// http://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html

const RED = true;
const BLACK = false;
const isRed = (node) => Boolean(node && node.color === RED);

class RBTreeNode {
    constructor(key, value, color) {
        this.key = key;
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
    }
}

class RBTree {
    constructor() {
        this.root = null;
    }
    get(key) {
        let node = this.root;
        while (node !== null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return node.value;
            }
        }
        return null;
    }
    delete(key) {
        if (this.get(key) === null) return;
        let root = this.root;
        if (!isRed(root.left) && !isRed(root.right)) root.color = RED;
        root = this._delete(root, key);
        if (root !== null) root.color = BLACK;
        this.root = root;
    }
    _delete(node, key) {
        if (key < node.key) {
            if (!isRed(node.left) && !isRed(node.left.left)) {
                node = this._moveRedLeft(node);
            }
            node.left = this._delete(node.left, key);
        } else {
            if (isRed(node.left)) {
                node = this._rotateRight(node);
            }
            if (key === node.key && node.right === null) {
                return null;
            }
            if (!isRed(node.right) && !isRed(node.right.left)){
                node = this._moveRedRight(node);
            }
            if (key === node.key) {
                const tmp = this._min(node.right);
                node.key = tmp.key;
                node.val = tmp.val;
                node.right = this._deleteMin(node.right);
            } else {
                node.right = this._delete(node.right, key);
            }
        }
        return this._balance(node);
    }
    _moveRedLeft(node) {
        this._flipColors(node);
        if (isRed(node.right.left)) {
            node.right = this._rotateRight(node.right);
            node = this._rotateLeft(node);
            this._flipColors(node);
        }
        return node;
    }
    _moveRedRight(node) {
        this._flipColors(node);
        if (isRed(node.left.left)) {
            node = this._rotateRight(node);
            this._flipColors(node);
        }
        return node;
    }
    _min(node) {
        if (node.left === null) {
            return node;
        } else {
            return this._min(node.left);
        }
    }
    _deleteMin(node) {
        if (node.left === null) {
            return null;
        }
        if (!isRed(node.left) && !isRed(node.left.right)) {
            node = this._moveRedLeft(node);
        }
        node.left = this._deleteMin(node.left);
        return this._balance(node);
    }
    put(key, value) {
        this.root = this._put(this.root, key, value);
        this.root.color = BLACK;
    }
    _put(node, key, value) {
        if (node === null) return new RBTreeNode(key, value, RED);
        if (key < node.key) {
            node.left = this._put(node.left, key, value);
        } else if (key > node.key) {
            node.right = this._put(node.right, key, value);
        } else {
            key.value = value;
        }
        node = this._balance(node);
        return node;
    }
    _rotateLeft(node) {
        const r = node.right;
        node.right = r.left;
        r.left = node;
        r.color = node.color;
        node.color = RED;
        return r;
    }
    _rotateRight(node) {
        const l = node.left;
        node.left = l.right;
        l.right = node;
        l.color = node.color;
        node.color = RED;
        return l;
    }
    _flipColors(node) {
        node.color = !node.color;
        node.left.color = !node.left.color;
        node.right.color = !node.right.color;
    }
    _balance(node) {
        if (isRed(node.right) && !isRed(node.left)) {
            node = this._rotateLeft(node);
        }
        if (isRed(node.left) && isRed(node.left.left)) {
            node = this._rotateRight(node);
        }
        if (isRed(node.left) && isRed(node.right)) {
            this._flipColors(node);
        }
        return node;
    }
}

export {
    RBTree
};
