#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// public api

typedef struct dict dict_t;

dict_t *new_dict(char **keys, int size);
void del_dict(dict_t *dict);

void *dict_get(dict_t *dict, char *key);
void dict_set(dict_t *dict, char *key, void *value);

///////////////////////////////////////////////////////////////////////////////

// private

struct dict {
	struct state *start_state;
	void *value_list[];
};

typedef struct state state_t;
typedef struct edge edge_t;

struct state {
	int finish; // initial -1
	edge_t *edge_list; // link list of accept char
};

struct edge {
	char accept; // accept char
	state_t *state; // next state
	edge_t *next; // next edge
};


void _add_key(dict_t *dict, char *key, int pos);
void _optimize(dict_t *dict);
int _lookup(dict_t *dict, char *key);
state_t *_next_state(state_t *state, char c);

state_t *new_state(void);
void del_state(state_t *s);
edge_t *new_edge(char c);
void del_edge(edge_t *e);

///////////////////////////////////////////////////////////////////////////////

dict_t *new_dict(char **keys, int size) {
	dict_t *dict = calloc(1, sizeof(dict_t) + sizeof(void *) *size);
	// initial start state
	dict->start_state = new_state();
	// add keys
	for (int i = 0; i < size; i++)
		_add_key(dict, keys[i], i);
	// minimum states
	_optimize(dict);
	return dict;
}


void del_dict(dict_t *dict) {
	free(dict);
}


void *dict_get(dict_t *dict, char *key) {
	int pos = _lookup(dict, key);
	if (pos == -1) {
		fprintf(stderr, "key error.\n");
		return NULL;
	} else {
		return dict->value_list[pos];
	}
}


void dict_set(dict_t *dict, char *key, void *value) {
	int pos = _lookup(dict, key);
	if (pos == -1) {
		fprintf(stderr, "key error.\n");
		exit(EXIT_FAILURE);
	} else {
		dict->value_list[pos] = value;
	}
}


state_t *_next_state(state_t *state, char c) {
	edge_t *edge_ptr = state->edge_list;
	while (edge_ptr != NULL) {
		if (edge_ptr->accept == c) {
			return edge_ptr->state;
		} else {
			edge_ptr = edge_ptr->next;
		}
	}
	return NULL;
}


int _lookup(dict_t *dict, char *key) {
	state_t *state_ptr = dict->start_state;
	while (*key != '\0') {
		state_ptr = _next_state(state_ptr, *key);
		if (state_ptr == NULL)
			return -1;
		key++;
	}
	return state_ptr->finish;
}


void _add_key(dict_t *dict, char *key, int pos) {
	edge_t *edge, *edge_ptr;
	state_t *state_ptr = dict->start_state;

	while (*key != '\0') {
		if (_next_state(state_ptr, *key) != NULL) {
			state_ptr = _next_state(state_ptr, *key);
		} else {
			// create new edge for char
			edge = new_edge(*key);
			// add edge to state
			if (state_ptr == NULL) {
				state_ptr->edge_list = edge;
			} else {
				edge->next = state_ptr->edge_list;
				state_ptr->edge_list = edge;
			}
			// move to next state
			state_ptr = edge->state;
		}
		key++;
	}
	// index of value list
	state_ptr->finish = pos;
}


void _optimize(dict_t *dict) {
	return;
}


state_t *new_state(void) {
	state_t *s = malloc(sizeof(state_t));
	s->finish = -1;
	s->edge_list = NULL;
	return s;
}


void del_state(state_t *s) {
	free(s);
}


edge_t *new_edge(char c) {
	edge_t *e = malloc(sizeof(edge_t));
	e->accept = c;
	e->state = new_state();
	e->next = NULL;
	return e;
}


void del_edge(edge_t *e) {
	free(e);
}

///////////////////////////////////////////////////////////////////////////////


int test(void) {
	char *keys[] = {"who", "what", "where"};
	dict_t *dict = new_dict(keys, 3);

	dict_set(dict, "who", "man");
	dict_set(dict, "what", "human");
	dict_set(dict, "where", "china");
	printf("%s\n", dict_get(dict, "where"));
	printf("%s\n", dict_get(dict, "who"));

	del_dict(dict);
	return 0;
}

int main(int argc, char * argv[]) {
	test();
}
