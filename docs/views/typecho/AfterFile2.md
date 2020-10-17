---
title: Docker复习1--常用的基础命令
date: 2019-12-22 07:37:00
categories: linux
urlname: 85
tags:
---
<!--markdown-->拉取镜像
    
```shell
 docker pull xxxx:8
```
 
启动容器
    
```shell
    docker run -it -d  -p 8090:8080  -e xxxxx=xxx  -v /root/mydata:/testdata  --name mytest xxxx
    
    # - 
        it 进入交互界面
        d  守护进程启动
        p 8090:8080  宿主机的8090端口映射到容器的8080端口 
        e 传递环境变量
        v 数据卷,宿主机的/root/mydata于容器共享目录
        --name 容器别名
   #     
```
以启动mysql为例
```shell
    docker run -d -p 3306:3306 -e MYSQL_PASS_WORD=1234 --name lzhengsql mysql:latest 
```

进入容器的交互界面
```shell
    docker exec -it xxxxx bash
```

从容器中创建一个镜像

```shell
    docker commit -a lzheng -m 'mytestimages'  xxxx lzheng/myimages:1.0
    
    #
        -a  作者信息
        -m 提交说明
        -c  使用dockerfile创建
        -p  创建时将容器暂停
   #
   
 docker ps  
 
REPOSITORY            TAG       IMAGE ID         
lzheng/myimages      1.0        37af1236adef 
```
容器命令
```shell
  #查看正在运行的容器
  docker ps
                  -a #查看历史运行过的
                  -n x #查看最近x个运行的容器 
  
  #软停止或启动容器
  docker stop xxxx
  docker start xxxx
  
  #强行停止容器
  docker kill xxxx
  
  #查看容器信息
  docker inspect xxx
```
数据卷

```shell

  docker run -itd -v 宿主机绝对路径:容器内路径 镜像名
  docker run -itd -v /root/myfile:/myfile:ro  xxxx
  #xxx的数据卷继承自zzzz容器
  docker run -itd -volumesfrom zzzz  xxxx
   
  # ro表示容器只读宿主机文件 
````