---
title: Layui 弹出层子层获取父层数据
date: 2020-02-05 04:53:00
categories: 前端
urlname: 169
tags:
---
<!--markdown-->##### 前几天在使用Layui弹出层的时候遇到子层获取父层数据却不知道咋获取的问题,官方文档也没有说明,自己找了好久资料才找到了,现在记录一下



##### 场景是这样的,上传文件成功之后返回json数据,并且打开一个弹出层,弹出层需要获取刚刚的json数据

```javascript
<script type="text/javascript">
    var json;
    layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;
        upload.render({
            elem: '#up'
            ,method:"POST"
            ,field:"file"
            ,url: 'http://localhost/upload'
            ,done: function(res){
                json=res
                if (res.code==0){
                    layer.msg('上传失败');
                }else{
                    layer.open({
                        type: 2,
                        area: ['800px', '250px'],
                        fixed: false, 
                        maxmin: true,
                        content: '../static/layui/succeed.html',
                    });
                }
            }
        });
    });
</script>
```

##### 这里要注意的就是要首先定义一个全局变量,比如我的var json



#### 然后只需要在弹出层里用parent.变量名  就能获取到父层的数据了

```javascript
<script>
    layui.use(['layer','jquery'],function () {
        data=parent.json.Data
    })
</script>
```
##### 如图正常获取到数据
<img src="http://59.110.173.180:9090/static/SavePic/3bae6f5f7cb067da8d2cd1a32ec3abca微信截图_20200205125103.png"/>