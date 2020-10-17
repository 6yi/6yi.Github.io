---
title: Docker复习总结
date: 2019-12-29 15:32:21
categories: linux
urlname: 93
tags:
---
<!--markdown-->?	复习了几天Docker,对他的理解也更深入了,之前只是会用,连大概的原理都不懂.

### Docker

?	docker是一个用go语言打造的开源容器引擎,可以把应用以及依赖打包成一个轻量,可移植的镜像,然后发布到任何一个docker环境下,确保了开发环境和生产环境的相同,做到真正的一次构建到处运行.

### 为什么要用docker

  用docker的好处就是将应用与基础环境分开,特别是微服务项目,一次性启动多个应用必定需要配置多个环境,如果我们使用容器化技术,那么就只需要配置一次环境.

### Docker镜像

?	docker镜像最底层一般都是官方的父镜像,然后套一个linux基础内核,然后再一层层镜像叠加,不同的镜像共用的都是同一个linux内核.

?	Docker镜像的内容主要包含两个部分：第一，镜像层文件内容；第二，镜像json文件。

?	Docker 镜像层的内容一般在 Docker 根目录的 aufs 路径下，为 /var/lib/docker/aufs/diff/.

?	每一个镜像层，Docker 都会保存一份相应的 json 文件，json 文件的存储路径为/var/lib/docker/graph



图为tomcat的镜像层大概示意图:

![微信图片_20191229233242.png][1]

?	

### Docker容器

?	容器就是一个虚拟化的linux环境进程,这里涉及到虚拟化技术,这部分我不了解,也并没有打算深入了解,我只需要知道他是一个独立的linux环境,由镜像生成.

?	容器和镜像的关系可以理解为实体对象和类的关系.生成的容器可以进行修改并且生成新的镜像.

?	容器还能通过添加数据卷的方式对宿主机的文件进行访问和修改,





### 相关笔记

<a href='http://59.110.173.180/index.php/archives/85/'>docker基础命令</a>

<a href='http://59.110.173.180/index.php/archives/90/'>dockerfile</a>

<a href='http://59.110.173.180/index.php/archives/70/'>dockerfile部署springboot应用</a>


  [1]: http://59.110.173.180/usr/uploads/2019/12/3171910134.png