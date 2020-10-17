---
title: Vert.x异步访问数据库
date: 2020-04-07 11:01:23
categories: linux
urlname: 209
tags:
---
<!--markdown-->

   根据官方手册,先添加**vertx-mysql-postgresql-client**这个jar包

Maven:

```xml
<dependency>
  <groupId>io.vertx</groupId>
  <artifactId>vertx-mysql-postgresql-client</artifactId>
  <version>3.4.1</version>
</dependency>
```

Gradle

```groovy
compile 'io.vertx:vertx-mysql-postgresql-client:3.4.1'
```

这个jar包中包含了  postgress-async-2.11 和 mysql-async-2.11 ,提供了异步访问数据库的方法



接下来就是写具体代码了,以mysql为例

```java
public class Sql extends AbstractVerticle {
    public static void main(String[] args) {
        //运行
        Vertx.vertx().deployVerticle("com.lzheng.Sql");
    }
    
    @Override
    public void start() throws Exception {
        //填写配置文件,注意,此异步访问方法的配置文件与JDBCClient有些不一样,没有url这个参数
        JsonObject mySQLClientConfig = new JsonObject()
                .put("host", "127.0.0.1")
                .put("username", "root")
                .put("password", "root")
                .put("database", "Pic");
        AsyncSQLClient sqlClient = MySQLClient.createShared(vertx, mySQLClientConfig);
        //方法一:
//        sqlClient.query("select * from photo",ar->{
//            if (ar.succeeded()){
//                ar.result().getColumnNames().forEach(System.out::println);
//            }else{
//                System.out.println(ar.cause());
//            }
//        });
         //方法二:
        sqlClient.getConnection(res->{
            if (res.succeeded()){
                SQLConnection connection = res.result();
                connection.query("select * from photo",result->{
                    if (result.succeeded()){
                        ResultSet result1 = result.result();;
                        result1.getColumnNames().forEach(System.out::println);
                    }
                });
            }else{
                System.out.println(res.cause());
            }
        });
    }
}
```



运行之后发现报错slf4J日志,查找资料,要把slf4J包加入到项目里

添加slf4j到gradle或者maven

```grovvy
 compile 'org.slf4j:slf4j-log4j12:1.7.2'
```



之后运行OK