---
title: laravel模型获取字段时的坑
date: 2019-10-19 17:03:00
categories: php
urlname: 5
tags:
---
<!--markdown-->  laravel的模型如果你的主键没有设为自增 , 但是你去获取属性的话会给你报一个警告 ,  但是他娘的这个警告跟错误一样直接会导致php脚本停止运行 , 出现  Illegal offset type  这个错误 ,解决办法就是将 $incrementing设为false.
   这个坑是真的恶心 , 卡了我两三天 , 网上laravel的资料又少 ,  爷真是佛了 .
![tin.jpg][1]


  [1]: http://59.110.173.180/usr/uploads/2019/12/3184715557.jpg