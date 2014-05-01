// http://leetcode.com/2010/02/c-code-to-remove-spaces-from-string.html

#include <stdio.h>

void remove_space(char *s) {
    char *p = s;
    do {
        while (*p == ' ') {
            p++;
        }
    } while (*s++ = *p++);
}

int main(int argc, char const* argv[]) {
    char *s = "abc de";
    remove_space(s);
    printf("%s\n", s);
    return 0;
}
