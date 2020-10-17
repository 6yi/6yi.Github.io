---
title: SSM初探
date: 2019-05-17 05:44:00
categories: java
urlname: 23
tags:
---
<!--markdown-->#### 00

?	差不多花了一个月去学习SSM框架吧，学的有一丢丢痛苦，太多配置文件要配置了，不过学习下来了感觉还好，对web的开发又有了新的认识。

?	

#### 01

?	首先是mybatis框架，这个是针对持久层的框架，他对数据库进行了一点封装，但是并不像hibernate那样这么彻底，还是需要手动去写sql语句，所以可以对数据库查询操作进行调优。

?	mybatis感觉比较困难的地方就是一对多和多对一，一对一查询了，记得不是很牢，会忘记，这块还是需要加强

?	

因为后期学了spring，所以配置文件可以直接整合到Spring中

SpringConfig.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context.xsd
	http://www.springframework.org/schema/aop
	http://www.springframework.org/schema/aop/spring-aop.xsd
	http://www.springframework.org/schema/tx
    http://www.springframework.org/schema/tx/spring-tx.xsd">

<!--    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">-->
<!--        <property name="driverClass" value="com.mysql.jdbc.Driver"/>-->
<!--        <property name="jdbcUrl" value="jdbc:mysql:///ssm"/>-->
<!--        <property name="user" value="root"/>-->
<!--        <property name="password" value="root"/>-->
<!--    </bean>-->

    <!--配置数据源-->
    <!--依赖注入-->
    <bean id="ds" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="com.mysql.jdbc.Driver"/>
                <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/ssm"/>
                <property name="user" value="root"/>
                <property name="password" value="123"/>
    </bean>

    <!--配置工厂-->
     <!--依赖注入-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="ds"/>
    </bean>

    <!--配置扫描路径-->
    <bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="cn.lzheng.dao"/>
    </bean>


    <context:component-scan base-package="cn.lzheng" >
        <!--配置哪些注解不扫描-->
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller" />
    </context:component-scan>
</beans>
```



#### 02

?	Spring在项目中就像一个大工厂，负责装配。

###### 	IOC（控制反转）

?	所谓控制反转，就是指把生成对象的权力转换，交给spring来控制，对象与对象之间的耦合度降低，不需要知道怎么实现的，只需要拿来用即可，Spring会把它一一配好，说是说一一配好，其实还是需要我们手动去写配置（后面靠SpringBoot可以解决这烦人的配置）

###### 	DL（依赖注入）

?	依赖注入就是上面所指的生成对象的权力，每个类里面需要的对象，用Spring配置文件写好，直接注入到每个类里面即可，大大降低耦合，后期更新维护方便

###### 	AOP（切面编程）

?		其实一开始对这个切面的概念也很蒙蔽，后面写着写着就懂了，这个要对动态代理模式比较清楚才行。

所谓的切面编程，我认为就是一种代理模式，帮生成的代理对象添加 前置，后置，异常，最终通知，增强方法嘛，你就想象一下，把这些方法切入到原本的对象方法的前面，后面，异常中，所以叫切面编程。这样做有什么好处呢？一是可以提取需要重复做的代码，比如对数据库进行操作，大部分方法都需要开启事务，回滚事务，我们就可以使用切面编程，生成一个代理对象去执行，每个代理对象都自带事务能力。二是可以灵活地维护代码，我们只需要对代理方法进行修改，而不需要修改对象原本方法。

（注意！使用注解进行AOP编程时，通知执行顺序是乱的！所以请直接使用注解的环绕通知，不要使用单个通知方法切入！！！）



Spring是SSM中的灵魂，他可以整合很多个框架，像SSH，也是靠Spring来整合。





纯Spring配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">
    <bean id="accountService" class="cn.lzheng.service.impl.impl.AccountServiceImpl">
        <!-- 注入dao -->
        <property name="accountDao" ref="accountdao"></property>
    </bean>
    <bean id="accountdao" class="cn.lzheng.dao.impl.AccountDaoImpl">
        <property name="runner" ref="runner"></property>
        <property name="connectionUtils" ref="connectionUtils"></property>
    </bean>
<bean id="runner" class="org.apache.commons.dbutils.QueryRunner" scope="prototype"></bean>

 <bean id="connectionUtils" class="cn.lzheng.utils.ConnectionUtils">
     <property name="dataSource" ref="ds"></property>
 </bean>
 <bean id="txManager" class="cn.lzheng.utils.TransactionManager">
    <property name="connectionUtils" ref="connectionUtils"></property>
 </bean>
<bean id="ds" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.jdbc.Driver"></property>
    <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/mybatis"></property>
    <property name="user" value="root"></property>
    <property name="password" value="123"></property>
</bean>
    
    <!--AOP代理混用问题，true为开启CGLIB-->
    <aop:aspectj-autoproxy  proxy-target-class="true"/>
    <aop:config>
        <!--对* cn.lzheng.service.impl.impl.AccountServiceImpl.transfer(..))进行切入-->
        <aop:pointcut id="pt1" expression="execution(* cn.lzheng.service.impl.impl.AccountServiceImpl.transfer(..))"/>
        <!--将txManeger中的方法切入-->
        <aop:aspect id="txAdvice" ref="txManager">
            <aop:before method="beginTransaction" pointcut-ref="pt1"></aop:before>
            <aop:after-returning method="commit" pointcut-ref="pt1"></aop:after-returning>
            <aop:after-throwing method="rollback" pointcut-ref="pt1"></aop:after-throwing>
            <aop:after method="release" pointcut-ref="pt1"></aop:after>
            </aop:aspect>
    </aop:config>
</beans>    
```



#### 03

?	SpringMVC是表现层的框架。

?	怎么说呢，SpringMVC就是相当于把JEE开发中的Servlet的事给干了，但是他比Servlet方便，在SpringMVC中叫做Controller（控制器），一共有下面几个组件。

1.前端控制器（DispatcherServlet） 2. 处理器映射器（HandlerMapping） 3. 处理器（Handler） 4. 处理器适配器（HandlAdapter） 5. 视图解析器（View Resolver） 6. 视图（View）



?	原理大概是这样的，全部的请求都得先到org.springframework.web.servlet.DispatcherServlet这个核心控制器里面来，他在根据你的请求信息给你分配方法执行，如果你的方法返回值是String，那他就会根据视图解析器去寻找有没有那个JSP或者html页面，然后给你返回，如果是一个对象，他可以返回一个Json字符串。



这是其中一个控制器的编写，如果你要返回对象，注意导入Json转化的包，比如Jackson

```Java
@Controller
@RequestMapping(path = "/first")
public class first {

@RequestMapping(path = "/fun")
public String fun(User user,String test){
    System.out.println(user+"      "+test);
    return "succes";
}
    @RequestMapping(path = "/test2")
    public String test(){
      System.out.println(user);
       User user2=new User();
       user2.setAge(90);
    	user2.setName("沙雕");
      return user;
    }

```

唉，有点晚了，今天就写到这里吧！