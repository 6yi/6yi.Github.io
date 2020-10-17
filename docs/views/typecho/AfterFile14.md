---
title: JavaMail笔记
date: 2018-12-26 06:01:00
categories: java
urlname: 29
tags:
---
<!--markdown-->#### 前言

?		今天真的被javaMail恶心到了，也为自己埋的坑而买单。

#### 正文

?		javaMail,就是使用java应用程序来发送E-mail，实现这个功能需要两个jar包,分别是  ***mail.jar***和***activation.jar***(注意！请直接下载最新版本，旧版本跟新的JDK有各种蛋疼的问题！！)。

?		导包之后就是代码的实现了，直接看代码。


```java
Properties props = new Properties();//创建配置文件
//设置加密模式为starttls，一般默认是TLS！outlook特别蛋疼！
props.put("mail.smtp.starttls.enable", "true");
//设置邮件服务器，一般都是smtp.xxx.com，注意outlook是smtp.office365.com
props.put("mail.host", "smtp.126.com");
//打开验证
props.put("mail.smtp.auth", "true");
//debug模式打开（可选！）
props.put("mail.debug", "true");

//这步比较关键！创建一个内部类来设置账户和密码！必须手动导包javax.mail，不然password会是char[]类型而且不能直接用String带入，很78怪！
 javax.mail.Authenticator auth = new Authenticator() {
            @Override
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("lzh", "lzheng");
            }
        };

//得到Session，这个就是主要的东西，负责连接以及主体啊发送啥的，跟HttpSession有点类似
Session session= Session.getInstance(props,auth);
//用来填写邮件的信息啥
MimeMessage msg = new MimeMessage(session);
//设置发件人
msg.setFrom(new InternetAddress("lzhengycy@126.com"));
//设置邮件名
msg.setSubject("这是来自lzheng的测试邮件有附件");
//设置正文，特么的，这步不能少，一定要写，就算发个空字符都要写，不然会报错，被卡了一晚上
msg.setText("ntmd");
//设置收件人
msg.addRecipient(Message.RecipientType.TO,
                new InternetAddress("905415053@qq.com"));
//发送
Transport.send(msg);
```

?	这个是实现原理，不过我有个MailUtils jar包，里面封装好了这些的使用方法，我就在这记一下，怕以后忘了。



### MailUtils


```java
//使用MailUtils得到session，直接一步到位，避免繁琐操作。
Session session = MailUtils.createSession("smtp.163.com","lzhengycy", "password");

//创建邮件对象
Mail mail = new Mail("lzheng@126.com",
				"905415053@126.com,itcast_cxf@sina.com",
				"不是垃圾邮件能是什么呢？", "这里是正文");

//创建附件对象
AttachBean ab1 = new AttachBean(new File("F:/f/xx.jpg"), "图片.jpg");
AttachBean ab2 = new AttachBean(new File("F:/f/yy.jpg"), "图片2.jpg");

//添加到mail里面
mail.addAttach(ab1);
mail.addAttach(ab2);

//发送
MailUtils.send(session, mail);
```





#### 总结

  	越到后面遇到越多奇奇怪怪的的问题，真是伤透脑筋。