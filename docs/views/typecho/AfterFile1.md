---
title: Dockerfile
date: 2019-12-26 10:44:00
categories: linux
urlname: 90
tags:
---
<!--markdown-->Dockerfile是用来构建Docker镜像的构建文件,是由一系列命令和参数构成的脚本

Dockerfile保留字:
```shell
# 基础镜像,当前镜像的父镜像
FROM

#镜像维护者的信息
MAINTAINER

#容器运行时的shell命令
RUN

#暴露的端口
EXPOSE

#进入容器时的默认目录
WORKDIR

#设置镜像内的环境变量
ENV

# 将文件添加进镜像会解压tar包和处理URL
ADD

# 同ADD一样,但是不会解压tar包,默认优先使用COPY
COPY

#容器数据卷,持久化
VOLUME 

#容器启动时运行的命令,多条CMD只会运行最后一条
CMD

#同CMD,但是可以追加
ENTRYPOINT

#子镜像继承时候运行的命令
ONBUILD
```

Tomcat的Dockerfile启动实例,先用wget去下载tomcat和java
```shell
#下载java的时候直接用wget会被重定向而下载失败,需要加上这几个参数
wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie"  xxxxx
```

```shell
FROM centos
MAINTAINER lzheng<lzheng@outlook.com>
#添加jdk和tomcat进容器
ADD apache-tomcat-9.0.30.tar.gz /tomcat
ADD jdk-13.0.1_linux-x64_bin.tar.gz /java
#设置环境变量
ENV JAVA_HOME /java/jdk-13.0.1
ENV CLASSPATH $JAVA_HOME/lib/dt.jar;$JAVA_HOME/lib/tool.jar
ENV CATALINA_HOME /tomcat/apache-tomcat-9.0.30
ENV CATALINA_BASE /tomcat/apache-tomcat-9.0.30
ENV PATH $PATH;$JAVA_HOME/bin;$CATALINA_HOME/lib;$CATALINA_HOME/bin

#启动tomcat
CMD ./tomcat/apache-tomcat-9.0.30/bin/startup.sh 

```