---
title: Gitee+PicGo实现自己的图床
date: 2020-05-04 02:53:00
categories: 杂谈
urlname: 224
tags:
---
<!--markdown-->
?		我是有自己图床的,但是用Typora插入图片的时候总是要先上传到服务器,再插入到Typora里面,这个过程是有些麻烦的,于是就看见可以使用PicGo来省略这个步骤,PicGo是一个图片自动上传工具,可以搭配各种图床使用,我这里就演示一下怎么搭配Gitee来使用



### 1.注册Gitee账户

?	首先去注册Gitee账户,这步应该没什么好说的




## 2.创建图片仓库

点击新建仓库

?	![image-20200504103604231](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504103605.png)





仓库资料这样子填写

![image-20200504103719066](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504104201.png)



#### 		

创建完毕后我们就去下载PicGo

?		<a href='https://github.com/Molunerfinn/picgo/releases'>下载地址</a>





?		windows用户选择这个版本下载

![image-20200504103936484](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504104151.png)





安装完毕后,打开插件设置,搜索gitee,安装我勾选的那个插件

![image-20200504104134131](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504104135.png)





然后打开gitee图床设置,资料填写如下

![image-20200504104258917](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504104300.png)

repo 填写的是你的   **用户名/仓库名**  ,  如果不知道自己的用户名,可以查看你仓库的链接,一般都是xxx/仓库名.com结尾

branch就填**master**

path就是仓库内存放图片的文件夹,**可以随意写**

其它不用填写

Token的获取方式往下看





### 获取token

打开个人设置

![image-20200504104436197](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504104438.png)

选择左边栏的私人令牌

![image-20200504104516970](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504104518.png)



点击生成新令牌

![image-20200504104546860](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504105432.png)

勾选如下并且提交

![image-20200504104655308](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504104657.png)

将令牌复制到PicGo就大功完成了

![image-20200504104734647](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504105756.png)





此时PicGo是可以上传的,而配置Typora自动上传还需要到Typora上进行配置





## typora设置

打开设置

![image-20200504105016281](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504105017.png)





选择picGo app,并且指定程序位置

![image-20200504105129770](https://gitee.com/lzhengycy/Pic/raw/master/img/20200504105131.png)





如果配置没问题的话,到这一步就是OK了,当你复制图片到Typora时候,就可以一键上传到Gitee图床了,很方便也很简单



