---
title: Linux下的php安装
date: 2019-10-04 05:54:00
categories: linux
urlname: 28
tags:
---
<!--markdown-->首先去下载php的源码压缩包
```java
wget -c http://php.net/get/php-7.0.11.tar.gz/from/a/mirror

//解压
tar zxvf php-7.0.11.tar.gz
cd php-7.0.11.tar.gz
```
配置安装变量(其实这一坨我也不知道具体的作用..)

```java
./configure --prefix=/usr/local/php7.3 --with-curl --with-freetype-dir --with-gd --with-gettext --with-iconv-dir --with-kerberos --with-libdir=lib64 --with-libxml-dir --with-mysqli --with-openssl --with-pcre-regex --with-pdo-mysql --with-pdo-sqlite --with-pear --with-png-dir --with-jpeg-dir --with-xmlrpc --with-xsl --with-zlib --with-bz2 --with-mhash --enable-fpm --enable-bcmath --enable-libxml --enable-inline-optimization --enable-gd-native-ttf --enable-mbregex --enable-mbstring --enable-opcache --enable-pcntl --enable-shmop --enable-soap --enable-sockets --enable-sysvsem --enable-sysvshm --enable-xml --enable-zip

## /usr/local/php 是安装的路径
```
编译源码
```java
make
##这一步要等很久

##.............

##好了之后会问你记得测试一遍,那我们就测试一遍吧

make test

##一样要等很久

##...............

make install
```

配置php
```java
cp /usr/local/php-7.0.11/php.ini-development /usr/local/php/php.ini    //这里填写你自己解压好的路径
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf

配置php.ini “cgi.fix_pathinfo=0”
PS:vim查找指令是先按一下/,再输入查找字符并且回车

//启动PHP-FPM
/usr/local/php/sbin/php-fpm

```
配置nginx关联PHP
```java
vi /usr/local/nginx/conf/nginx.conf

打开loaction ~* \.php

修改fastcgi_param的/scripts为$document_root

location ~* \.php$ {
        root           html;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
```

其实我是想用docker来配置的,师兄叫我手动配一遍比较好,第一次配也是挺麻烦的
