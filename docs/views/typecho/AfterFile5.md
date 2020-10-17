---
title: Dubbo(2.7.7)+Zookeeper+Nacos
date: 2020-07-04 07:34:43
categories: linux
urlname: 244
tags:
---
<!--markdown-->
Dubbo是阿里出品的一款高性能RPC通信框架 , 可用在微服务架构中服务之间的调用 , 并且集成了许多功能特性,包括负载均衡,监控等.
Dubbo支持的注册中心有很多,其中比较常用的是Zookeeper,eureka,其中eureka已经宣布暂停维护,Zookeeper因为他本身并不是设计用于注册服务的,只是他的一些CP特性所以可以用于当做注册中心,但是缺少了很多注册中心应有的功能,所以阿里又推出了一款支持AP+CP的注册中心-----**Nacos**
**
**
**Dubbo+Zookeeper**
**
**接口包**
首先创建一个接口包,因为Dubbo是基于接口实现服务,调用的时候传的是**接口名**
![image.png](https://cdn.nlark.com/yuque/0/2020/png/1605950/1593845948674-e305ad3e-1964-4e80-bebc-c7b092f1da11.png#align=left&display=inline&height=228&margin=%5Bobject%20Object%5D&name=image.png&originHeight=456&originWidth=649&size=38813&status=done&style=none&width=324.5)
直接创建一个普通的maven项目即可,在service定义好接口以及需要的实体类型,然后离用maven的install功能安装到本地仓库


**服务提供者**
这里可以选择多种方式,你可以直接使用SpringBoot的starter,也可以用Spring的IOC容器,我就两种都演示一下


**SpringBoot**
**
创建一个springBoot项目
![image.png](https://cdn.nlark.com/yuque/0/2020/png/1605950/1593846211614-0b147800-913f-4353-99a2-70e7b9aba7a9.png#align=left&display=inline&height=228&margin=%5Bobject%20Object%5D&name=image.png&originHeight=455&originWidth=566&size=24869&status=done&style=none&width=283)
pom.xml文件需要额外引入的包
```xml
 			//springBoot  Starter
			<dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
        </dependency>
			//zookeeper
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-dependencies-zookeeper</artifactId>
            <type>pom</type>
            <exclusions>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-log4j12</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
			
				//前面的接口包
        <dependency>
            <artifactId>DubboSpringApi</artifactId>
            <groupId>com.dubbo.lzheng</groupId>
            <version>3.0</version>
        </dependency>
```
配置文件
```yaml
# 服务名称
spring.application.name=dubbo-provider
# 协议名称
dubbo.protocol.name=dubbo
# dubbo端口,-1为随机
dubbo.protocol.port=-1
# 注册中心地址
dubbo.registry.address=zookeeper://127.0.0.1:2181
server.port=8080
```


实现接口
```java
@DubboService
@Component
public class UserServiceImpl implements UserService {
    @Override
    public User getUser() {
        User user = new User();
        user.setName("刘正");
        user.setAge("21");
        return user;
    }
}
```


启动
```java
@SpringBootApplication
@EnableDubbo(scanBasePackages = "com.lzheng.provider.service") //扫描dubbo暴露的服务
public class ProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
}

```


**Spring**
直接创建一个maven项目
**![image.png](https://cdn.nlark.com/yuque/0/2020/png/1605950/1593846676073-f4dbf043-7391-4480-8e25-ba883aca7e54.png#align=left&display=inline&height=207&margin=%5Bobject%20Object%5D&name=image.png&originHeight=415&originWidth=372&size=21368&status=done&style=none&width=186)**
pom中引入spring主体以及Dubbo和Zookeeper
```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>DubboXML</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>

<!----------------------------------Dubbo以及zookeeper--------------------------------------->
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.7.7</version>
        </dependency>
         <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-dependencies-zookeeper</artifactId>
            <type>pom</type>
             <version>2.7.7</version>
            <exclusions>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-log4j12</artifactId>
                </exclusion>
            </exclusions>
        </dependency>            
        <dependency>
            <artifactId>DubboSpringApi</artifactId>
            <groupId>com.dubbo.lzheng</groupId>
            <version>3.0</version>
        </dependency>
        
             
<!---------------------------------Spring----------------------------------------->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>4.3.13.RELEASE</version>
        </dependency>
    </dependencies>

</project>
```


实现接口(这里和SpringBoot的操作一模一样的)
略.....................


Spring的bean文件
```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd        http://dubbo.apache.org/schema/dubbo        http://dubbo.apache.org/schema/dubbo/dubbo.xsd">
    
    <dubbo:application name="dubbo-provider-xml-demo"  />
    <dubbo:application name="demo-provider"/>
    <dubbo:registry address="zookeeper://127.0.0.1:2181"/>
    <dubbo:protocol name="dubbo" port="-1"/>
    //实体类
    <bean id="UserServiceImpl" class="com.lzheng.service.UserServiceImpl"/>
    //dubbo暴露的服务
    <dubbo:service interface="com.lzhengDubbo.api.service.UserService" ref="UserServiceImpl"/>
    
</beans>
```


加载bean文件启动
```java
public class Application {
    public static void main(String[] args) throws IOException {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        context.start();
        System.in.read();
    }
}
```


如上述无意外,则成功注册到Zookpeer中




**服务消费者**
这部分就比较简单了,直接调用就好,我就演示springBoot集成的


首先还是创建SpringBoot项目


pom.xml额外添加以下的包
(跟上面一样的其实,就是dubbo+zookeeper+接口包)
```xml
		   <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
      </dependency>   
			<dependency>
            <artifactId>DubboSpringApi</artifactId>
            <groupId>com.dubbo.lzheng</groupId>
            <version>3.0</version>
      </dependency>
      <dependency>
        <groupId>org.apache.dubbo</groupId>
        <artifactId>dubbo-dependencies-zookeeper</artifactId>
        <type>pom</type>
        <exclusions>
          <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
          </exclusion>
        </exclusions>
      </dependency>
```


调用暴露的服务我们只需要加上个**@DubboReference**注解即可
```java
@RestController
public class UserController {

    @DubboReference
    private UserService userService;

    @GetMapping("/hello")
    public User getUser(){
        return userService.getUser();
    }
}
```
然后就是启动了,当我们访问/hello的时候,返回的是调用的服务结果




**Dubbo+Nacos**
因为前面把整合的内容都说完了,所以这部分就没什么好说的了,就是引入Nacos的包,并替换一下Nacos协议即可,其它地方不需要改动

例:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd        http://dubbo.apache.org/schema/dubbo        http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <dubbo:application name="dubbo-provider-xml-demo"  />
    <dubbo:application name="demo-provider"/>
  
  	//替换成Nacos协议
    <dubbo:registry address="nacos://192.168.233.1:8848"/>
  
    <dubbo:protocol name="dubbo" port="-1"/>
    <bean id="UserServiceImpl" class="com.lzheng.service.UserServiceImpl"/>
    <dubbo:service interface="com.lzhengDubbo.api.service.UserService" ref="UserServiceImpl"/>

</beans>
```


以上就是简单整合Dubbo的注册中心.




























