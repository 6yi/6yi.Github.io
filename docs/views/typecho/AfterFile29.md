---
title: Spring+内嵌式tomcat启动(去XML)
date: 2020-09-19 10:46:17
categories: linux
urlname: 246
tags:
---
<!--markdown-->SpringBoot的Tomcat是内嵌的,而SSM的话一般都是由外部Tomcat启动,而Apache他会发布一个tomcat-embed版本,用于内嵌启动,我们可以用这个内嵌的版本和SSM整合,就可以做到和SpringBoot一样的效果了


**添加Spring以及tomcat的jar包**
```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.example</groupId>
  <artifactId>SSM2SpringBoot</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <name>SSM2SpringBoot Maven Webapp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>

      <tomcat.version>8.5.23</tomcat.version>

  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aop</artifactId>
      <version>5.2.2.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.2.2.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.2.2.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>5.2.2.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>5.2.2.RELEASE</version>
    </dependency>

<!--    <dependency>-->
<!--      <groupId>javax.servlet</groupId>-->
<!--      <artifactId>javax.servlet-api</artifactId>-->
<!--      <version>4.0.1</version>-->
<!--    </dependency>-->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>

    
  <!--    TomCat-->
    <dependency>
      <groupId>org.apache.tomcat.embed</groupId>
      <artifactId>tomcat-embed-core</artifactId>
      <version>${tomcat.version}</version>
    </dependency>
    <dependency>
      <groupId>org.apache.tomcat.embed</groupId>
      <artifactId>tomcat-embed-jasper</artifactId>
      <version>${tomcat.version}</version>
    </dependency>
    <dependency>
      <groupId>org.apache.tomcat</groupId>
      <artifactId>tomcat-jasper</artifactId>
      <version>7.0.47</version>
    </dependency>
    <dependency>
      <groupId>org.apache.tomcat</groupId>
      <artifactId>tomcat-jasper-el</artifactId>
      <version>
        7.0.47
      </version>
    </dependency>



  </dependencies>

  <build>
    <finalName>SSM2SpringBoot</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.2.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
```




**编写一个Tomcat启动类**
```java
public class EmbTomcat {
    public static void run() throws ServletException, LifecycleException {
        String webappDirLocation = "src/main/webapp/";
        Tomcat tomcat = new Tomcat();
        String webPort = System.getenv("PORT");
        if(webPort == null || webPort.isEmpty()) {
            webPort = "8080";
        }
        tomcat.setPort(Integer.valueOf(webPort));
        StandardContext ctx = (StandardContext) tomcat.addWebapp("/", new File(webappDirLocation).getAbsolutePath());
        File additionWebInfClasses = new File("target/classes");
        WebResourceRoot resources = new StandardRoot(ctx);
        resources.addPreResources(new DirResourceSet(resources, "/WEB-INF/classes",
                additionWebInfClasses.getAbsolutePath(), "/"));
        ctx.setResources(resources);
        tomcat.start();
        tomcat.getServer().await();
    }
}
```


tomcat启动了之后会去WEB-INF下找web.xml文件,但是在springBoot中是没有这个的,我们也可以完全去掉web.xml




**编写一个类去实现WebApplicationInitializer接口,这样tomcat启动的时候就会运行我们自己的初始化方法了**
```java
public class webInit implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(BootConfiguration.class);
        ServletRegistration.Dynamic springmvc =
                servletContext
                        .addServlet("springmvc"
                                ,new DispatcherServlet(ctx));
        springmvc.addMapping("/");
        springmvc.setLoadOnStartup(1);
    }
}
```


这里的原理是javaSPI





tomcat会去调用ServletContainerInitializer的onstarup方法,因为spring实现了这个接口,所以就会去调用Spring定义的方法,然后spring的SpringServletContainerInitializer上面的注解@HandlesTypes(WebApplicationInitializer.class)，会把WebApplicationInitializer.class的子类传递给onStartup方法,这样就完成了我们自己实现的初始化方法

**SpringServletContainerInitializer**
```java

package org.springframework.web;
 
import java.lang.reflect.Modifier;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import javax.servlet.ServletContainerInitializer;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.HandlesTypes;
import org.springframework.core.annotation.AnnotationAwareOrderComparator;
 
@HandlesTypes({WebApplicationInitializer.class})
public class SpringServletContainerInitializer implements ServletContainerInitializer {
    public SpringServletContainerInitializer() {
    }
 
    public void onStartup(Set<Class<?>> webAppInitializerClasses, ServletContext servletContext) throws ServletException {
        List<WebApplicationInitializer> initializers = new LinkedList();
        Iterator var4;
        if(webAppInitializerClasses != null) {
            var4 = webAppInitializerClasses.iterator();
 
            while(var4.hasNext()) {
                Class<?> waiClass = (Class)var4.next();
                if(!waiClass.isInterface() && !Modifier.isAbstract(waiClass.getModifiers()) && WebApplicationInitializer.class.isAssignableFrom(waiClass)) {
                    try {
                        initializers.add((WebApplicationInitializer)waiClass.newInstance());
                    } catch (Throwable var7) {
                        throw new ServletException("Failed to instantiate WebApplicationInitializer class", var7);
                    }
                }
            }
        }
        if(initializers.isEmpty()) {
            servletContext.log("No Spring WebApplicationInitializer types detected on classpath");
        } else {
            servletContext.log(initializers.size() + " Spring WebApplicationInitializers detected on classpath");
            AnnotationAwareOrderComparator.sort(initializers);
            var4 = initializers.iterator();
 
            while(var4.hasNext()) {
                WebApplicationInitializer initializer = (WebApplicationInitializer)var4.next();
                initializer.onStartup(servletContext);
            }
 
        }
    }
}
```
?先判断webAppInitializerClasses这个Set是否为空。如果不为空的话，找到这个set中不是接口，不是抽象类，并且是WebApplicationInitializer接口实现类的类，将它们保存到list中。当这个list为空的时候，抛出异常。不为空的话就按照一定的顺序排序，并将它们按照一定的顺序实例化。调用其onStartup方法执行。


**这样就完成了spring内嵌tomcat去XML的启动,跟springboot是不是有一点点相似**






