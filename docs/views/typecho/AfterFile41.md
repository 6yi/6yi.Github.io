---
title: 一次与反爬虫的抗争体验
date: 2020-01-29 09:04:00
categories: 杂谈
urlname: 149
tags:
- python
---
<!--markdown-->?		大概是去年暑假的时候,闲来无事想在开源众包上揽个活干干,看来看去,发现一个悬赏100人民币的爬虫任务

?	据描述如下,是某学校的大作业,要求爬取一个电子书网站的某本电子书. 我打开那个网站看了下,该网站做了挺多的反爬虫措施,真想弄的话估计得花点时间找点方法,不过我还是报了名,结果别人没选上我,也就把这事给忘却了

?	最近有位小伙伴正在学爬虫,我就把该网站重新找出来,交给他爬 , 慢慢引导下也终于把这活给弄完了,这个爬虫任务还是有点难度的,你们可以自己先去试试 .

##### 网站:  https://g.hongshu.com/content/99269/15382723.html 



我不是专业做爬虫的,所以我的第一反应就是先拉网页看看看看(注,我用的是Python,本来是用Go写的,但是感觉大家可能对python的爬虫比较了解,就用python也写了一遍)

```python
#Python
import requests
body=requests.get("https://g.hongshu.com/content/99269/15382723.html")
print(body.text)
```

返回数据为正常网页,说明没有对请求头的UA各种设限

再根据标签拿小说文字看看,这里使用正则或者Xpath都可以

```html
 <div class="rdtext" fsize="16">
</p><p>而且<span class="context_kw0"></span>.....</div>
```

等你拿到之后你就会发现,文字缺胳膊少腿,少了一堆文字,这是为什么呢,让我们按F12看看网页源码

```javascript
<script type="text/javascript">
var ss = document.cookie;
var reg = new RegExp(/blackwhite=(\d+);/g);
var s1=reg.exec(ss);
var str = '<div class="rdcon" id="wz">';
if(s1 && s1[1]!=0) {
    str = '<div class="rdcon rdbg_black" id="wz">';
}
document.writeln(str);
</script>
```

?	发现有这么一段JS代码,这小说文字的一部分是由js动态生成的,我们直接拉的网页源码是不会把js给加载的

### 这里其实是一个难点

刚学爬虫的同学可能没接触过一个叫 **Selenium Webdriver** 的东西,就算接触了也可能用的是带GUI模式的,如果你知道什么是无头浏览器,你可能就知道下一步该怎么做了

不知道的同学我现在来解释一下, **Selenium Webdriver** 是一个封装好操作浏览器驱动API的python库,你能用这个类库去操作浏览器, Headless Browser(无头浏览器)就是不带图形界面的浏览器,直接操作内核,这样就节省了很多资源

我们为啥需要Webdriver呢??

JS运行需要环境,我们就给他一个浏览器环境,让他把文字全部加载出来,并且使用chrome无头模式,更加节省资源,只需要下载相对应的浏览器驱动,而不需要真的去装浏览器

具体操作如下

```python
#导入库
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

url = "https://g.hongshu.com/content/99269/15382723.html"
chrome_options = Options()
#开启无头模式
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
#请下载chrome浏览器驱动
driver = webdriver.Chrome('./chromedriver.exe', options=chrome_options)
driver.get(url=url)
#打印一下文字看看
print(driver.find_element_by_css_selector(".rdtext").text)
```

打印出来的内容如下

```txt
“大官大官娘重新给你煮莲羹甜味”
水灵丫鬟冒失失冲到庭院气喘吁吁额头布满汗珠
庭院身躯挺拔男站立脑袋四十五度角仰望天空见丫鬟进由摇头苦笑发出声叹息
穿越者！
现身份叫本地财主.....
```

看起来是不是已经差不多了,当你以为大功告成了嘛??你仔细对比一下,你就会发现还是少了部分文字,这是为什么呢???我们再去看看源码
![1.jpg][1]
仔细看缺少的  '人 ' 字,他的html如下

```html
Html
<span class="context_kw14">::before</span>
对应的css
.context_kw14::before {
    content: "人";
}
```

明白了吗?他的字是用CSS渲染上去的,所以我们直接获取html内容是拿不到文字的,这种加密也叫做隐式style,我们去查看一下他的CSS文件,看看能不能直接获取CSS文件然后替换

然后我们就傻眼了,他的CSS样式是空的,所以我猜测他的CSS样式也是动态加密生成的

```html
<style type="text/css" async="true"></style>
```

那咋办嘛?

即使是动态生成的,他肯定也只是在前端加密生成,不可能有别的手段.不可能没有一点痕迹,我们先用个全局搜索看看, 因为是涉及到CSS,我们直接搜索标签的类名 "context_kw" 

![2.jpg][2]
经过搜索,我们发现找到了一段贼长格式打乱的JS代码,我们用JS代码格式工具先转个格式看看

![3.jpg][3]

这些工具网站挺好用的,我最喜欢用JSON格式化或者JSON转go的struct这些了,太方便了

好了,屁话不多说,研究一下他的源码

仔细研究发现,前面一大串都是各种加密方法,看着像AES加密,不过这不是重点,重点是最后的几行代码

```javascript
for (var i = 0x0; i < words[_0x73fd('0x20')]; i++) {
    try {
        document[_0x73fd('0x2c')][0x0][_0x73fd('0x2d')](_0x73fd('0x2e') + i + '::before', _0x73fd('0x2f') + words[i] + '\x22');
    } catch(_0x3c272e) {
        document[_0x73fd('0x2c')][0x0]['insertRule'](_0x73fd('0x2e') + i + _0x73fd('0x30') + words[i] + '\x22}', document['styleSheets'][0x0]['cssRules'][_0x73fd('0x20')]);
    }
}
```

很显而易见了吧,把那些字都存在了words这个变量里,再把字动态生成到各个加密位置的CSS样式里


那你可能会说知道这些有啥用呢,

我的第一反应就是再写一串js代码,把原本生成的字再生成一遍到html页面中,如果你有其它的方法也可以尝试一下



这段JS代码写起来就是这个样子,写起来很简单,主要就是看你有没有想到这个方法

```javascript
/**words是他原本加密时候用到的变量,
这里面都是各个加密字体,
类名'context_kw数字'对应的就是words[数字],
然后我们根据每个类名,
把正确的字再写一遍到html页面中
**/
for (var i=0;i<=words.length;i++){
    obj=document.getElementsByClassName('context_kw'+i)
    for(var j=0;j<obj.length;j++){
        obj[j].innerHTML=words[i]
    }
}
```

先在浏览器里运行一下看看

![4.jpg][4]
很明显,成功了,字被正确的加到页面中,所以才会跟原本的CSS样式造成重复,但是这不要紧,因为CSS的样式我们是不会拿到的,我们最后拿到的文字是不会有重复的

最后代码如下

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
url = "https://g.hongshu.com/content/99269/15382723.html"
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
driver = webdriver.Chrome('./chromedriver.exe', options=chrome_options)
driver.get(url=url)
#多了的这一行就是先执行刚刚的JS代码,然后再去获取text
driver.execute_script('for (var i=0;i<=words.length;i++){obj=document.getElementsByClassName(\'context_kw\'+i);for(var j=0;j<obj.length;j++){obj[j].innerHTML=words[i];}}')
print(driver.find_element_by_css_selector(".rdtext").text)
```

打印结果

```txt
“大官人，大官人，娘子重新给你煮了莲子羹，甜味的。”
一个水灵的丫鬟冒失失的冲到了庭院里，气喘吁吁，额头布满了汗珠。
庭院里，一个身躯挺拔的男子站立在那里，脑袋四十五度角仰望天空，见丫鬟进来后，不由的摇头苦笑，发出了一声叹息。
他，是一个穿越者！...
```

此时才算完美获取到一个页面的文字,要想爬完整本小说直接把a标签抓来开多个线程去爬就完事了



写下这篇爬虫笔记的原因一方面是因为他确实有点挑战性,

二是提醒大家,学任何技术都离不开基础知识支撑,就像学爬虫离的开计算机网络,html,css,js的知识嘛??

虽然我基础水平也是一般般,但是我热爱技术,我愿意为之付出热情

各位共勉~


  [1]: http://59.110.173.180/usr/uploads/2020/01/2512005661.jpg
  [2]: http://59.110.173.180/usr/uploads/2020/01/2658704560.jpg
  [3]: http://59.110.173.180/usr/uploads/2020/01/3151042511.jpg
  [4]: http://59.110.173.180/usr/uploads/2020/01/2343619538.jpg