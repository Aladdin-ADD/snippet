#ifndef __dict_h__
#define __dict_h__

#include <stdlib.h>
#include <string.h>


typedef struct entry {
	char *key;
	void *value;
} Entry;


typedef struct dict {
	int len;
	unsigned long (*hash_func)(char *key);
	Entry table[];
} Dict;


Dict *dict_create(int len, unsigned long (*hash_func)(char *key));
int dict_set(Dict *d, char *key, void *value);
void *dict_get(Dict *d, char *key);


// hash function
unsigned long djb2(char *key);

#endif
