---
title: Java单例模式(DCL懒汉式,枚举式)
date: 2020-04-21 16:03:24
categories: linux
urlname: 215
tags:
---
<!--markdown-->java单例模式的写法有很多种,最常见的比如懒汉式,饿汉式,下面记录2种比较安全的饿汉式写法

```java
public class demo {
    private static volatile demo demo;
    private static boolean INSTANCE=false;
    private demo() {
        synchronized (demo.class){
            if (!INSTANCE){
                INSTANCE=true;
            }else{
                throw new RuntimeException("不要试图使用反射破坏单例");
            }
        }
    }
    public static demo getInstance(){
        if (demo==null) {
            synchronized (demo.class){
                if (demo==null){
                    demo=new demo();
                }
            }
        }
        return demo;
    }
}
```

因为new这个操作并不是原子性的,所以加上**volatile**关键字用来防止指令重排,并且使用INSTANCE标志位来防止反射破坏,但是这种写法还是会被反射破坏,当只用反射来创建实例的时候,INSTANCE标志位就不起作用了,那么还有一种枚举式的单例,会更加安全一些



```java
public class Demo {
    //私有化构造函数
    private Demo(){ }
 
    //定义一个静态枚举类
    static enum SingletonEnum{
        //创建一个枚举对象，该对象天生为单例
        INSTANCE;
        private Demo demo;
        //私有化枚举的构造函数
        private SingletonEnum(){
            demo=new Demo();
        }
        public Demo getInstnce(){
            return demo;
        }
    }
 
    //对外暴露一个获取Demo对象的静态方法
    public static Demo getInstance(){
        return SingletonEnum.INSTANCE.getInstnce();
    }
}
```

因为jvm不允许反射枚举类型,所以此方法的安全更高,实际上是JVM隐藏了枚举类型的有参构造器,如果对该类进行反编译的话,还是可以反射得到枚举类型