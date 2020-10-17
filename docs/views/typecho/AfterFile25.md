---
title: Nginx安装
date: 2019-11-24 05:32:00
categories: linux
urlname: 18
tags:
---
<!--markdown-->安装没啥好说的,先用wget下载压缩包              
(注:我使用的linux发行版本为centOS,如果使用的是Debian或者其它系列发行版本那就换成相对于的包管理命令如:apt-get,pacman等等)

```java
##安装前还是先装一下依赖吧,怕你们的服务器没有装好这些依赖.

//安装依赖
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel


wget http://nginx.org/download/nginx-1.13.7.tar.gz

```
解压并且编译安装
```java
//解压
tar -xvf niginx-xxx.tar.gz

//进入解压目录
cd niginx-xxxx

./configure

make&&make install
```
到这里就基本安装好了,我们接下来对niginx进行一下端口配置
```java
//打开niginx的配置文件
vi /usr/local/nginx/conf/niginx.conf
//会得到下面的配置信息
```
配置信息
```java
#user  nobody;
worker_processes  1;


#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;


#pid        logs/nginx.pid;




events {
    worker_connections  1024;
}




http {
    include       mime.types;
    default_type  application/octet-stream;


    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';


    #access_log  logs/access.log  main;


    sendfile        on;
    #tcp_nopush     on;


    #keepalive_timeout  0;
    keepalive_timeout  65;


    #gzip  on;


    server {
        listen       8090; //这个是你需要配置的端口,你也可以配置多个server
        server_name  59.110.173.180;


        #charset koi8-r;


        #access_log  logs/host.access.log  main;

        #网站根目录
    
        location / {  
            root   html;
            index  index.html index.htm;
        }


        #error_page  404              /404.html;


        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
       location = /50x.html {
            root   html;
        }


        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}


        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
```
配置完成就可以启动了
```java
##启动
/usr/local/nginx/sbin/nginx -s reload
##如果出现这玩意
##nginx: [error] open() "/usr/local/nginx/logs/nginx.pid" failed (2: No such file or directory)
##使用下面的指令绑定一下niginx的配置文件
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```
输入服务器地址和配置的端口就可以看见相应的画面了
![Image.png][1]


  [1]: http://59.110.173.180/usr/uploads/2019/12/3579106226.png