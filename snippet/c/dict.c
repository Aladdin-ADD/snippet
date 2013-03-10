#include "dict.h"


unsigned long djb2(char *key) {
	// djb2 hash function
	unsigned long hash = 5381;
	int c;
	while (c = *key++)
		hash = (hash << 5) + hash + c;
	return hash;
}


Dict *dict_create(int len, unsigned long (*hash_func)(char *)) {
	size_t size = sizeof(Dict) + sizeof(Entry) * len;
	Dict *d = malloc(size);

	d->len = len;
	d->hash_func = (hash_func == NULL) ? djb2 : hash_func;

	return d;
}


int dict_set(Dict *d, char *key, void *value) {
	if (key == NULL) return -1; // invalid key

	int pos = d->hash_func(key) % d->len;
	int f = pos;

	Entry *cur;
	while (1) {
		cur = &d->table[pos];
		if (cur->key == NULL) {
			cur->key = key;
			cur->value = value;
			return 0;
		} else if (strcmp(cur->key, key) == 0) {
			cur->value = value;
			return 0;
		} else {
			pos = (pos + 1 < d->len) ? pos + 1 : 0;
			if (pos == f) return -2; // dict is full
		}
	}
}


void *dict_get(Dict *d, char *key) {
	if (key == NULL) return NULL; // invalid key

	int pos = d->hash_func(key) % d->len;
	int f = pos;

	Entry *cur;
	while (1) {
		cur = &d->table[pos];
		if (cur->key == NULL) return NULL;
		if (strcmp(cur->key, key) == 0) return cur->value;
		pos = (pos + 1 < d->len) ? pos + 1 : 0;
		if (pos == f) return NULL;
	}
}
