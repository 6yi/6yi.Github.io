---
title: Frp内网穿透
date: 2019-12-15 06:56:00
categories: linux
urlname: 58
tags:
---
<!--markdown-->Frp是一个用go语言编写的高性能内网穿透工具,使用的前提是你得有一台拥有公网IP的服务器,然后当你访问这个公网ip的时候,他会把内网机器的资源转发给你

#### 配置服务端

```ini
vi frps.ini //打开服务端配置文件

#常规配置
[common]
# server_addr 为 FRP 服务端的公网 IP
server_addr = 59.110.173.180
# server_port 为 FRP 服务端监听的端口
server_port = 7000
#token验证
token = 12345678

#这个是frp提供的监控面板
dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = admin

#Web站点配置
[web]
#绑定的端口,当访问你公网IP的8089端口时
vhost_http_port = 8089
```



#### 配置客户端

```ini
#打开frpc.ini文件
[common]
#你的服务器Ip
server_addr = x.x.x.x
#服务端绑定的端口
server_port = 7000
token = 12345678

#web站点配置
[web]
type = http
#服务端设置web的端口
remote_port = 8089
#填127.0.0.1或内网ip都可以,没有这个项都可以
local_ip = 127.0.0.1    
#本地项目的端口
local_port = 8088
#你的域名或者公网ip
custom_domains = 59.110.173.180

#还可以配置ssh
[ssh]
#连接类型，填tcp或udp
type = tcp
#填127.0.0.1或内网ip都可以,有这个项都可以
local_ip = 127.0.0.1
#需要转发到的端口，ssh端口是22
local_port = 22
#远程绑定端口
remote_port = 6000
```



配置完分别在服务器和客户端启动就完事了