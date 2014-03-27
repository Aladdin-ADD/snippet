# 2014-03-27

### ./snippet/javascript/template.js
强迫症发作，使用严格模式，又想要 `with`。
了解了 `eval` 和 `new Function` 之后，找到方法了。

------


# 2013-11-09

度娘直接把 `dlink` 给去掉了，开始真得没弄明白。
在网上找到了 `BaiduPanDownloadHelper`，这个实现好神奇，
我实在不知道怎么那方法发现的……我跟代码的水平确实太嫩了……

不过思路有了，找了下 xhr 请求，然后就解决了。
不过看的出来，度娘不想玩了。

------

# 2013-11-08

度娘果然生气了，直接把 `dlink` 给去掉了……
然后把结果放在了一个 `iframe` 的 `src` 里面……
这是天然呆属性吗……

之后是不是要对请求动手了，真动手就悲剧了。

------

# 2013-11-04

### ./bookmarklet/baidu_pan.js
最近烦躁得很……

不知道度娘在想什么，为了混淆，绕了一大圈，
然后用了个全局变量，连脚本都不用找了。

多文件的情况还没更新，碰上再说，估计又要改动。

------

# 2013-10-05

### ./snippet/scheme/coroutine.ss
tspl4 里的实现，还是有一个小地方没明白为什么。
目标是改写成 cps 的方式。然后就可以搞出 js 的协程了吧。

------

# 2013-10-05

### ./snippet/python/coroutine.py
简单的协程实现，后面会设法完善。
代码稍微复杂一点就看不懂，感觉自己太废了……

------

# 2013-09-14

### ./bookmarklet/baidu_pan.js
音频视频，还是各种情况，这次用正则找 `dlink`，应该没问题了。

------

# 2013-09-15

### ./splitimage.py
使用 `glob` 出了状况。在文件名带 `[]` 之类的字符的时候，
会被认为有特殊含义，转义都转义不了（实现里是用正则直接找字符）。

改成 `os.listdir` 了。

------

# 2013-09-14

### ./bookmarklet/baidu_pan.js
用了更靠谱的办法来检查链接。

------

# 2013-09-11

### ./bookmarklet/baidu_pan.js
终于受不了，写成了 userjs。

------

# 2013-09-10

### ./bookmarklet/baidu_pan.js
以前碰到的问题应该是视频类文件和其他文件不一样导致的。

用了个比较傻的方法改了，先用着。

------

# 2013-09-09

### ./splitimage.py
用来切漫画用。

切完可以用 `optipng` `jpegtran` 处理下。
话说 cpu 的性能差距在这种时候就体现的非常明显了，
好慢啊……

说来文件命名是个问题啊，python 的标准库里都统一小写了，所以跟着小写了。
但是多个单词感觉有些混乱。

------

# 2013-09-05

### ./snippet/javascript/memoize.js
纯粹是抄下来熟悉一下。

在对参数进行序列化的时候，遍历参数的代码是这样的：

```javascript
var i = arg.length;
while (i--) {}
```

平常为了在遍历时少个变量，都是 for 循环测试大于等于 0 。
这里的 `i--` 实在是用得很巧妙啊。

------

# 2013-09-05

### ./snippet/javascript/class.js
才一天，又把 `Object.defineProperty` 去掉了。
要不要改动 `extend` 和 superclass`， 交给用户自己判断。

------

# 2013-09-04

### ./snippet/javascript/class.js
`Object.create` 是减少一次实例化。
这下改写是用 `Object.defineProperty` 来保证 `extend` 和 `superclass` 不被覆盖。
`init` 只是检查了下是否为函数，就不报错了。

------

# 2013-09-04

### ./snippet/javascript/class.js
用 `Object.create` 重写了一遍。
调用父类方法，模仿了 [arale](http://aralejs.org/class/) 的做法。

还补充了下演示对比的代码。

------

# 2013-09-03

### ./snippet/python/xss.py
对于 xss 的了解还不够，过滤规则也还十分简单。
总之别干不知道按不安全的事情。

------

# 2013-09-03

### ./snippet/javascript/pubsub.js
突然想起来 seajs 里面也有个订阅系统，看了看，结果代码就成了 seajs 的翻版了。

没明白触发事件的时候，为什么要复制个数组，遍历不行么。

另外就是突然发现了个从数组后面开始遍历的好处：可以一边遍历一边删除元素。
以前都是图少个变量，没意识到还有这点。

------

# 2013-08-29

### ./snippet/javascript/pubsub.js
取消订阅时，需要遍历数组，感觉效率稍差，就用对象改写了一下。
结果发现速度更慢……

------

# 2013-08-28

### ./snippet/javascript/pubsub.js
算是阅读 knockoutjs 的准备吧。其实实现都差不多，最大的区别是接口设计。
慢慢学习再优化吧。

------

# 2013-08-17

### ./snippet/python/escape.py
更新了一下，统一了编码，全部转成十六进制。

------

# 2013/08/16

### ./bookmarklet/baidu_pan.js
我以后会把其他页面都改了，还准备着什么时候再更新，
结果百度又换回以前的结构了……
代码出了什么问题么……

另外，换了 `uglifyjs` 来压缩代码，
最后代码用得是 `!function(){}()` 的形式，
放到 opera 下面一跑，出了奇怪的问题，会输出执行结果到当前当前页面。

我试了下 `+` `-` `~` 这几个，都有相同的问题。不知道是哪里的问题……

------

# 2013/08/14

### ./bookmarklet/baidu_pan.js
发现自己最近修改记录都是百度的。刚刚又改了个地方。
感觉后面其他页面可能也会跟着修改，然后我要这样一直修修补补吗……

还有不用弹窗，直接替换掉原本页面的想法，有空写写吧。

------

# 2013/08/14

### ./snippet/javascript/drag.js
opera 会自动缩小图片，适应窗口高度。
看了下才发现代码里还实现了拖拽，随手记下来。

这个不至于有版权问题吧……毕竟代码简单得很，看看就能理解……

------

# 2013/08/07

### ./bookmarklet/baidu_pan.js
上次修改引入了 `id`，想用来标记请求，保证是传送给了 aria。
结果忘记了返回的是个数组。

后来再想想，如果返回的是数组，那确实应该就是成功了，那就先这样吧。

顺便给了个错误提示。

-----

# 2013/08/05

### ./bookmarklet/baidu_pan.js
更新了下。不知道百度怎么想的，原来直接放地址，现在放到 js 里面，
有什么区别啊……不过很良心这点没变。

有点奇怪的是，在只有一个文件的情况下，
opera 和 chrome 获取 `script` 的结果是不同的。
（靠 `script:not([src])` 倒是解决了问题，
就是没弄明白这个加载顺序是怎么弄的）。

------

# 2013/07/28

### ./bookmarklet/baidu_pan.js
百度更新了界面，其他倒是没多少变化。

------

# 2013/07/27

### ./bookmarklet/baidu_pan.js
aria2 有反映之后才提示成功，不知道有没其他问题。

------

# 2013/07/23

### ./snippet/javascript/class.js
John Resig 的代码真得好巧妙，再次佩服地五体投地。
实例属性和原型属性的处理得好棒。
基本上就是理解后再转写出来的。

------

# 2013/07/22

### ./redisSub.py
返回值都改成了元组，连修补都算不上吧。

------

# 2013/07/20

### ./redisSub.py
加上了 `close` ，其他没啥变化。

-------

# 2013/07/19

### ./redisSub.py
[redis-py](https://github.com/andymccurdy/redis-py)
的 `subscribe` 是阻塞的。
[tornado-redis](https://github.com/leporo/tornado-redis)
则是根本不支持 python3 。

所以写了这玩意。
只支持 `subscribe` 的几个命令，其他命令用 `redis-py` 吧。
代码很粗糙，也还有几个问题。之后慢慢解决吧。

感觉文件好乱，要怎么整理一下。

-------

# 2013/07/17

### ./baidu_pan.js
主要是样式。

-----

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
