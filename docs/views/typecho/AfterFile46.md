---
title: 阿里云rabbitMQ镜像的巨坑
date: 2020-01-06 06:15:17
categories: linux
urlname: 131
tags:
---
<!--markdown-->不多说了，坑啊
阿里云镜像仓库下载的rabbitMQ是没有自带控制台的，当你去访问管理页面的时候就会发现空空如也

解决这个问题只需要下载rabbitMQ插件就好了
```shell
#进入docker容器内部
docker exec -it ID

# 安装控制台插件
rabbitmq-plugins enable rabbitmq_management
```


完事。