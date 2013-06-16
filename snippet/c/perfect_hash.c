#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// public api

typedef struct dict dict_t;

dict_t *new_dict(char **keys, int size);
void del_dict(dict_t *dict);

void *dict_get(dict_t *dict, char *key);
void dict_set(dict_t *dict, char *key, void *value);

///////////////////////////////////////////////////////////////////////////////

// private

typedef struct state state_t;
typedef struct edge edge_t;

struct dict {
	state_t *start_state;
	void *value_list[];
};

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
state_t *_move(state_t *state, char c);

state_t *new_state(void);
edge_t *new_edge(char c);
void _del_all_states(state_t *s);

///////////////////////////////////////////////////////////////////////////////

dict_t *new_dict(char **keys, int size) {
	dict_t *dict = calloc(1, sizeof(dict_t) + sizeof(void *) *size);
	assert(dict != NULL);
	// initial start state
	dict->start_state = new_state();
	// add keys
	for (int i = 0; i < size; i++)
		_add_key(dict, keys[i], i);
	// minimum states
	//_optimize(dict);
	return dict;
}


void _del_all_states(state_t *s) {
	edge_t *e = s->edge_list;
	while (e != NULL) {
		s->edge_list = e->next;;

		_del_all_states(e->state);
		free(e);

		e = s->edge_list;
	}
	free(s);
}


void del_dict(dict_t *dict) {
	_del_all_states(dict->start_state);
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


state_t *_move(state_t *state, char c) {
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
		state_ptr = _move(state_ptr, *key);
		if (state_ptr == NULL)
			return -1;
		key++;
	}
	return state_ptr->finish;
}


void _add_key(dict_t *dict, char *key, int pos) {
	edge_t *edge;
	state_t *state_ptr = dict->start_state;
	state_t *tmp;

	while (*key != '\0') {
		tmp = _move(state_ptr, *key);
		if (tmp != NULL) {
			state_ptr = tmp;
		} else {
			// create new edge for char
			edge = new_edge(*key);
			// add edge to state
			if (state_ptr->edge_list == NULL) {
				state_ptr->edge_list = edge;
			} else {
				edge->next = state_ptr->edge_list;
				state_ptr->edge_list = edge;
			}
			// move to next state
			state_ptr = edge->state;
		}
		// next char
		key++;
	}
	// index of value list
	if (state_ptr->finish != -1) {
		fprintf(stderr, "duplicate key.\n");
		exit(EXIT_FAILURE);
	}
	state_ptr->finish = pos;
}


state_t *new_state(void) {
	state_t *s = malloc(sizeof(state_t));
	assert(s != NULL);
	s->finish = -1;
	s->edge_list = NULL;
	return s;
}


edge_t *new_edge(char c) {
	edge_t *e = malloc(sizeof(edge_t));
	assert(e != NULL);
	e->accept = c;
	e->state = new_state();
	e->next = NULL;
	return e;
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
