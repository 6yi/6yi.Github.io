---
title: Java动态代理
date: 2019-01-08 07:49:00
categories: java
urlname: 39
tags:
---
<!--markdown-->Java动态代理有两种方式:
1.使用jdk提供的接口对象实现动态代理
```java
javadev javadev=new javadev();
dev javadev2=(dev)Proxy.newProxyInstance(javadev.getClass().getClassLoader(),
             javadev.getClass().getInterfaces(),
             ((proxy, method, args) -> {
                 if (method.equals("code")){
                     System.out.println("yes");
                     method.invoke(new javadev(),args);
                 }
         return null;
     }));
```
此方法生成的也是接口对象

2.使用cglib提供的子类代理对象

```java
UsrServiceImpl usrService=(UsrServiceImpl) Enhancer.create(UsrServiceImpl.class, new MethodInterceptor() {
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        Object result=null;
        if (method.getName().equals("get")){
            result=method.invoke(service,objects);
            System.out.println("------get-------");
        }
        return result;
    }
});

```

动态代理是理解AOP的关键,框架的底层靠的就是反射和动态代理

