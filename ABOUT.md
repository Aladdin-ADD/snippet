# 2013/06/28

### ./baidu_pan.js
更新了一下，链接是个修复文件夹的问题。

------

# 2013/06/25

### ./snippet/python/urlimport.py
最早在 v2ex 看过，最近又在 python cookbook 上面看到。抄了一份。

------

# 2013/06/22

### ./snippet/python/pbkdf2.py
从 `python cookbook` 上看到的技巧，直接使用 `int` 的 `to_bytes` 方法。
不过对效率完全没影响……

------

# 2013/06/20

### ./snippet/c/skiplist.c
没注意就出现 bug 了啊。

------

# 2013/06/18

### ./snippet/c/skiplist.c
确实比什么平衡树好写很多啊。

------

# 2013/06/18

### ./baidu_pan.js
aria2c 是好东西，yaaw 也是好东西，baidupan 是百度的良心。
加上了发送到 aria2c 的功能，免得每次复制地累死人。

------

# 2013/06/18

### ./github_print.js
github 改版了呀。

------

# 2013/06/15

### ./snippet/c/perfect_hash.c
释放内存，偷懒使用了递归。最小化状态要怎么弄，有点麻烦哪，每个终止状态都是不同的呀。

------

# 2013/06/15

### ./snippet/c/perfect_hash.c
其实想了下，就是棵前缀树呀。

------

# 2013/06/14

### ./snippet/c/perfect_hash.c
实现了基本功能，剩下优化状态和释放内存还没写好。算是学习编译原理的副产品了。

------

# 2013/06/12

### ./snippet/python/options.py
对`argparse`的一点包装，模仿了下`tornado.options`。
感觉功能上`argparse`更给力，不过没那么多需求的话，直接一个`define`，
用起来确实更方便些。

------

# 2013/06/09

### ./snippet/python/database.py
去掉了`max_idle_time`参数，直接使用自带的`is_connected`方法来检查连接是否可用。

------

# 2013/06/07

### ./snippet/python/database.py
算是再次开始学习 tornado 的前奏吧。

------

# 2013/06/06

### ./baidu_pan.js
导出百度盘的下载地址。
想要搞给 aria 用的，不过还有 cookie 的检查？要再研究下。
看看能不能搞成一个 yaaw 的插件。

------

# 2013/06/04

### ./github_print.js
好久没更新了，发现 github 的样式改了一点点。

------

# 2013/05/11

### ./snippet/c/rbtree.c
红黑树。各种旋转好复杂，没吃透。晚上搞定掉。
好好努力下，目标实现各种平衡树。然后就是字典实现了。  
另外，把之前的哈希实现改了个名字。

------

# 2013/4/23

### ./snippet/python/trie.py
好久没更新了，随手写了个前缀树。基本可以工作，需要进行一点改进。
用得是很低效的实现，也可以改进下。

更新：用 O(n^2) 的低效遍历解决了结果不全的问题。
考虑用二维表全部重写一遍。

------

# 2013/3/10

### ./snippet/c/dict.c
在尝试解析 http 协议，想要用字典来保存 header field，
都要完工了才想起来 cookie 这个麻烦的家伙。

作罢，还有好多函数没实现，先放着了。

------

# 2013/1/31

### ./snippet/python/kmp.py
一月居然都要结束了……

被 kmp 算法的失效函数困扰了好久，就把代码放上来了。

------

# 2013/1/17

### ./snippet/python/pbkdf2.py
昨晚开始看别人的实现，一开始没看明白，后来看明白了又因为编码问题晕了好久。

到底这些编码是什么情况，其实现在也没明白，不过可以用了……

------

# 2013/1/14

### ass2srt.py
刚刚转了个文件，发现转完也没有个提示…… 
稍微加了点注释，加了完成提示。

------

# 2012/12/22

### ./snippet/javascript/type.js
搞了半天搞不定自定义类的类型，还是要自己检查。
了解了下`Object.prototype.toString`到底干了什么……

看了下 jquery，把截取字符串改成了散列表，速度差不多是原来的5倍。

------

# 2012/12/19

惊讶发现代码居然都没有注释，这是怎么回事……

------

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
