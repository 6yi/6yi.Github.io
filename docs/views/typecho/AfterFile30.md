---
title: SpringBoot2.x自动配置原理
date: 2020-03-22 15:50:00
categories: java
urlname: 199
tags:
---
<!--markdown-->要先弄明白SpringBoot的自动配置原理,必须从源码进行入手

我们先从**@SpringBootApplication** 注解进去看看里面的构造

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
public @interface SpringBootApplication {
```

里面有个**@EnableAutoConfiguration**注解,这个就是用来实现自动配置的,我们再去看看这个注解的内容

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";
```

里面导入了**AutoConfigurationImportSelector**这个类,看名字我们也能才出,这个叫自动配置导入选择器的肯定跟自动配置有关,我们再进去看看

**AutoConfigurationImportSelector**这个类里有一个selectImports方法

```java
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        if (!this.isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        } else {
            AutoConfigurationMetadata autoConfigurationMetadata = AutoConfigurationMetadataLoader.loadMetadata(this.beanClassLoader);
            AutoConfigurationImportSelector.AutoConfigurationEntry autoConfigurationEntry = this.getAutoConfigurationEntry(autoConfigurationMetadata, annotationMetadata);
            return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
        }
    }
```

这里面我们就可以猜测,autoConfigurationEntry存放的就是完整的包路径,Debug一下发现也确实如此,那么这些包路径是怎么获得的呢,也是在这个类的**getAutoConfigurationEntry**中现实的

```java
    protected AutoConfigurationImportSelector.AutoConfigurationEntry getAutoConfigurationEntry(AutoConfigurationMetadata autoConfigurationMetadata, AnnotationMetadata annotationMetadata) {
        if (!this.isEnabled(annotationMetadata)) {
            return EMPTY_ENTRY;
        } else {
            AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
            List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
            configurations = this.removeDuplicates(configurations);
            Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
            this.checkExcludedClasses(configurations, exclusions);
            configurations.removeAll(exclusions);
            configurations = this.filter(configurations, autoConfigurationMetadata);
            this.fireAutoConfigurationImportEvents(configurations, exclusions);
            return new AutoConfigurationImportSelector.AutoConfigurationEntry(configurations, exclusions);
        }
    }
```
```java
   List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
```
这行就是去获取包路径,我们再去**getCandidateConfigurations**中看看从哪获取的

```java
   protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
        List<String> configurations = SpringFactoriesLoader.loadFactoryNames(this.getSpringFactoriesLoaderFactoryClass(), this.getBeanClassLoader());
        Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");
        return configurations;
    }
```

原来是加载了**META-INF**下的**Spring.factories**文件



随机选取了**Spring.factories**的一些内容,这里面就有各个自动配置类,那么获取了这些自动配置类路径,自然就能反射得到类,那么这些类的自动配置原理还是没搞清楚,我们再去看看这些自动配置类的实现

```properties

# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.cloud.CloudServiceConnectorsAutoConfigu
```



我就随机选了**MongoAutoConfiguration**进行查看

```java
@Configuration(
    proxyBeanMethods = false
)
@ConditionalOnClass({MongoClient.class})
@EnableConfigurationProperties({MongoProperties.class})
@ConditionalOnMissingBean(
    type = {"org.springframework.data.mongodb.MongoDbFactory"}
)
public class MongoAutoConfiguration {
    public MongoAutoConfiguration() {
    }

    @Bean
    @ConditionalOnMissingBean(
        type = {"com.mongodb.MongoClient", "com.mongodb.client.MongoClient"}
    )
    public MongoClient mongo(MongoProperties properties, ObjectProvider<MongoClientOptions> options, Environment environment) {
        return (new MongoClientFactory(properties, environment)).createMongoClient((MongoClientOptions)options.getIfAvailable());
    }
}
```

我们可以看见,有个注解是这样的:
```java
**@EnableConfigurationProperties({MongoProperties.class})**
```
这个意思就是把MongoProperties.class的配置拿来new mongo的实例并且用@Bean注解加入到容器中,这样就完成了一个类的自动配置,那么我们再去看看**MongoProperties.class**中是什么情况

```java

@ConfigurationProperties(
    prefix = "spring.data.mongodb"
)
public class MongoProperties {
    public static final int DEFAULT_PORT = 27017;
    public static final String DEFAULT_URI = "mongodb://localhost/test";
    private String host;
    private Integer port = null;
    private String uri;
    private String database;
    private String authenticationDatabase;
    private String gridFsDatabase;
    private String username;
    private char[] password;
    private Class<?> fieldNamingStrategy;
    private Boolean autoIndexCreation;
```

噢,这样就清楚了, **MongoProperties**的属性跟我们的SpringBoot配置文件相互绑定,有一些属性已经预设好了,所以才能达到自动配置的效果,因为这个是mongo,所以预设的属性并不是很多.

这个就是SpringBoot2.x的自动配置原理



顺带提一句,

**@ConditionalOnMissingBean**这个注解的意思是当某个类不存在时,这个类才注入,也就是说如果你自己引入了mongo,那么他就不会帮你进行自动配置

**@Conditional**他是Spring4.x引入的注解