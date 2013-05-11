#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

///////////////////////////////////////////////////////////////////////////////

typedef int (*cmp_func)(const void *, const void *);
typedef struct rbtree_t rbtree_t;

rbtree_t *new_rbtree(cmp_func compare);
void del_rbtree(rbtree_t *rbt);
void set(rbtree_t *rbt, void *key, void *value);
void *get(rbtree_t *rbt, void *key);
