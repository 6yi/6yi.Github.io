---
title: Nginx将域名反向代理到国内主机,免备案
date: 2019-12-13 07:34:00
categories: linux
urlname: 54
tags:
---
<!--markdown-->#### 		域名想要解析到国内机房的话必须在服务器厂商处备案, 而我就遇到了麻烦的情况,备案老是不给通过,刚好手里还有一台ssr服务器,于是就想到了用Nginx反向代理的方法,将域名绑定到国内主机上.



#### 	这个就是利用国外机房不用备案的特点,我把域名先解析到国外机房,在反向代理到国内主机上,我们只需要在Nginx的配置文件里进行修改就完事了



#### 打开nginx的配置文件

```
vi nginx.conf

```

#### 添加proxy_pass http://x.x.x.x;(你需要反向代理的IP)

#### proxy_set_header    X-Real-IP   $remote_addr;

```java
server {
        listen       80;
        server_name  X.X.X.X;此服务器的IP

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass http://x.x.x.x;
            proxy_set_header    X-Real-IP   $remote_addr;
            root   html;
            index  index.html index.htm;
  }
```
完事,重启nginx,就可以完成了,非常的简单.

Nginx牛逼

