---
title: JVM类加载
date: 2020-04-09 12:07:00
categories: java
urlname: 211
tags:
---
<!--markdown-->?	JVM类加载分为三个部分

>加载
>
>连接
>
>初始化

### 加载

加载过程主要进行了三个操作

1.通过类的全限定类名来获取该类的二进制字节类

2.将字节类的静态存储结构转为方法区的运行时数据结构

3.在堆中生成此类的 **java.lang.Class** 对象 作为访问元空间这些数据结构的入口 



?	双亲委派机制&沙箱安全机制:  当一个类加载器收到了加载某类的请求时,该类加载器会把这个请求委派给父类加载器,直到获取不到父类加载器,才会尝试自己加载,如果不能加载该类则会往下委托下层的加载器

#### jvm提供了三种系统加载器：

>1. 启动类加载器（Bootstrap ClassLoader）：C++实现，在java里无法获取，**负责加载/lib**下的类。
>2. 扩展类加载器（Extension ClassLoader）： Java实现，可以在java里获取，**负责加载/lib/ext**下的类。
>3. 系统类加载器/应用程序类加载器（Application ClassLoader）：是与我们接触对多的类加载器，我们写的代码默认就是由它来加载，ClassLoader.getSystemClassLoader返回的就是它。



双亲委派代码实现:

```java
protected Class<?> loadClass(String name, boolean resolve)
    throws ClassNotFoundException
    {
    	// 同步上锁
        synchronized (getClassLoadingLock(name)) {
            // 先查看这个类是不是已经加载过
            Class<?> c = findLoadedClass(name);
            if (c == null) {
                long t0 = System.nanoTime();
                try {
                	// 递归，双亲委派的实现，先获取父类加载器，不为空则交给父类加载器
                    if (parent != null) {
                        c = parent.loadClass(name, false);
                    // 前面提到，bootstrap classloader的类加载器为null，通过find方法来获得
                    } else {
                        c = findBootstrapClassOrNull(name);
                    }
                } catch (ClassNotFoundException e) {
                }

                if (c == null) {
                    // 如果还是没有获得该类，调用findClass找到类
                    long t1 = System.nanoTime();
                    c = findClass(name);

                    // jvm统计
                    sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                    sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                    sun.misc.PerfCounter.getFindClasses().increment();
                }
            }
            // 连接类
            if (resolve) {
                resolveClass(c);
            }
            return c;
        }
    }
```

双亲委派机制确保了jdk官方类的唯一性

### 连接

连接分为校验,准备,解析

#### 校验

?	校验为了确保Class文件的字节流中的信息符合JVM规范,主要进行一下校验

>1. 文件格式验证：基于字节流验证。 (开头标识为:CAFE BABE)
>2. 元数据验证：基于方法区的存储结构验证。
>3. 字节码验证：基于方法区的存储结构验证。
>4. 符号引用验证：基于方法区的存储结构验证。

#### 准备

?	 在方法区中给类的类变量(static修饰)分配内存，然后初始化其值，如果类变量是常量，则直接赋值为该常量值否则为java类型的默认的零值。 

#### 解析

 把类型中的符号引用转换为直接引用。 

主要有以下四种：

>1. 类或接口的解析
>2. 字段解析
>3. 类方法解析
>4. 接口方法解析

### 初始化

?	 这个阶段才真正开始执行java代码，静态代码块和设置变量的初始值为程序员设定的值。 

 	JVM首先加载class文件，静态代码段和class文件一同被装载并且只加载一次 

?	众所周知,类加载完了并不是一定会初始化,比如我不new对象,那他就不会初始化,在下面5中情况下,类才会被初始化

#### 主动引用

1.new对象

2.读取或者设置类的静态属性

3.用反射对没有初始化过的类进行调用

4.如果该类的父类没有被初始化,则会先初始化该父类

5.程序入口那个类(启动main方法的类)

#### 被动引用(不会发送初始化)

1.子类访问父类的静态变量

2.通过数组定义的类  A[] a=new A[10];

3.引用常量 final

#### 子类和父类的初始化顺序

>   1.首先初始化父类的static变量和static块，按出现顺序；
>
>   2.初始化子类的static变量和static块，按出现顺序；
>
>   3.初始化父类的普通变量和构造块，按出现顺序，然后调用父类的构造函数；
>
>   4.初始化子类的普通变量和构造块，按出现顺序，然后调用子类的构造函数。

