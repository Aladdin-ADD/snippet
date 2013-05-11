#include "rbtree.h"

// red black tree /////////////////////////////////////////////////////////////

// private ////////////////////////////////////////////////////////////////////

typedef struct node_t node_t;
node_t *new_node(node_t *parent, void *key, void *value);
void del_node(node_t *node);



struct rbtree_t {
	cmp_func compare;
	node_t *root;
};



struct node_t {
	node_t *parent;
	node_t *left;
	node_t *right;
	enum {RED, BLACK} color;
	void *key;
	void *value;
};



node_t *new_node(node_t *parent, void *key, void *value) {
	node_t *node = malloc(sizeof(node_t));
	assert(node != NULL);
	node->color = RED;
	node->parent = parent;
	node->key = key;
	node->value = value;
	return node;
}



void del_node(node_t *node) {
	if (node != NULL) {
		del_node(node->left);
		del_node(node->right);
		free(node);
	}
}


// public /////////////////////////////////////////////////////////////////////


rbtree_t *new_rbtree(cmp_func compare) {
	rbtree_t *rbt = malloc(sizeof(rbtree_t));
	assert(rbt != NULL);
	rbt->compare = compare;
	rbt->root = NULL;
	return rbt;
}



void del_rbtree(rbtree_t *rbt) {
	del_node(rbt->root);
	free(rbt);
}



void *get(rbtree_t *rbt, void *key) {
	if (rbt->root == NULL)
		return NULL;
	int s;
	node_t *node = rbt->root;
	while (node) {
		s = rbt->compare(node->key, key);
		if (s > 0) {
			node = node->left;
		} else if (s < 0) {
			node = node->right;
		} else {
			return node->value;
		}
	}
	return NULL;
}



void set(rbtree_t *rbt, void *key, void *value) {
	if (rbt->root == NULL) {
		rbt->root = new_node(NULL, key, value);
		return;
	}
	int s;
	node_t *node = rbt->root;
	while (1) {
		s = rbt->compare(node->key, key);
		if (s > 0) {
			if (node->left == NULL) {
				node->left = new_node(node->left, key, value);
				node = node->left;
				break;
			}
			node = node->left;
		} else if (s < 0) {
			if (node->right == NULL) {
				node->right = new_node(node->right, key, value);
				node = node->right;
				break;
			}
			node = node->right;
		} else {
			node->value = value;
			return;
		}
	}
	// TODO
	// balance
}


// test ///////////////////////////////////////////////////////////////////////


static inline int c(const void *a, const void *b) {
	return strcmp(a, b);
}

int main(int argc, char * argv[]) {
	rbtree_t *T = new_rbtree(c);
	set(T, "1", "short string");
	printf("%s\n", get(T, "1"));
	del_rbtree(T);
	return 0;
}
