---
title: Go---Session的实现
date: 2020-02-02 07:31:00
categories: Go
urlname: 164
tags:
---
<!--markdown-->#### Go的官方包里是没有实现Session的,所以就需要我们自己去实现了

#### 动手写代码之前我们先理清一下啥是Session . Session是一种会话追踪技术,本身与Cookie极为相似,只不过Cookie是存在客户端的,而Session是存在服务端. 当浏览器访问服务端的时候,服务端在内存或其它储存方式中开辟空间,这块空间就是Session,Session是跟浏览器绑定的,这是怎么做到的呢,其实是利用浏览器发送过来的cookie进行验证(这是其中一个方法),因此你在该网站然后地方都能保证你的会话不会中断

#### Session操作接口  

```go
//为什么要把Seesion抽象出来成接口呢
//这是因为Session可以有多个储存方式来实现
//比如数据或者内存
type Session interface {
	Set(key, value interface{})
	Get(key interface{}) interface{}
	Remove(key interface{}) error
	GetId() string
}
```

#### Session的实现

```go
//session实现
type SessionFromMemory struct {
	sid              string                      //Session ID
	lock             sync.Mutex                  //互斥锁
	lastAccessedTime time.Time                   //最后访问时间
	MaxAge           int64                       //超时时间
	data             map[interface{}]interface{} //主数据
}
```

#### Session的实例化

```go
//实例化
func newSessionFromMemory() *SessionFromMemory {
	return &SessionFromMemory{
		data:   make(map[interface{}]interface{}),
		maxOvertime : 60 * 30, 
	}
}
```



#### Session的操作

```go
//同一个会话均可调用，进行设置，改操作必须拥有排斥锁
func (si *SessionFromMemory) Set(key, value interface{}) {
	si.lock.Lock()
	defer si.lock.Unlock()
	si.data[key] = value
}
func (si *SessionFromMemory) Get(key interface{}) interface{} {
	if value := si.data[key]; value != nil {
		return value
	}
	return nil
}
func (si *SessionFromMemory) Remove(key interface{}) error {
	if value := si.data[key]; value != nil {
		delete(si.data, key)
	}
	return nil
}
func (si *SessionFromMemory) GetId() string {
	return si.sid
}
```

#### Session储存方式接口

```go
type SessionStorage interface {
	//Seesion初始化,可以进行不同方式的储存
	InitSession(sid string, maxAge int64) (Session, error)
	//根据sid，获得当前session
	SetSession(session Session) error
	//销毁session
	DestroySession(sid string) error
	//回收
	GCSession()
}
```

#### Session的内存实现

```go
type FromMemory struct {
	//由于session包含所有的请求
	//并行时，保证数据独立、一致、安全
	lock     sync.Mutex //互斥锁
	sessions map[string]Session
}
```

#### 实例化

```go
func newFromMemory() *FromMemory {
	return &FromMemoryMannger{
		sessions: make(map[string]Session, 0),
	}
}
```

##### 实例会话Session

```go
func (fm *FromMemory) InitSession(sid string, maxAge int64) (Session, error) {
	fm.lock.Lock()
	defer mannger.lock.Unlock()
	newSession := newSessionFromMemory()
	newSession.sid = sid
	if maxAge != 0 {
		newSession.maxAge = maxAge
	}
	newSession.lastAccessedTime = time.Now()
	fm.sessions[sid] = newSession
	return newSession, nil
}
```

```go

//设置
func (fm *FromMemory) SetSession(session Session) error {
	fm.sessions[session.GetId()] = session
	return nil
}
//销毁session
func (fm *FromMemory) DestroySession(sid string) error {
	if _, ok := fm.sessions[sid]; ok {
		delete(fm.sessions, sid)
		return nil
	}
	return nil
}
//监判超时
func (fm *FromMemory) GCSession() {
	sessions := fm.sessions
	if len(sessions) < 1 {
		return
	}
	for k, v := range sessions {
		t := (v.(*SessionFromMemory).lastAccessedTime.Unix()) + (v.(*SessionFromMemory).maxAge)
		if t < time.Now().Unix() { //超时了
			delete(fm.sessions, k)
		}
	}

}
```

#### Session管理器

```go
type SessionManager struct {
	//session数据最终需要在客户端（浏览器）和服务器各存一份
	cookieName string
    //实现方式
	storage SessionStorage
	maxAge int64
	lock sync.Mutex
}
```

#### 实例化

```go
func NewSessionManager() *SessionManager {
	sessionManager := &SessionManager{
		cookieName: "lzheng-cookie",
		storage:    newFromMemory(), //默认以内存实现
		maxAge:     60 * 30,         //默认30分钟
	}
    //协程开启GC
	go sessionManager.GC()
	return sessionManager
}
```

#### Mannger可调用函数

##### cookie获取

```go
func (m *SessionManager) GetCookies() string {
	return m.cookieName
}
```

##### 从cookie中获取Session,若不存在则创建

```go
func (m *SessionManager) BeginSession(w http.ResponseWriter, r *http.Request) Session {
	//防止处理时，进入另外的请求
	m.lock.Lock()
	defer m.lock.Unlock()
	cookie, err := r.Cookie(m.cookieName)
	if err != nil || cookie.Value == "" { //如果当前请求没有改cookie名字对应的cookie
		//创建一个
		sid := m.randomId()
		//根据保存session方式，如内存，数据库中创建
		session, _ := m.storage.InitSession(sid,m.maxAge) //该方法有自己的锁，多处调用到
		maxAge := m.maxAge
		if maxAge == 0 {
			maxAge = session.(*SessionFromMemory).maxAge
		}
		//用session的ID于cookie关联
		//cookie名字和失效时间由session管理器维护
		cookie := http.Cookie{
			Name: m.cookieName,
			//这里是并发不安全的，但是这个方法已上锁
			Value:    url.QueryEscape(sid), //转义特殊符号@#￥%+*-等
			Path:     "/",
			HttpOnly: true,
			MaxAge:   int(maxAge),
			Expires:  time.Now().Add(time.Duration(maxAge)),
		}
		http.SetCookie(w, &cookie) //设置到响应中
		return session
	} else { //如果存在
		sid, _ := url.QueryUnescape(cookie.Value)        //反转义特殊符号
		session := m.storage.(*FromMemory).sessions[sid] //从保存session介质中获取
		if session == nil {
			//创建一个
			//sid := m.randomId()
			//根据保存session方式，如内存，数据库中创建
			newSession, _ := m.storage.InitSession(sid, m.maxAge)
			maxAge := m.maxAge
			if maxAge == 0 {
				maxAge = newSession.(*SessionFromMemory).maxAge
			}
			//用session的ID于cookie关联
			//cookie名字和失效时间由session管理器维护
			newCookie := http.Cookie{
				Name: m.cookieName,
				//这里是并发不安全的，但是这个方法已上锁
				Value:    url.QueryEscape(sid), //转义特殊符号@#￥%+*-等
				Path:     "/",
				HttpOnly: true,
				MaxAge:   int(maxAge),
				Expires:  time.Now().Add(time.Duration(maxAge)),
			}
			http.SetCookie(w, &newCookie) //设置到响应中
			return newSession
		}
		return session
	}
}
```

##### 更新最后操作时间以及超时时间

```go
func (m *SessionManager) Update(w http.ResponseWriter, r *http.Request) {
	m.lock.Lock()
	defer m.lock.Unlock()
	cookie, err := r.Cookie(m.cookieName)
	if err != nil {
		return
	}
	t := time.Now()
	sid, _ := url.QueryUnescape(cookie.Value)
	sessions := m.storage.(*FromMemory).sessions
	session := sessions[sid].(*SessionFromMemory)
	session.lastAccessedTime = t
	sessions[sid] = session
	if m.maxAge != 0 {
		cookie.MaxAge = int(m.maxAge)
	} else {
		cookie.MaxAge = int(session.maxAge)
	}
	http.SetCookie(w, cookie)
}
```

##### 用ID获取Session

```go
func (m *SessionManager) GetSessionById(sid string) Session {
	session := m.storage.(*FromMemory).sessions[sid]
	return session
}
```

##### 内存中是否存在Session

```go
func (m *SessionManager) MemoryIsExists(sid string) bool {
	_, ok := m.storage.(*FromMemory).sessions[sid]
	if ok {
		return true
	}
	return false
}
```

##### 删除Session同时撤销cookie

```go
func (m *SessionManager) Destroy(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie(m.cookieName)
	if err != nil || cookie.Value == "" {
		return
	} else {
		m.lock.Lock()
		defer m.lock.Unlock()

		sid, _ := url.QueryUnescape(cookie.Value)
		m.storage.DestroySession(sid)

		cookie2 := http.Cookie{
			MaxAge:  0,
			Name:    m.cookieName,
			Value:   "",
			Path:    "/",
			Expires: time.Now().Add(time.Duration(0)),
		}

		http.SetCookie(w, &cookie2)
	}
}

func (m *SessionManager) CookieIsExists(r *http.Request) bool {
	_, err := r.Cookie(m.cookieName)
	if err != nil {
		return false
	}
	return true
}
```

##### SeesionGC

```go
func (m *SessionManager) GC() {
	m.lock.Lock()
	defer m.lock.Unlock()
	m.storage.GCSession()
	time.AfterFunc(time.Duration(m.maxAge*10), func() {
		m.GC()
	})
}
```

##### 部分操作

```go
//将Session放入内存
func (m *SessionManager) IsFromMemory() {
	m.storage = newFromMemory()
}

func (m *SessionManager) SetMaxAge(t int64) {
	m.maxAge = t
}
//如果你自己实现保存session的方式，可以调该函数进行定义
func (m *SessionManager) SetSessionFrom(storage Storage) {
	m.storage = storage
}
//生成一定长度的随机数
func (m *SessionManager) randomId() string {
	b := make([]byte, 32)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return ""
	}
	//加密
	return base64.URLEncoding.EncodeToString(b)
}
```





### 项目中的实际用法

```go
//创建全局变量
var globalSessions *MySession.SessionManager
//初始化
func Init(){
	globalSessions=MySession.NewSessionManager()
}

//两个处理函数中的简单用法
func setSession(w http.ResponseWriter,r *http.Request){
	session:=globalSessions.BeginSession(w,r)
	session.Set("niubi","haha")
	_, _ = io.WriteString(w, "<a href=\"/get\">a</>")

}
func getSession(w http.ResponseWriter,r *http.Request){
	session:=globalSessions.BeginSession(w,r)
	s:=session.Get("niubi")
	fmt.Println(s)
}

func main(){
    //初始化Session管理器
	Init()
	http.HandleFunc("/set",setSession)
	http.HandleFunc("/get",getSession)
	if ok:=http.ListenAndServe(":8090",nil);ok!=nil{
	}
}
```



以上就是在Go中实现Session,其实大部分框架应该也是差不的实现,我也是借鉴了Beego作者的大部分写法以及其它作者