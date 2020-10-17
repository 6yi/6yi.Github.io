---
title: Go实现简单路由以及静态文件访问
date: 2020-02-05 12:22:00
categories: Go
urlname: 175
tags:
---
<!--markdown-->#### 别说了,我要是早知道官方自带的包有静态文件处理函数就不会写下这篇玩意了...



#### 最近想用Go搭一个图床,所以就搭了个简单的Web应用,自己实现了一个简单路由来处理静态文件

```go
//路由列表
var RouteList map[string]HandleFnc
//初始化路由表
func InitRoute(){
	RouteList=make(map[string]HandleFnc)
	RouteList["/index"]=index;
	RouteList["/static"]=staticFile;
}
func Route(w http.ResponseWriter,r *http.Request){
		url:=strings.Split(r.URL.Path,"/")[1]
		if url=="static" {
			staticFile(w,r)
		}else{
			if x:=RouteList[r.URL.Path];x!=nil{
				x(w,r)
			}else{
				io.WriteString(w,"<p>404 NotFound</p>")
			}
		}
}
```

#### 我的路由是用一个map做的,key为路径,value为处理函数(控制器),首先初始化路由列表,把请求路径和处理函数添加进来

## 处理流程:

#### 全部请求先转到Route函数,如果是静态文件(/static)的话会直接分配给staticFile()函数,其它请求再分配到相应的函数去处理



#### 下面是staticFile函数

```go
func staticFile(w http.ResponseWriter,r *http.Request) {
    //错误处理还没想到怎么写
	defer func() {
		if x:=recover();x!=nil{
		}
	}()
	path:=r.URL.Path
	buf, err := ioutil.ReadFile(config.Web_src+path)
	if strings.HasSuffix(path,".css") {
		w.Header().Set("Content-Type","text/css")
	}else if strings.HasSuffix(path,".js") {
		w.Header().Set("Content-Type", "text/js")
	}
	if err!=nil{
		io.WriteString(w,"<p>404 NOT FOUND</p>")
	}
	io.WriteString(w,string(buf))
}
```

##### 如果请求路径是以.css和.js结尾,那么便把Content-Type设置成相对应的,因为浏览器需要根据Content-Type来做出相对应的解析



### 启动

```go
func main(){
	InitRoute()//初始化路由
	InitConfig()//初始化配置文件
	http.HandleFunc("/",Route)//全部请求先到Route进行分配
	if err:=http.ListenAndServe(":"+config.Port,nil);err!=nil{
		os.Exit(0)
	}
}
```

