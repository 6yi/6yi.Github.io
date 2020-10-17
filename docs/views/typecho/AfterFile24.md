---
title: Netty WebSocket注意事项
date: 2020-03-28 05:21:00
categories: 前端
urlname: 208
tags:
---
<!--markdown-->今天用Netty写WebSocket一不小心就踩了个坑

情景是这样的,前端给后端发送数据,后端再回显回去



使用原生WebSocket

```javascript
export default {
	name: 'App',
	methods: {
     initWebSocket(){ //初始化weosocket
        const wsuri = `ws://127.0.0.1:7000/websocket`
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接成功
        this.websocketsend("lzheng",0,"test")
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket()
      },
      websocketonmessage(e){
        let _this = this //数据接收
		const redata = JSON.parse(e.data);
		console.log(redata)
      },
      websocketsend(sendUser,state,content){//数据发送
		var sendMsg="{'sendUser':'"+sendUser+"','state':'"+state+"','content':'"+content+"'}"
        this.websock.send(sendMsg)
      },
      websocketclose(e){  //关闭
        console.log('断开连接', e)
      }
    }
}
```

现在就是后端给前端回显数据,前端接收不到,一直以为是前端写的有问题,后来发现是后端那里有问题,后端代码是这样的

```java
 private void sendMsg(ChannelHandlerContext channelHandlerContext, Message rtMessage) {
        if (channelMap.containsKey(rtMessage.getSendUser())){
            Channel channel = channelMap.get(rtMessage.getSendUser());
            if (channel!=null){
                Message message = new Message(rtMessage.getSendUser(), Message.OK, rtMessage.getContent());
                channel.writeAndFlush(JSON.toJSONString(message));
                System.out.println("发送数据为:"+JSON.toJSONString(message));
            }else{
                Message message = new Message(rtMessage.getSendUser(), Message.USER_NO_CONNECTION, "用户未上线");
                channelHandlerContext.channel().writeAndFlush(message);
            }
        }
    }
```

```text
接收的消息:{'sendUser':'lzheng','state':'0','content':'test'}
lzheng注册成功
接收的消息:{'sendUser':'lzheng','state':'1','content':'hha'}
发送数据为:{"content":"hha","sendUser":"lzheng","state":200}
```

用了Print调试法,发现数据是正常收发的,那前端为什么收不到呢

原因就在于,Nio收发是靠数据包的,并不能直接发送文本数据

就是需要用到**Unpooled.copiedBuffer**,这本是Nio最基本的知识,我却一下子没记住,给直接发送文本过去,所以肯定不行了



并且Netty提供了一个专门用于发送WebSocket的包装类(**TextWebSocketFrame**),我们直接拿来用就好了,所以发送语句修改为如下:

```java
 channel.writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(message)));
```



这样就能正常接收了.