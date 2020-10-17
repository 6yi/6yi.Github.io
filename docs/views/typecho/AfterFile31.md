---
title: SpringBoot2.x静态资源拦截问题
date: 2019-12-10 13:38:27
categories: java
urlname: 41
tags:
---
<!--markdown-->springboot2.x静态资源访问是个头疼的问题,明明在配置文件里配置了资源路径,还是会被拦截,貌似写配置文件不起作用? 
解决方案就是在WebMvcConfigurer 里配置静态资源文件路径.其它方案都不太好使.

```java
@Configuration
public class webConfig implements WebMvcConfigurer {  
   @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {     		 
         registry.addResourceHandler("/static/**")
        .addResourceLocations("classpath:/static/");                                                              
     }
}
```
配置完后即可搞定,具体原因我还不清楚,不过现在正在理解springBoot的底层源码,等我知道后再来更新.