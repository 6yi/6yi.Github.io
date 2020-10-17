---
title: Go chromedp v1.4初探
date: 2020-01-25 16:21:00
categories: Go
urlname: 142
tags:
---
<!--markdown-->## 一
chromedp是Go语言实现的无头浏览器驱动,里面封装了Chrome的API操作,可以在不打开浏览器的gui前提下，使用所有 Chrome 支持的特性运行你的程序。总的来说和Python的Selenium操作类似,但是1.3之前和之后的版本API改动较大,官方文档写的也不清楚,再加上国内Go的社区还没发展很大,几乎没什么详细的使用教程,今天摸索了一阵先记录一下一些使用场景

## 二 (场景一: 爬取JS动态加载的资源)

先导包
```shell
go get github.com/chromedp/chromedp

```

引入     
注:1.4之后的版本不需要引入 "github.com/chromedp/chromedp/runner"
```go
import "github.com/chromedp/chromedp"
```


```go
        //获取协程上下文对象,用于开启chrome
        ctx, cancel := chromedp.NewContext(
                context.Background(),
                chromedp.WithLogf(log.Printf),
        )
        defer cancel()
        var sts string
        var buf []byte

        //chromedp.Run接受参数为上下文对象以及操作指令
        err := chromedp.Run(ctx,
                //初始化该url链接
                chromedp.Navigate(`https://g.hongshu.com/content/99269/15382723.html`),
                //等待.context_kw13加载完毕
                chromedp.WaitVisible(".context_kw13",chromedp.ByQuery),
                //获取.rdtext的HTML
                chromedp.OuterHTML(".rdtext", &sts, chromedp.ByQuery),
                //将网页快照/截图
                chromedp.CaptureScreenshot(&buf),
        )
        	if err != nil {
		log.Fatal(err)
	}
	if err := ioutil.WriteFile("截图.png", buf, 0644); err != nil {
		log.Fatal(err)
	}
	fmt.Println(sts)
```

# 三....