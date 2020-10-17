---
title: SpringBoot整合MyBatis(XML)
date: 2019-12-11 01:55:16
categories: java
urlname: 53
tags:
---
<!--markdown-->#####   最近在复习springBoot,以前跟着雷丰阳教程看源码的时候云里雾里的,现在能看懂了!(屁话,本来复习就是奔着源码过去的),还是挺开心的,下面记录一下用springBoot整合Mybatis


#### Maven

```xml
 <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.18</version>
  </dependency>
  <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>1.1.1</version>
  </dependency>
```
这两个依赖是必导入的



#### 配置文件
```properties
mybatis.mapper-locations=classpath*:mapper/*.xml  #你的mapper.xml地址
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/laravel?serverTimezone=GMT 
# mysql8需要加上serverTimezon
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
#这里要注意,别写成了spring.datasource.data-username
spring.datasource.password=1234
mybatis.type-aliases-package=com.lzheng.demo.domain 
#实体类位置
```

#### 开启注解扫描

```java
@SpringBootApplication
@MapperScan("com.lzheng.demo.dao") //扫描你的dao注解
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

这样就完成了xml方式的整合mybatis



另外推荐大家使用MyBatis plugin这个插件,非常好用,一键生成实体类,dao类,mapper文件
