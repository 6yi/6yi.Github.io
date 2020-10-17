---
title: 从零开始用Gitee+Hexo打造自己的免费Blog
date: 2019-05-04 11:51:00
categories: linux
urlname: 227
tags:
---
<!--markdown-->  很多小伙伴可能对blog感兴趣但又不知道怎么搭建自己的blog,这篇文章就是来教大伙搭建一个自己的免费blog



### 前提准备工具:NodeJS,Git

<a href='http://nodejs.cn/download/'>NodeJS下载地址</a>   下载完 直接打开一直按下一步 安装即可

![image-20200504174843666](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504175257.png)

安装完毕后cmd  输入node -v,有类似一下输出即为成功

![image-20200504175254774](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504175302.png)





<a href='https://npm.taobao.org/mirrors/git-for-windows/v2.26.2.windows.1/Git-2.26.2-64-bit.exe'>Git下载</a>  下载完毕也是选择默认安装即可

![image-20200504175549205](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504175557.png)

输入git有以下输出即为成功



这两个安装完毕就可以开始搭建Blog了





## Gitee

?	Gitee(码云),这是一个在线代码仓库,我们需要去注册一个Gitee账户,用来存放我们的博客源码,我们的博客也是运行在Gitee上,因为他提供了web服务,我们可以上传自己的静态Blog网页,达到Blog的效果

### 注册gitee账户

?	<a herf='https://gitee.com/'>Gitee地址</a>

![image-20200504164205833](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504164208.png)

这里按照他的正常流程注册就行





### 创建Blog源码仓库

点击右上角+新建仓库

![image-20200504180033148](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504180036.png)

仓库信息填下如下,仓库名称可以随意填写,我填写的是  **MyBlogResource**,之后点击创建

![image-20200504180244012](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504180246.png)



之后就会看见这个页面,这个页面先不要关,一会要用到

![image-20200504180353828](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504180355.png)



### 安装Hexo

我们先在磁盘上创建一个我们的博客文件夹,然后在这个文件夹上的地址栏输入cmd并且按下回车就能在此文件夹打开cmd

![image-20200504180613998](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504180615.png)



输入以下指令并回车

```cmd
npm install hexo-cli -g
```

稍等片刻让她安装完毕

![image-20200504180732494](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504180733.png)

安装完毕后输入

```cmd
hexo init blog
```

初始化我们的Blog

![image-20200504180852979](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504180856.png)

因为是从外网拉取的原因,所以会比较慢,也是稍等片刻

下载完毕后.我们输入以下指令,让cmd进入blog文件内

```cmd
cd blog
```

然后输入npm install指令来安装blog所需的依赖

```cmd
npm install
```

还是需要稍等片刻





完毕后,再次输入下面指令,用来初始化仓库

```cmd
git init
```



接着我们回到未关闭的gitee仓库里,复制下面这个链接

![image-20200504182139138](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504182141.png)



回到cmd,黏贴上去并且回车

![image-20200504182211953](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504195249.png)

以此输入这几个指令,注释不用输入

```cmd
git add * 								//将blog文件夹内的所有文件添加到仓库里
git commit -m "第一次提交源码"  			//提交
git push origin master                  //推送到gitee
```

![image-20200504182445565](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504182449.png)

注: 输入完git push origin master  可能会让你绑定gitee账户,你就输入用户名和密码就好,需要输入yes/no的地方直接输入yes,因为我已经绑定过,就不演示了



回到gitee按下F5刷新,就会发现自己的blog源码已经上传

![image-20200504182650145](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504182652.png)



我们回到CMD,让Blog在本地跑起来看看

输入

```cmd
hexo server
```

得到显示

```cmd
H:\hexo\blog>hexo server
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```

这个 **http://localhost:4000**就是本地运行地址,我们再浏览器中输入并访问

看见下面的内容,说明blog已经在本地跑起来了,我们离成功很接近了,下面教大伙部署到gitee还有更改主题以及写博文

![image-20200504183114242](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504183116.png)



 

再次回到Gitee创建一个仓库用来部署Blog  (注:前面那个仓库是用来保存博客源码,这个仓库是用来部署博客文件)



名字就叫Blog好了,记得勾选一下画圈的部分

![image-20200504184305578](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504184306.png)

创建完毕后点击服务,选择giteepage

![image-20200504184406230](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504184408.png)

启动

![image-20200504184448151](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504185048.png)





回到仓库点击克隆,复制

![image-20200504185122620](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504185124.png)





打开文件内的**_config.yml**文件进行编辑

![image-20200504185206491](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504185213.png)

url  填写刚刚复制的链接

root填写 **仓库名/** 记得要空一格填写,这个是yml的格式要求

拉到最下面填下如下

![image-20200504185509095](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504185510.png)



```yml
deploy:
  type: git
  repo: https://gitee.com/lzhengycy/Blog  //填写我们的博客仓库地址,第二个建立的那个
  branch: master   
```



填写完毕后,回到cmd,依次输如下面三个命令进行部署

```cmd
hexo clean
hexo g
hexo d
```



部署完毕后,我们回到博客仓库,会发现多了许多东西,并且在此点击giteepage

![image-20200504190029716](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504190031.png)

先点击更新,再复制那个博客地址

![image-20200504190136538](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504190138.png)

在浏览器打开,就会惊喜的发现已经部署完毕,那个链接就是我们的博客地址,我们还可以选择启用https(推荐),勾选强制启用https并且更新部署



![image-20200504190219239](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504190221.png)





下面教大家安装自己喜欢的主题还有写博文



<a href='https://hexo.io/themes/'>主题下载地址</a>

上面是一个主题地址,大伙可以自己挑选好看的主题,点击图片是进入他的主题展示,点击文字是进入github地址,作为演示,我就找一个比较简洁的主题

next主题 :https://github.com/iJinxin/hexo-theme-sky

我们先进入本地博客文件的themes文件夹

![image-20200504191000595](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504191002.png)



在该文件夹的地址栏上输入cmd唤出命令行

输入

```cmd
git clone https://github.com/iJinxin/hexo-theme-sky
```

![image-20200504191200966](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504191202.png)



下载完毕后会多出一个文件夹,复制这个文件夹的名字,这个文件夹就是下载的主题

![image-20200504191253969](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504191255.png)

然后进入该主题文件夹内,打开该文件夹下的_config.yml文件,添加下面的配置

```yml
auto_excerpt:
  enable: true
  length: 150
```



![image-20200504194400279](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504194402.png)





接着回到Blog目录的,打开**_config.yml**    (不是主题目录下的,有两个配置文件)  文件进行修改,拉到最下面修改theme为刚刚复制的文件夹名字

![image-20200504191343873](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504191345.png)



保存后在当前文件夹内打开cmd,输入以下的指令安装依赖和该主题的css文件

```cmd
npm install
npm install hexo-renderer-scss --save
```

![image-20200504191504835](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504191505.png)

等待一段时间



都安装完毕后,输入指令先在本地测试一下

```cmd
hexo server
```



打开http://localhost:4000/ 查看



![image-20200504191852820](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504191858.png)

主题已经更改成功

这里有next主题的<a href='https://ijinxin.github.io/blog/2018/10/29/hexo-theme-sky指南/'>设置手册</a>,大伙可以根据设置手册进行改变自己想要的设置(比如设置首页的样式,中文啥的),我就不演示了



下面是写博文的演示



当我们想要写文章的时候,我们可以在博客内打开cmd,输入

```cmd
hexo new 文章名字
```

![image-20200504192543460](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504192545.png)

我们就可以找到博客目录下的 source/_posts下找到我们生成的博文,他是markdown格式的,可能需要一种工具来边写(推荐使用Typora),我们打开它进行编写

![image-20200504192742409](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504192743.png)

title是博客标题,tags是博客的分类标签

![image-20200504192849439](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504192851.png)

编写完毕就可以保存了



最后一步,把写完的本地博客同步到我们的在线博客,回到cmd上输入

```cmd
hexo clean
hexo g
hexo d
```

这样子就完成了部署



我们回到Gitee仓库,再次更新一下博客部署 ,或者先停了再部署,gitee这个博客更新比较慢  ,然后按F5刷新博客就可以看见我们更新好的内容了

![image-20200504195008056](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504195010.png)

https://lzhengycy.gitee.io/blog/



至于美化什么的,大家可以自行去研究,对于前端同学来说是一点压力都没有的



最后说明一下,我们是建立了两个仓库,一个仓库是用来存放博客源码,一个是用来展示博客内容,两个作用不一样的,当你想要备份博客的时候可以用git保存到Gitee,就是一些git add *,git commit -m 的操作,前面也有演示



为了让你写博文更舒畅,推荐使用Typora编辑器+ <a href='http://59.110.173.180/index.php/archives/224/'>自动插入图片</a>

``

