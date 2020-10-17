---
title: Tcp  可靠数据传输概述
date: 2020-02-25 16:22:00
categories: linux
urlname: 192
tags:
---
<!--markdown-->##### 		tcp在ip层提供不可靠的服务基础上实现了可靠数据传输,具体实现了以下几种机制

> 流水线机制
>
> 滑动窗口
>
> 累积确认
>
> 单一重传定时器
>
> 触发重传事件
>
> > 超时
> >
> > 收到重复ACK



#### 超时时间的设定

因为RTT是变化的,因此测量多个RTT时间(忽略重传),求平均值,获得RTT的估计值 :    **EstimatedRTT**

> EstimatedRTT = (1-α) * EstimatedRTT + α * SampleRTT 
>
> 指数加权移动平均值
>
> α=0.125

在**EstimatedRTT**基础上加上安全边界,安全边界的大小与**EstimatedRTT**和**SampleRTT**差值,即RTT的变化值

>DevRTT = (1-β)  * DevRTT + β * | SampleRTT - EstimatedRTT |
>
>β=0.25

超时时间: **TimeoutInterval**=**EstimatedRTT**+**DevRTT**



#### Tcp发送方事件

从应用层收到数据

>创建Segment
>
>Segment第一个字节的编号是序列号
>
>开始计时器
>
>设置超时时间

超时

>重传引起超时的Segment
>
>重启定时器

收到ACK

>确认未曾确认过的Segment
>
>>更新Sendbase
>>
>>滑动窗口中若还有未确认的分组,重新启动定时器



#### 快速重传机制

tcp中发生超时,超时时间间隔将重新设置,超时时间间隔加倍,重发丢失分组前需要等待过长的时间

通过重复ACK检测分组丢失

>Sender会发送多个分组
>
>如果某个分组丢失,可能会引发多个重发的ACK

如果sender收到对同一数据的3个ACK则假定该数据之后的段已经丢失

>快速重传:在定时器超时之前立刻进行重传



#### 流量控制

接收方为tcp连接分配buffer

Receiver通过再Segment的头部字段将RecvWindow告诉Sender

Sender限制自己已经发送的但还未收到的ACK的数据不超过接收方的空闲RcvWindow尺寸

如果RcvWindow=0,发送方仍可以发送较小的数据段,从而返回RecWindow的信息以避免死锁情况



#### Tcp连接管理

Tcp sender和receiver在传输前需要建立连接

Server:等待客户连接


```java
 ServerSocket serverSocket = new ServerSocket(port);
 Socket socket = serverSocket.accept();
```

Client:连接发起者

```java
 Socket socket = new Socket(host, port);
```

##### 建立连接过程使用三次握手机制

1. client向server发送Syn报文段 , Syn报文段不携带任何数据 ,  但是携带了Syn的标志位,置1,表示需要建立连接,并且传递初始的序列号(有大量机制产生序列号或者伪随机选择)
2. server收到Syn报文段,若是同意则 ,Server为这个连接分配缓存,并且选择这次tcp连接的初始序列号,返回SynAck报文段,标志位1以及server初始序列号,ack字段为client初始序列号+1
3. client收到SynAck报文段,返回一个Ack报文段,syn标志位置0,序列号为server发送过来的期望序列号,ack为server序列号+1

##### 关闭连接过程使用四次握手机制
?1.client向server发送tcp fin
?2.server收到fin报文段,回复ack,发送fin
3.client收到fin,回复ack,进入等待状态,如果收到fin会重新发送ack
4.server收到ack,关闭连接

### 连接示意图
![微信截图_20200226002724.png][1]





### TCP拥塞控制

#### Sender限制发送速率

>rate≈CongWin/Rtt Bytes/sec

#### CongWin(拥塞窗口大小)

>动态调整以改变发送速率
>
>反映所感知到的网络拥塞

#### 网络拥塞的感知

>Loss事件=timeout或者3个重复的ACK

#### 发送速率的调整

##### 加性增---乘性减:AMD
>逐渐增加发送速率,谨慎探测可用带宽,直到发生loss
>发生oss时,直接将CongWin减少为1/2
>AMD:每个RTT将CongWin增大一个MSS---拥塞避免

<img src=' http://59.110.173.180:9090/static/SavePic/529f83552b156410f127867121cabd5b%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200226161409.png '/>

##### 慢启动:SS

TCP建立时,CongWin=1

>例:MSS=500byte
>
>RTT=200msec
>
>初始速率=20kbps

当连接开始时,指数性增长

>每个RTT将CongWin翻倍

<img src='http://59.110.173.180:9090/static/SavePic/6193adf3d2c4265e543271009f0ff4cf微信截图_20200226231823.png'/>

初始速率慢,但是会快速攀升



当CongWin达到LOSS事件前值的1/2时,指数性增长切换为线性增长

Threshold为LOSS事件前值的1/2

<img src='http://59.110.173.180:9090/static/SavePic/2d9b9653a70bf29ea4b8099b3bdd761d%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200226185554.png'/>

##### Loss事件处理

3个重复ACK

>CongWin切到一半,然后线性增长

Timeout事件

>CongWin直接设置为1个MSS,然后指数增长,达到Threhold后线性增长

  [1]: http://59.110.173.180/usr/uploads/2020/02/154934584.png