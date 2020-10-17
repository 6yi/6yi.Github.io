---
title: Docker部署SpringBoot应用
date: 2019-12-26 16:41:00
categories: linux
urlname: 70
tags:
---
<!--markdown-->## 一

?		采用dockerfile的形式,先用Maven把应用打成jar包,再编写dockerfile文件

```dockerfile
#基础镜像
FROM java:8
#数据卷
VOLUME /tmp
#将dockerfile同目录下的jar包添加进容器内
ADD demo.jar app.jar
#运行
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

docker打包成镜像并且启动容器

```shell
docker build -t mySpringBoot .

docker run -itd  -p 8080:8080 mySpringBoot
```

这就是第一个方法,还有一个是Maven提供更加便捷的方法



# 二

  首先在pom上添加Docker的拓展功能

 

```xml
  <plugin>
         <groupId>com.spotify</groupId>
         <artifactId>docker-maven-plugin</artifactId>
         <version>1.2.0</version>
         <configuration>
             <!-- 这里是最终生成的docker镜像名称 -->
             <imageName>lzheng/${project.artifactId}</imageName>
             <!-- 基础镜像，运行一个springboot应用只需要基础的java环境就行 -->
             <baseImage>java:8</baseImage>
             <!-- docker启动的时候执行的命令 -->
            <entryPoint>["java", "-jar", "/${project.build.finalName}.jar"]</entryPoint>
            <resources>
            	<resource>
                    <targetPath>/</targetPath>
                    <directory>${project.build.directory}</directory>
                    <include>${project.build.finalName}.jar</include>
                </resource>
            </resources>
          </configuration>
   </plugin>
```



再把整个项目文件拉到服务器上,使用Maven去构建

```shell
#构建镜像
mvn clean package docker:build -Dmaven.test.skip=true
#启动容器
docker run -itd  -p 8080:8080 mySpringBoot
```

之前我是用mvn打成jar然后直接在服务器上启动应用,虽然说操作跟docker启动差不多,但是现在的主流是容器化,咱还是得跟上一下时代才是.



