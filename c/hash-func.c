// hash(i) = hash(i-1) * 33 + str[i]
unsigned long DJBX33A(const char *str) {
	unsigned long seed = 33;
	unsigned long hash = 5381;
	while (*str) {
		hash = hash * seed + (*str);
		str++;
	}
	return hash;
}

unsigned long BKDRHash(const char *str) {
	unsigned long seed = 131; // 31 131 1313 13131 131313 etc..
	unsigned long hash = 0;
	while (*str) {
		hash = hash * seed + (*str);
		str++;
	}
	return hash;
}

// 抄了一下，发现 DJBX33A 和 BKDRHash 的模式不是完全一样的吗。
// 只是初始化的 seed 和 hash 不一样。
