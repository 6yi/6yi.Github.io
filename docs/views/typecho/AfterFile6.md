---
title: frp+ss搭建内网VPN
date: 2019-12-21 11:04:00
categories: linux
urlname: 60
tags:
---
<!--markdown-->frp是内网穿透工具,ss是代理工具,这两个组合起来就可以做成一个内网VPN,具体应用场景嘛,那就是在外访问学校内网啥的了...

#### 废话不多说了,先在客户端上配置一下frp

```ini
[common]
#绑定服务端
server_addr = 59.110.173.180
server_port = 12345

#启用tcp或者UDP看你自己心情,我感觉tcp好点,UDP可能丢包
[ssr]
type = tcp
#远程端口
remote_port = 2333
#你本地的代理工具暴露的接口
local_port = 2333
```



#### 代理的工具配置

这里我用的是ss(Shadowsocks),你也可以用其它的代理工具,比如openVPN,V2ray啥啥的,看你的选择吧,我图方便就用的Python版本

先安装一下python版本的ss服务端

```shell
pip install shadowsocks
```

然后就可以在*\\python3.8\\Scripts\\目录下找到找到ssserver.exe了

我们在当前目录下创建一个ss的配置文件,这些配置我就不多说了

```json
{
    "server":"0.0.0.0",
    "server_port":2333,
    "local_address": "127.0.0.1",
    "local_port":2333,
    "password":"9054",
    "timeout":300,
    "method":"RC4-MD5",
    "fast_open": false
}
```



之后先启动frp,再启动ss,然后就完事了
看图,是可以访问到学校内网的,也可以访问到自己的路由器管理页面
![微信截图_20191221190537.png][1]


  [1]: http://59.110.173.180/usr/uploads/2019/12/3926081252.png