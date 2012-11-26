# 2012/11/26

### asynclient.py
ssl 原来不需要指定 ca 文件么，没仔细看文档，误解了。

------

# 2012/11/26

### asynclient.py
支持 https 了，虽然支持不太好。ca 文件的路径是个问题，其他 ssl 参数也是个问题。
但至少可以用了。

------

# 2012/11/25

### snippet/python/coroutine.py
改用`send()`初始化，更通用些。

------

# 2012/11/25

### asynclient.py
改用惰性求值的方式，保证程序最后会关闭 epoll 和打开的套接字。

------

# 2012/11/23

### yuedu.py
下载速度大约快了一倍。暂时放下吧。

### asynclient.py
快两倍的根源，使用 epoll 异步下载，回调函数用个闭包，逻辑还算可以吧。

### snippet/python/chunked.py
用来处理`Transfer-Encoding: chunked`的情况，从 asynclient.py 里剥出来的。

------

# 2012/11/21

### yuedu.py
测试了好几次，发现 concurrent.futures 没什么实际效果。
速度提升不大，内存占用也没减小。想办法再改。

------

# 2012/11/20

### yuedu.py
还在改，现在用线程代替了进程。可能还会接着改。下次改成协程？


# 2012/11/19

### yuedu.py
原来 concurrent.futures 的返回是按顺序的。

------

# 2012/11/19

### yuedu.py
用 concurrent.futures 改了下，速度快了一点点……

想改成异步下载。

------

# 2012/11/18

### yuedu.py yuedu.js
把 163_yuedu.js 重命名了下，不知道还能不能用。写了个 python 的脚本。

本来想要试用一下`argparse`模块的，结果完全无法理解。
获得的用户传入的参数可以`print`，却不能传给其他函数。
必须先赋值给中间变量，再把中间变量作为参数传给其他函数，完全无法理解。

------

# 2012/11/15

### snippet/javascript/mouse_direction.js
怎么计算的需要仔细看一下……

------

# 2012/11/8

### template.js
用正则替换来生成代码，已经是极限了，再改进就需要词法分析了吧？

------

# 2012/11/8

### template.js
如果把一些问题推给使用者，写个模板还是很简单的。看下要怎么改进。

------

# 2012/11/5

### template.js
努力实现 js 模板中，完成了普通的变量替换。

------

# 2012/11/4

### escape.py
用来转义 html 字符，完全就是抄着 tornado 的代码，第一次试用 lambda 函数。
之前都没搞懂怎么正确使用 timeit，现在算搞懂了。

------

# 2012/10/29

### ass2srt.py
在 python3 下重写了一下。发现代码果然要经常改，会发现以前的代码存在很多问题。

------

# 2012/9/16


### 163_yuedu.js
原生的 atob 函数居然都是乱码，暂且用了网上找的代码，
不知道网易调用的是哪个函数来解码。

另外 opera 居然没记录 getChapterContent.do 这个 xhr 请求，
害我一直找不到内容来源……用 chrome 才发现了这个请求，
这个应该是 opera 的 bug 吧。

目前是个bookmarklet，有时间整成个按钮放在阅读旁边吧。


解决了乱码问题，换用原生的 atob 函数。顺便解决了 span 标签问题。
