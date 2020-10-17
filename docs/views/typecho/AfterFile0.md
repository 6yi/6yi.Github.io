---
title:  Json Web Token
date: 2020-05-10 17:08:00
categories: 前端
urlname: 232
tags:
---
<!--markdown-->> Json Web Token简称**JWT**,这是一种后端的令牌验证方式



### 传统混合开发中的验证方式

?		传统混合开发的验证一般是用session和cookie来实现,用户登陆,信息保存在seesion中,浏览器保存一个cookie,调用服务的时候根据cookie获取session就可以进行验证了

?	    而前后端分离之后 ,在安卓和IOS跨域会导致session不一致的问题 , 所以后端不再使用seesion,而是使用token方式进行验证,先由前端登陆,生成token,保存到缓存中,并且发送会前端,前端每次调用服务必须带着token到后端进行验证,验证成功则放行.

#### 流程示意图:

![未命名文件](https://gitee.com/lzhengycy/Pic/raw/master/img/20200511001018.jpg)



#### 		


### JWT验证

?		引用官方来重新介绍一些jwt

>JSON Web Token（JWT）是一个开放的标准（RFC 7519），它定义了一个紧凑且自包含的方式，用于在各方之间以JSON对象安全地传输信息。这些信息可以通过数字签名进行验证和信任。可以使用秘密（使用HMAC算法）或使用RSA的公钥/私钥对来对JWT进行签名。

?		

![image-20200511011028489](https://gitee.com/lzhengycy/Pic/raw/master/img/20200511011029.png)



jwt验证有以下几个操作:

>
>
>用户使用账号和面发出post请求；
>
>服务器使用私钥创建一个jwt；
>
>服务器返回这个jwt给浏览器；
>
>浏览器将该jwt串在请求头中像服务器发送请求；
>
>服务器验证该jwt；
>
>返回响应的资源给浏览器。



### Jwt的组成

> 头部（header）、载荷（payload）、签证（signature）

头部（header）

?		头部有两个信息,一个是加密算法类型,还有声明它是jwt

```json
{
    "typ":"JWT",
    "alg":"HS256"
}
```

头部经由base64加密,会变成类似:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9



### 载荷（payload）

该部分一般存放一些有效的信息和状态信息。jwt的标准定义包含五个字段：

>- `iss`：该JWT的签发者
>- `sub`: 该JWT所面向的用户
>- `aud`: 接收该JWT的一方
>- `exp(expires)`: 什么时候过期，这时间戳
>- `iat(issued at)`: 在什么时候签发的

上面的五个字段不是必须的,除此之外还可以定义自己需要的状态信息,比如用户名等

这部分也是由base64加密,

### 签证（signature）

该部分是使用header (base64后的)+payload (base64后的)+加盐值+HS256加密后的数据

简单的说这部分就是由前面两个部分的base64值经过 加盐 HS256加密后形成的,加盐值当然不会让其它人知道,如果其他人得知了,那就可以自我签发jwt了,加密就没卵用了

### 验证过程

后端获取到jwt数据是类似这种  xxxx.xxx.xxx三段格式的,我们需要做的是将第一段和第二段的数据用盐加密,再于第三段的签证对比

如果一样则表示数据没有被修改过,我们直接用base64解密第二段,获取里面的参数

如果不一样,则表示数据被改动过,直接返回错值

### 下面是一个springBoot+JWT的整合Demo

<a href='https://github.com/6yi/SpringJWTDemo'>SpringBoot+JWT的简单Demo</a>


