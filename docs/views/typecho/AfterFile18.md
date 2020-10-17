---
title: JUC学习--锁
date: 2020-04-21 15:43:31
categories: linux
urlname: 213
tags:
---
<!--markdown-->
### CAS自旋锁

	 CAS：Compare and Swap，即比较再交换。 

CAS是一种乐观锁,比较当前值和期望值,如果相等则修改内存地址,CAS调用的是native方法

**缺点：** 

1、 循环会耗时 

2、一次性只能保证一个共享变量的原子性 

3、ABA问题(用版本控制来解决)

用CAS简单实现一个自旋锁

```java
public class CasLock {
   private AtomicReference<Thread> atomicReference = new AtomicReference<>();
    public void lock(){
        Thread thread = Thread.currentThread();
        while (!atomicReference.compareAndSet(null,thread)){
            //自旋
        }
    }
    public void unlock(){
        Thread thread = Thread.currentThread();
        atomicReference.compareAndSet(thread,null);
    }
}
```

顺带一提,CAS锁在数据库操作中比较常见

```sql
select number from ticket; --number =2   查询票余数量,number=2
update ticket set number=1 where number=2  --修改票数为1,当票数等于2的时候
```

这样写的话还会有ABA问题,解决这个的方法就是加入版本控制

```sql
select number,version from ticket;
update ticket set number=1,version=3 where number=2 and version=3
```

实际开发中可以写成这样

```sql
update ticket
set number=number-1
where number - 1 > 0
```





#### 可重入锁

可重入锁也叫递归锁,即获取了一把锁,剩下的锁都能够获取到,直接看代码比较直观

```java
public class rlock {
    ReentrantLock lock=new ReentrantLock();
    public  void demo(){
        lock.lock();
        try {
            TimeUnit.SECONDS.sleep(5);
           demo2();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
    public void demo2(){
        lock.lock();
        try {
            System.out.println(Thread.currentThread().getName());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        rlock rlock = new rlock();
        new Thread(()->{
            rlock.demo();
        },"A").start();
        TimeUnit.SECONDS.sleep(1);
        new Thread(()->{
            rlock.demo2();
        },"B").start();
    }
}

```

输出结果:

```cmd
A
B
```

这个结果就是当A线程从获取到demo1中获取到锁,demo2中的锁也获取到了,所以线程B的demo2获取不到锁,得先让A释放demo2的锁,线程B才能获取





### 读写锁

读写锁提供了读写两个不同的粒度,

是排他锁, 写的时候不能读 , 读的时候不能写

但是写的时候只有一个线程能写,读的时候可以允许多个线程去读,防止脏读,幻读

```java
class cache{
    private volatile HashMap<String,String> hashMap=new HashMap<>();
    private ReadWriteLock lock=new ReentrantReadWriteLock();
    public void put(String key,String value){
        lock.writeLock().lock();
        try {
            System.out.println("写入"+key);
            hashMap.put(key, value);
            System.out.println(key+"写入OK");
        }catch (Exception e){

        }finally {
            lock.writeLock().unlock();
        }
    }
    public void get(String key){
        lock.readLock().lock();
        try{
            System.out.println(hashMap.get(key));
        }catch (Exception e){

        }finally {
            lock.readLock().unlock();
        }
    }
}
```



### 公平锁和非公平锁

公平锁:十分公平,先来后到

非公平锁:可以插队

默认使用非公平锁,难免有些线程会耗时

```java
public ReentrantLock() { 
    sync = new NonfairSync();
}
public ReentrantLock(boolean fair) { 
    sync = fair ? new FairSync() : new NonfairSync();
}
```

