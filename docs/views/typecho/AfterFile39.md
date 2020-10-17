---
title: volatile关键字
date: 2020-04-22 08:54:00
categories: java
urlname: 217
tags:
---
<!--markdown-->Java的volatile关键字主要有这三个特定

>1.保证变量的可见性
>
>2.不保证原子性
>
>3.禁止指令重排



提到可见性,就要从JMM开始讲,JMM就是Java memory model的意思,  java内存模型
#### 基本概念

- JMM 本身是一种抽象的概念并不是真实存在，它描述的是一组规定或则规范，通过这组规范定义了程序中的访问方式。
- JMM 同步规定
  - 线程解锁前，必须把共享变量的值刷新回主内存
  - 线程加锁前，必须读取主内存的最新值到自己的工作内存
  - 加锁解锁是同一把锁
- 由于 JVM 运行程序的实体是线程，而每个线程创建时 JVM 都会为其创建一个工作内存，工作内存是每个线程的私有数据区域，而 Java 内存模型中规定所有变量的储存在主内存，主内存是共享内存区域，所有的线程都可以访问，但线程对变量的操作（读取赋值等）必须都工作内存进行看。
- 首先要将变量从主内存拷贝的自己的工作内存空间，然后对变量进行操作，操作完成后再将变量写回主内存，不能直接操作主内存中的变量，工作内存中存储着主内存中的变量副本拷贝，前面说过，工作内存是每个线程的私有数据区域，因此不同的线程间无法访问对方的工作内存，线程间的通信(传值)必须通过主内存来完成。

<img src='http://59.110.173.180:9090/static/SavePic/cb59b45e79a2fb0820c506db96527be6微信截图_20200422160122.png'/>

## 可见性

#### 如果不加volatile,那么该变量的可见性是没有的,即副本变量不影响主内存的共享变量,我们可以写个代码测试一下

```java
class Resources{
  	int number=0;
    public void setNumber() {
        this.number = 100;
    }
}
public class demo {
    public static void main(String[] args) throws InterruptedException {
        Resources resources = new Resources();
        new Thread(()->{
            System.out.println("in");
            try {
                TimeUnit.SECONDS.sleep(4);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            resources.setNumber();
        }).start();
        new Thread(()->{
            while (resources.number==0){
            }
            System.out.println("number is:" + resources.number);
        }).start();
    }
}
```

结果:

```cmd
in
进入无线循环.........
```

可见线程一对number进行了修改,但是线程二的number并未发生改变,所以一直卡在循环里,如果我们把number加上**volatile**关键字,那么就会得到一下结果:

```cmd
in
number is: 100
程序退出
```

说明线程一对number的修改通知到了线程二



## 不保证原子性

原子性这个是**volatile**无法保证的,要保证原子性只能通过加锁或者加上**synchronized** 关键字,为什么无法保证原子性呢,很简单,就算是 **int i=1** 这一行代码,他也不是原子性操作,可能你会感觉疑惑,这一个赋值操作都不算原子性吗,真不算,我们可以反编译.class文件,看看他的汇编指令是怎么样的操作

##### 进行反编译

```cmd
javap -c demo2.class
```

##### 得到结果

```java
Compiled from "demo2.java"
public class volatileTest.demo2 {
  public volatileTest.demo2();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: iconst_1
       1: istore_1
       2: return
}
```

分析下面两个操作

```cmd
0:iconst_1   : 将int类型值1压入栈

1: istore_1  : 弹出栈顶元素存入位置1的局部变量中
```

可见这  **int i=1** 其实是进行了两步操作,所以并不是原子性操作,所以volatile本身是无法保证原子性,你得加上**synchronized** 关键字



## 禁止指令重排

我们知道,指令重排其实是编译器对我们代码的一种优化,但是在并发的过程中,如果指令被重排了可能会产生问题,举个简单例子

```java
x,y,a,b默认值为0
    
A线程          B线程
x=a			  y=b
b=1           a=2
    
```

x,y正常结果应该 x或者y必定其中一个是0  是以上的操作,jvm有可能会优化成下面这个样子

```java
A线程          B线程		 
b=1           a=2
x=a	          y=b
```

结果有可能会变成 x=2,y=1,这就比较诡异了

因为这几个赋值操作并没有依赖性,所以可以指令重排,在多线程状态下,他就有可能出错,而**volatile**就禁止了指令重排
