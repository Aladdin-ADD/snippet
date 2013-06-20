#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// public api /////////////////////////////////////////////////////////////////

typedef struct node skiplist_t;

skiplist_t *new_skiplist(void);
void del_skiplist(skiplist_t *s);

void update(skiplist_t *s, char *key, void *value);
void delete(skiplist_t *s, char *key);
void *lookup(skiplist_t *s, char *key);

///////////////////////////////////////////////////////////////////////////////

typedef struct node node_t;

node_t *new_node(char *key, void *value, int level);
int random_level(void);

//////////////////////////////////////////////////////////////////////////////

static int max_level = 4;


struct node {
	char *key;
	void *value;
	node_t *right;
	node_t *down;
};


node_t *new_node(char *key, void *value, int level) {
	// create first node
	node_t *node = calloc(1, sizeof(node_t));
	assert(node != NULL);
	size_t len = strlen(key) + 1;
	node->key = malloc(sizeof(char) * len);
	memcpy(node->key, key, len);
	node->value = value;

	// following node
	int i = 1;
	node_t *ptr = node;
	while (i++ < level) {
		ptr->down = calloc(1, sizeof(node_t));
		assert(ptr->down != NULL);
		ptr = ptr->down;
		ptr->key = node->key;
		ptr->value = value;
	}

	return node;
}


int random_level(void) {
	int level = 1;
	// p = 1/4
	while ((random() <= RAND_MAX / 4) && (level <= max_level))
		level++;
	return level;
}


skiplist_t *new_skiplist(void) {
	skiplist_t *s = calloc(1, sizeof(skiplist_t));
	assert(s != NULL);

	int i = 1;
	node_t *ptr = s;
	while (i++ < max_level) {
		ptr->down = calloc(1, sizeof(node_t));
		assert(ptr->down != NULL);
		ptr = ptr->down;
	}

	return s;
}


void del_skiplist(skiplist_t *s) {
	node_t *ptr;
	while (s != NULL) {
		ptr = s->right;
		while (ptr != NULL) {
			s->right = ptr->right;
			if (ptr->key != NULL) free(ptr->key);
			free(ptr);
			ptr = s->right;
		}
		ptr = s->down;
		free(s);
		s = ptr;
	}
}


void *lookup(skiplist_t *s, char *key) {
	// strcmp(key, s->key) > 0 => key > s->key
	int m;
	while (1) {
		if (s->right != NULL) {
			m = strcmp(key, s->right->key);
			// m == 0, return s->right
			// m > 0, move to s->right
			// m < 0, move to s->down
			if (m == 0) {
				return s->right->value;
			} else if (m > 0) {
				s = s->right;
				continue;
			}
		}
		if (s->down != NULL) {
			s = s->down;
		} else {
			return NULL;
		}
	}
}


void delete(skiplist_t *s, char *key) {
	int m;
	while (1) {
		if (s->right != NULL) {
			m = strcmp(key, s->right->key);
			if (m == 0) {
				// find key, start to delete
				node_t *ptr = s->right; // ptr pointer to the node to delete
				free(ptr->key); // release key
				s->right = ptr->right;
				free(ptr);
				while (s->down != NULL) {
					s = s->down;
					ptr = s->right;
					s->right = ptr->right;
					free(ptr);
				}
			} else if (m > 0) {
				// move to right
				s = s->right;
				continue;
			}
		}
		if (s->down != NULL) {
			s = s->down;
		} else {
			return; // invalid key
		}
	}
}


void update(skiplist_t *s, char *key, void *value) {
	skiplist_t *head = s;
	int m;
	while (1) {
		if (s->right != NULL) {
			m = strcmp(key, s->right->key);
			if (m == 0) {
				// update value
				s->right->value = value;
				return;
			} else if (m > 0) {
				s = s->right;
				continue;
			}
		}
		if (s->down != NULL) {
			s = s->down;
		} else {
			// create new node
			int level = random_level();
			node_t *node = new_node(key, value, level);

			// move to new node's level
			int i = max_level - level;
			while (i-- > 0) head = head->down;

			// insert new node
			while (head != NULL) {
				s = head;
				while (s->right != NULL && strcmp(key, s->right->key) > 0)
					s = s->right;
				node->right = s->right;
				s->right = node;

				head = head->down;
				node = node->down;
			}

			// insert finish
			return;
		}
	}
}

///////////////////////////////////////////////////////////////////////////////


int main(int argc, char * argv[]) {
	skiplist_t *s = new_skiplist();
	update(s, "test", "value");
	printf("test: %s\n", lookup(s, "test"));
	update(s, "test", "value value");
	printf("test: %s\n", lookup(s, "test"));
	delete(s, "test");
	printf("test: %s\n", lookup(s, "test"));
	del_skiplist(s);
	return 0;
}
